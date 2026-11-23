<?php

/**
 * @package ThemePlate
 */

namespace Tests\Integration;

use CardanoPress\Clients\BlockfrostClient;
use CardanoPress\Dependencies\CardanoPHP\Utilities\Bech32;
use CardanoPress\Dependencies\CBOR\CBOREncoder;
use CardanoPress\Dependencies\CBOR\Types\CBORByteString;
use CardanoPress\Dependencies\GuzzleHttp\Handler\MockHandler;
use CardanoPress\Dependencies\GuzzleHttp\HandlerStack;
use CardanoPress\Dependencies\GuzzleHttp\Psr7\Response;
use CardanoPress\Dependencies\Monolog\Handler\NullHandler;
use CardanoPress\Dependencies\Monolog\Logger;
use PBWebDev\CardanoPress\Actions\CoreAction;
use PBWebDev\CardanoPress\Actions\Messager;
use PBWebDev\CardanoPress\Actions\WalletAction;
use PBWebDev\CardanoPress\Application;
use PBWebDev\CardanoPress\Blockfrost;
use PBWebDev\CardanoPress\Profile;
use ReflectionProperty;
use Tests\LoadDependencies;
use WP_Ajax_UnitTestCase;
use WPAjaxDieContinueException;
use WPAjaxDieStopException;

class WalletSecurityTest extends WP_Ajax_UnitTestCase
{
    use LoadDependencies;

    /** @var array<string, mixed> */
    private array $options = [];
    private ?Profile $profile = null;

    public function setUp(): void
    {
        parent::setUp();
        $this->loadDependencies();

        add_filter('allowed_http_origin', '__return_true');
        add_filter('send_auth_cookies', '__return_false');

        $this->options = [
            'asset_access' => [],
            'policy_ids' => [],
            'ua_additional_role' => '',
            'delegation_pool_id' => ['mainnet' => 'pool1abc', 'testnet' => 'pool1abc'],
            'ua_required_amount' => 0,
            'ua_required_epoch' => 1,
            'managed_roles' => [],
            'recaptcha_key' => [],
        ];
        $this->profile = null;
        $this->useApplication();
    }

    public function tear_down(): void
    {
        Blockfrost::useProjectIds('', '');

        parent::tear_down();
    }

    private function useApplication(): void
    {
        $test = $this;
        $application = $this->getMockBuilder(Application::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['option', 'logger', 'userProfile', 'isReady'])
            ->getMock();

        $application->method('option')->willReturnCallback(fn (string $key) => $test->options[$key] ?? '');
        $application->method('logger')->willReturn(new Logger('test', [new NullHandler()]));
        $application->method('isReady')->willReturn(true);
        $application->method('userProfile')->willReturnCallback(fn () => $test->profile);

        (new ReflectionProperty(Application::class, 'instance'))->setValue(null, $application);
    }

    /** @param array<string, mixed> $post */
    private function call(object $target, string $method, array $post = []): array
    {
        $_POST = $post;
        $_REQUEST = $post;
        $this->_last_response = '';
        $level = ob_get_level();

        ob_start();

        try {
            $target->$method();
        } catch (WPAjaxDieContinueException | WPAjaxDieStopException $error) {
            // wp_send_json_* ended the request.
        }

        while (ob_get_level() > $level) {
            ob_end_clean();
        }

        $decoded = json_decode($this->_last_response, true);

        return is_array($decoded) ? $decoded : [];
    }

    private function wallet(): WalletAction
    {
        return new WalletAction();
    }

    private function signIn(int $userId): void
    {
        wp_set_current_user($userId);
        $this->profile = new Profile(wp_get_current_user());
        $_REQUEST['_ajax_nonce'] = wp_create_nonce(WalletAction::getNonce());
    }

    /** @return array{string, string} Nonce and message from a fresh challenge. */
    private function challenge(): array
    {
        $response = $this->call($this->wallet(), 'getLoginChallenge');

        return [$response['data']['nonce'], $response['data']['message']];
    }

    private function bech32(string $prefix, string $bytes): string
    {
        return Bech32::encode($prefix, Bech32::toWords(array_values(unpack('C*', $bytes))), 1000);
    }

    /** @return array{stake: string, wallet: string, secret: string, hash: string} */
    private function account(): array
    {
        $keypair = sodium_crypto_sign_keypair();
        $hash = sodium_crypto_generichash(sodium_crypto_sign_publickey($keypair), '', 28);

        return [
            'stake' => $this->bech32('stake', "\xE1" . $hash),
            'wallet' => $this->bech32('addr', "\x01" . random_bytes(28) . $hash),
            'secret' => sodium_crypto_sign_secretkey($keypair),
            'hash' => $hash,
        ];
    }

    /** @param array{stake: string, wallet: string, secret: string, hash: string} $account */
    private function loginPost(array $account, string $token, ?string $message = null): array
    {
        $message ??= CoreAction::challengeMessage($token);
        $publicKey = sodium_crypto_sign_publickey_from_secretkey($account['secret']);
        $address = new CBORByteString("\xE1" . $account['hash']);
        $protected = new CBORByteString(CBOREncoder::encode([1 => -8, 'address' => $address]));
        $payload = new CBORByteString($message);
        $structure = CBOREncoder::encode(['Signature1', $protected, new CBORByteString(''), $payload]);
        $signature = new CBORByteString(sodium_crypto_sign_detached($structure, $account['secret']));
        $sign1 = bin2hex(CBOREncoder::encode([$protected, ['hashed' => false], $payload, $signature]));
        $key = bin2hex(CBOREncoder::encode([1 => 1, 3 => -8, -1 => 6, -2 => new CBORByteString($publicKey)]));

        return [
            'query_network' => 'mainnet',
            'wallet_address' => $account['wallet'],
            'stake_address' => $account['stake'],
            'data_signature' => (string) json_encode(['signature' => $sign1, 'key' => $key]),
            'login_nonce' => $token,
        ];
    }

    public function test_filter_dropping_the_token_still_yields_the_token(): void
    {
        $seen = [];

        add_filter('cardanopress_data_message', function ($message, $token = '') use (&$seen) {
            $seen[] = $token;

            return 'Fixed text';
        }, 10, 2);

        $message = CoreAction::challengeMessage('abc123');

        $this->assertSame(['abc123'], $seen);
        $this->assertStringContainsString('abc123', $message);
        $this->assertStringStartsWith('Fixed text', $message);
    }

    public function test_default_message_names_the_site_host_on_one_line(): void
    {
        $message = CoreAction::challengeMessage('abc123');
        $host = (string) wp_parse_url(home_url(), PHP_URL_HOST);

        $this->assertStringContainsString('(' . $host . ')', $message);
        $this->assertStringEndsWith('One-time nonce: abc123', $message);
        $this->assertStringNotContainsString("\n", $message);
    }

    public function test_challenge_token_is_stateless_and_verifiable(): void
    {
        global $wpdb;

        $count = "SELECT COUNT(*) FROM {$wpdb->options} WHERE option_name LIKE '%cardanopress_login%'";
        $before = (int) $wpdb->get_var($count);
        [$token, $message] = $this->challenge();
        $after = (int) $wpdb->get_var($count);

        $this->assertSame($before, $after);
        $this->assertSame(CoreAction::challengeMessage($token), $message);
        $this->assertTrue(WalletAction::isFreshChallenge($token));
    }

    public function test_tampered_expired_and_foreign_tokens_are_rejected(): void
    {
        [$token] = $this->challenge();
        $middle = intdiv(strlen($token), 2);
        $tampered = substr_replace($token, 'A' === $token[$middle] ? 'B' : 'A', $middle, 1);

        $this->assertFalse(WalletAction::isFreshChallenge($tampered));
        $this->assertFalse(WalletAction::isFreshChallenge($token . 'A'));
        $this->assertFalse(WalletAction::isFreshChallenge(''));
        $this->assertFalse(WalletAction::isFreshChallenge(bin2hex(random_bytes(16))));
        $expired = WalletAction::makeChallengeToken(time() - WalletAction::CHALLENGE_TTL - 5);

        $this->assertFalse(WalletAction::isFreshChallenge($expired));
        $this->assertFalse(WalletAction::isFreshChallenge(WalletAction::makeChallengeToken(time() + 3600)));
        $this->assertTrue(WalletAction::isFreshChallenge(WalletAction::makeChallengeToken(time() - 30)));

        $account = $this->account();
        $response = $this->call($this->wallet(), 'initializeUserAccount', $this->loginPost($account, $tampered));

        $this->assertFalse($response['success']);
        $this->assertSame(Messager::getAjaxMessage('incorrectSignature'), $response['data']);
        $this->assertFalse(username_exists(md5($account['stake'])));
    }

    public function test_token_is_only_burned_after_the_signature_verifies_and_then_cannot_be_reused(): void
    {
        $account = $this->account();
        $other = $this->account();
        [$token] = $this->challenge();

        // A bad signature must not burn the token.
        $bad = $this->loginPost($other, $token);
        $bad['stake_address'] = $account['stake'];
        $this->assertFalse($this->call($this->wallet(), 'initializeUserAccount', $bad)['success']);

        $good = $this->loginPost($account, $token);
        $first = $this->call($this->wallet(), 'initializeUserAccount', $good);

        $this->assertTrue($first['success']);
        $userId = username_exists(md5($account['stake']));
        $this->assertNotFalse($userId);
        $this->assertSame($account['stake'], get_user_meta($userId, WalletAction::LOGIN_MARKER, true));

        wp_set_current_user(0);
        $replay = $this->call($this->wallet(), 'initializeUserAccount', $good);

        $this->assertFalse($replay['success']);
        $this->assertSame(Messager::getAjaxMessage('incorrectSignature'), $replay['data']);
        $this->assertSame(0, get_current_user_id());
    }

    public function test_preregistered_user_with_an_email_and_no_marker_is_refused(): void
    {
        $account = $this->account();
        $userId = self::factory()->user->create([
            'user_login' => md5($account['stake']),
            'user_email' => 'squatter@example.org',
        ]);
        [$token] = $this->challenge();

        $response = $this->call($this->wallet(), 'initializeUserAccount', $this->loginPost($account, $token));

        $this->assertFalse($response['success']);
        $this->assertSame(Messager::getAjaxMessage('accountNotLinked'), $response['data']);
        $this->assertSame(0, get_current_user_id());
        $this->assertSame('', (string) get_user_meta($userId, WalletAction::LOGIN_MARKER, true));
    }

    public function test_legacy_user_without_an_email_is_accepted_and_marked(): void
    {
        global $wpdb;

        $account = $this->account();
        $userId = self::factory()->user->create(['user_login' => md5($account['stake'])]);
        $wpdb->update($wpdb->users, ['user_email' => ''], ['ID' => $userId]);
        clean_user_cache($userId);
        [$token] = $this->challenge();

        $response = $this->call($this->wallet(), 'initializeUserAccount', $this->loginPost($account, $token));

        $this->assertTrue($response['success']);
        $this->assertSame($userId, get_current_user_id());
        $this->assertSame($account['stake'], get_user_meta($userId, WalletAction::LOGIN_MARKER, true));
    }

    public function test_legacy_user_connected_to_the_stake_is_accepted_and_marked(): void
    {
        $account = $this->account();
        $userId = self::factory()->user->create([
            'user_login' => md5($account['stake']),
            'user_email' => 'legacy@example.org',
        ]);
        update_user_meta($userId, 'cardanopress_connected_stake', $account['stake']);
        [$token] = $this->challenge();

        $response = $this->call($this->wallet(), 'initializeUserAccount', $this->loginPost($account, $token));

        $this->assertTrue($response['success']);
        $this->assertSame($account['stake'], get_user_meta($userId, WalletAction::LOGIN_MARKER, true));
    }

    /** @param array<int, array{int, array<mixed>|null}> $responses */
    private function blockfrost(array $responses): Blockfrost
    {
        $queue = array_map(
            fn (array $item) => new Response($item[0], [], (string) json_encode($item[1])),
            $responses
        );
        $blockfrost = new Blockfrost('mainnet', new Logger('test', [new NullHandler()]));
        $blockfrost->setClient(new BlockfrostClient('tester', HandlerStack::create(new MockHandler($queue))));

        return $blockfrost;
    }

    private function connectedUser(string $network, string ...$roles): Profile
    {
        $userId = self::factory()->user->create(['role' => 'subscriber']);
        $user = get_userdata($userId);

        foreach ($roles as $role) {
            $user->add_role($role);
        }

        update_user_meta($userId, 'cardanopress_connected_network', $network);
        update_user_meta($userId, 'cardanopress_connected_wallet', 'addr1test');
        update_user_meta($userId, 'cardanopress_connected_stake', 'stake1test');

        return new Profile(get_userdata($userId));
    }

    private function roles(Profile $profile): array
    {
        return get_userdata($profile->getData('ID'))->roles;
    }

    public function test_asset_roles_are_kept_when_a_blockfrost_call_fails(): void
    {
        $this->options['asset_access'] = [['id' => str_repeat('a', 56), 'role' => 'editor']];
        $profile = $this->connectedUser('mainnet', 'editor');

        (new CoreAction())->checkWalletAssets('stake1test', $profile, $this->blockfrost([[500, ['error' => 'x']]]));

        $this->assertContains('editor', $this->roles($profile));
    }

    public function test_asset_roles_are_removed_after_a_complete_fetch(): void
    {
        $this->options['asset_access'] = [['id' => str_repeat('a', 56), 'role' => 'editor']];
        $profile = $this->connectedUser('mainnet', 'editor');

        (new CoreAction())->checkWalletAssets('stake1test', $profile, $this->blockfrost([[200, []]]));

        $roles = $this->roles($profile);
        $this->assertNotContains('editor', $roles);
        $this->assertContains('subscriber', $roles);
    }

    public function test_default_role_is_never_removed(): void
    {
        $this->options['asset_access'] = [['id' => str_repeat('a', 56), 'role' => 'subscriber']];
        $profile = $this->connectedUser('mainnet');

        (new CoreAction())->checkWalletAssets('stake1test', $profile, $this->blockfrost([[200, []]]));

        $this->assertContains('subscriber', $this->roles($profile));
    }

    public function test_opt_out_filter_keeps_roles(): void
    {
        add_filter('cardanopress_manage_gated_roles', '__return_false');
        $this->options['asset_access'] = [['id' => str_repeat('a', 56), 'role' => 'editor']];
        $profile = $this->connectedUser('mainnet', 'editor');

        (new CoreAction())->checkWalletAssets('stake1test', $profile, $this->blockfrost([[200, []]]));

        $this->assertContains('editor', $this->roles($profile));
    }

    public function test_test_networks_remove_gated_roles_and_grant_none(): void
    {
        $this->options['asset_access'] = [
            ['id' => str_repeat('a', 56), 'role' => 'editor'],
            ['id' => str_repeat('b', 56), 'role' => 'subscriber'],
        ];
        $profile = $this->connectedUser('testnet', 'editor');
        $holding = [['unit' => str_repeat('a', 56) . '6e6674', 'quantity' => '1']];
        $details = ['policy_id' => str_repeat('a', 56), 'asset_name' => '6e6674', 'onchain_metadata' => []];

        (new CoreAction())->checkWalletAssets(
            'stake1test',
            $profile,
            $this->blockfrost([[200, $holding], [200, $details]])
        );

        $roles = $this->roles($profile);
        $this->assertNotContains('editor', $roles);
        $this->assertContains('subscriber', $roles);
    }

    public function test_test_networks_keep_roles_when_the_manage_filter_is_off(): void
    {
        add_filter('cardanopress_manage_gated_roles', '__return_false');
        $this->options['asset_access'] = [['id' => str_repeat('a', 56), 'role' => 'editor']];
        $profile = $this->connectedUser('testnet', 'editor');

        (new CoreAction())->checkWalletAssets('stake1test', $profile, $this->blockfrost([[200, []]]));

        $this->assertContains('editor', $this->roles($profile));
    }

    public function test_test_network_delegation_role_is_removed(): void
    {
        $this->options['ua_additional_role'] = 'contributor';
        $profile = $this->connectedUser('testnet', 'contributor');
        $history = [['pool_id' => 'pool1abc', 'amount' => '5000000', 'active_epoch' => 500]];

        (new CoreAction())->checkDelegationStatus(
            'stake1test',
            'testnet',
            $profile,
            $this->blockfrost([[200, []], [200, $history], [200, ['epoch' => 400]]])
        );

        $this->assertNotContains('contributor', $this->roles($profile));
    }

    public function test_test_networks_follow_the_mainnet_rules_when_allowed(): void
    {
        add_filter('cardanopress_allow_testnet_roles', '__return_true');
        $this->options['asset_access'] = [['id' => str_repeat('a', 56), 'role' => 'editor']];
        $profile = $this->connectedUser('testnet', 'editor');

        (new CoreAction())->checkWalletAssets('stake1test', $profile, $this->blockfrost([[200, []]]));

        $this->assertNotContains('editor', $this->roles($profile));
    }

    public function test_recheck_moves_a_daily_schedule_to_hourly(): void
    {
        $core = new CoreAction();

        wp_clear_scheduled_hook(CoreAction::RECHECK_HOOK);
        wp_schedule_event(time() + 600, 'daily', CoreAction::RECHECK_HOOK);

        $core->scheduleRecheck();
        $this->assertSame('hourly', wp_get_scheduled_event(CoreAction::RECHECK_HOOK)->schedule);

        $next = wp_next_scheduled(CoreAction::RECHECK_HOOK);
        $core->scheduleRecheck();
        $this->assertSame($next, wp_next_scheduled(CoreAction::RECHECK_HOOK));

        wp_clear_scheduled_hook(CoreAction::RECHECK_HOOK);
        $core->scheduleRecheck();
        $this->assertSame('hourly', wp_get_scheduled_event(CoreAction::RECHECK_HOOK)->schedule);
    }

    public function test_padded_and_standard_base64_variants_of_a_token_are_refused(): void
    {
        $raw = '';

        // Find a token whose text uses - or _, so the standard alphabet differs
        do {
            $token = WalletAction::makeChallengeToken();
        } while (false === strpbrk($token, '-_'));

        $raw = base64_decode(strtr($token, '-_', '+/'), true);

        $this->assertTrue(WalletAction::isFreshChallenge($token));
        $this->assertFalse(WalletAction::isFreshChallenge(strtr($token, '-_', '+/')));
        $this->assertFalse(WalletAction::isFreshChallenge($token . '='));
        $this->assertFalse(WalletAction::isFreshChallenge(base64_encode($raw)));
        $this->assertFalse(WalletAction::isFreshChallenge(' ' . $token));
    }

    public function test_delegation_role_follows_a_complete_check_only(): void
    {
        $this->options['ua_additional_role'] = 'contributor';
        $core = new CoreAction();

        $failed = $this->connectedUser('mainnet', 'contributor');
        $core->checkDelegationStatus('stake1test', 'mainnet', $failed, $this->blockfrost([[200, []], [500, []]]));
        $this->assertContains('contributor', $this->roles($failed));

        $lapsed = $this->connectedUser('mainnet', 'contributor');
        $core->checkDelegationStatus('stake1test', 'mainnet', $lapsed, $this->blockfrost([[200, []], [200, []]]));
        $this->assertNotContains('contributor', $this->roles($lapsed));

        $active = $this->connectedUser('mainnet');
        $history = [['pool_id' => 'pool1abc', 'amount' => '5000000', 'active_epoch' => 500]];
        $core->checkDelegationStatus(
            'stake1test',
            'mainnet',
            $active,
            $this->blockfrost([[200, []], [200, $history], [200, ['epoch' => 400]]])
        );
        $this->assertContains('contributor', $this->roles($active));
    }

    public function test_sync_is_throttled_per_user(): void
    {
        $this->signIn(self::factory()->user->create());

        $first = $this->call($this->wallet(), 'syncUserAssets', ['_ajax_nonce' => $_REQUEST['_ajax_nonce']]);
        $second = $this->call($this->wallet(), 'syncUserAssets', ['_ajax_nonce' => $_REQUEST['_ajax_nonce']]);

        $this->assertTrue($first['success']);
        $this->assertFalse($second['success']);
        $this->assertSame(Messager::getAjaxMessage('throttled'), $second['data']);
    }

    public function test_account_details_refuse_an_address_that_is_not_the_users_own(): void
    {
        Blockfrost::useProjectIds('mainnet_test', 'testnet_test');
        $userId = self::factory()->user->create();
        $own = 'stake1' . str_repeat('p', 50);

        // No connected stake: the posted address must not be used as a fallback.
        $this->signIn($userId);
        $post = ['_ajax_nonce' => $_REQUEST['_ajax_nonce'], 'query_network' => 'mainnet'];
        $other = 'stake1' . str_repeat('q', 50);

        $response = $this->call($this->wallet(), 'getAccountDetails', $post + ['reward_address' => $other]);

        $this->assertFalse($response['success']);
        $this->assertSame(Messager::getAjaxMessage('notPermitted'), $response['data']);

        // Connected, but a different address is posted: refused, never substituted.
        update_user_meta($userId, 'cardanopress_connected_stake', $own);
        $this->signIn($userId);

        // Repeated calls are refused for the address, not throttled.
        foreach ([1, 2] as $ignored) {
            $response = $this->call($this->wallet(), 'getAccountDetails', $post + ['reward_address' => $other]);

            $this->assertFalse($response['success']);
            $this->assertSame(Messager::getAjaxMessage('notPermitted'), $response['data']);
        }

        // Omitting reward_address is an invalid request.
        $response = $this->call($this->wallet(), 'getAccountDetails', $post);

        $this->assertFalse($response['success']);
        $this->assertNotSame(Messager::getAjaxMessage('blockfrostError'), $response['data']);
    }

    public function test_handle_must_be_one_the_user_holds(): void
    {
        $this->signIn(self::factory()->user->create());
        $this->profile->saveHandles(['$alice']);
        $nonce = $_REQUEST['_ajax_nonce'];

        $refused = $this->call($this->wallet(), 'saveUserHandle', ['_ajax_nonce' => $nonce, 'ada_handle' => '$bob']);
        $this->assertFalse($refused['success']);
        $this->assertSame('', $this->profile->getFavoriteHandle());

        $accepted = $this->call($this->wallet(), 'saveUserHandle', ['_ajax_nonce' => $nonce, 'ada_handle' => '$alice']);
        $this->assertTrue($accepted['success']);
        $this->assertSame('$alice', $this->profile->getFavoriteHandle());
    }
}
