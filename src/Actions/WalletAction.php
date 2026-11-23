<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use CardanoPress\Interfaces\HookInterface;
use CardanoPress\Traits\HasPostInput;
use PBWebDev\CardanoPress\Application;
use PBWebDev\CardanoPress\Blockfrost;
use PBWebDev\CardanoPress\Helpers\StakeProof;
use PBWebDev\CardanoPress\Manifest;
use PBWebDev\CardanoPress\Profile;
use WP_Error;
use WP_User;

class WalletAction implements HookInterface
{
    use HasPostInput;

    protected Application $application;
    protected Sanitization $sanitization;

    public function __construct()
    {
        $this->application = Application::getInstance();
        $this->sanitization = new Sanitization();
        $this->messager = new Messager();
    }

    public function setupHooks(): void
    {
        add_action('wp_ajax_nopriv_cardanopress_login_challenge', [$this, 'getLoginChallenge']);
        add_action('wp_ajax_cardanopress_login_challenge', [$this, 'getLoginChallenge']);
        add_action('wp_ajax_nopriv_cardanopress_user_account', [$this, 'initializeUserAccount']);
        add_action('wp_ajax_cardanopress_user_account', [$this, 'connectUserWallet']);
        add_action('wp_ajax_cardanopress_reconnect_account', [$this, 'connectUserWallet']);
        add_action('wp_ajax_cardanopress_sync_assets', [$this, 'syncUserAssets']);
        add_action('wp_ajax_cardanopress_user_change', [$this, 'logoutCurrentUser']);
        add_action('wp_ajax_cardanopress_protocol_parameters', [$this, 'getProtocolParameters']);
        add_action('wp_ajax_cardanopress_account_details', [$this, 'getAccountDetails']);
        add_action('wp_ajax_cardanopress_delegation_data', [$this, 'getDelegationData']);
        add_action('wp_ajax_cardanopress_wallet_transaction', [$this, 'saveWalletTransaction']);
        add_action('wp_ajax_nopriv_cardanopress_payment_address', [$this, 'getPaymentAddress']);
        add_action('wp_ajax_cardanopress_payment_address', [$this, 'getPaymentAddress']);
        add_action('wp_ajax_cardanopress_save_handle', [$this, 'saveUserHandle']);
    }

    public static function getNonce(): string
    {
        // Must match the nonce action localized to the front-end in Manifest.
        return Manifest::HANDLE_PREFIX . 'actions';
    }

    public const CHALLENGE_PREFIX = 'cardanopress_login_';
    public const CHALLENGE_TTL = 600; // 10 minutes
    public const LOGIN_MARKER = 'cardanopress_login_stake';
    public const THROTTLE_PREFIX = 'cardanopress_throttle_';

    private const TOKEN_LENGTH = 52; // 4 bytes time + 16 bytes random + 32 bytes HMAC

    private static function base64UrlEncode(string $data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function base64UrlDecode(string $data): string
    {
        $decoded = base64_decode(strtr($data, '-_', '+/'), true);

        return false === $decoded ? '' : $decoded;
    }

    /**
     * Stateless challenge token: base64url(time . random . HMAC(time . random)).
     * Nothing is stored when issuing, so unauthenticated requests cost no writes.
     */
    public static function makeChallengeToken(?int $time = null): string
    {
        $payload = pack('N', $time ?? time()) . random_bytes(16);

        return self::base64UrlEncode($payload . hash_hmac('sha256', $payload, wp_salt('nonce'), true));
    }

    /** Is this token genuine and still within its lifetime? */
    public static function isFreshChallenge(string $token): bool
    {
        $raw = self::base64UrlDecode($token);

        // Padding and +/ variants decode to the same bytes, so only the canonical text is accepted
        if (self::TOKEN_LENGTH !== strlen($raw) || ! hash_equals(self::base64UrlEncode($raw), $token)) {
            return false;
        }

        $payload = substr($raw, 0, 20);

        if (! hash_equals(hash_hmac('sha256', $payload, wp_salt('nonce'), true), substr($raw, 20))) {
            return false;
        }

        $issued = unpack('N', $payload);

        if (false === $issued) {
            return false;
        }

        $age = time() - (int) $issued[1];

        return $age >= -60 && $age <= self::CHALLENGE_TTL;
    }

    private static function usedKey(string $token): string
    {
        return self::CHALLENGE_PREFIX . 'used_' . hash('sha256', $token);
    }

    private function throttled(string $action): bool
    {
        $seconds = (int) apply_filters('cardanopress_throttle_seconds', MINUTE_IN_SECONDS, $action);

        if ($seconds <= 0) {
            return false;
        }

        $key = self::THROTTLE_PREFIX . $action . '_' . get_current_user_id();

        if (false !== get_transient($key)) {
            return true;
        }

        set_transient($key, time(), $seconds);

        return false;
    }

    /**
     * Verify the challenge was signed with the stake key and return that stake
     * address, or null when verification fails. The account identity therefore
     * only comes from a proven stake key — a payment key signature cannot prove
     * it, as a stake credential in an address can be copied from any public one.
     *
     * @param string[] $data
     */
    private function verifyDataSignature(
        array $data,
        string $stakeAddress,
        string $walletAddress,
        string $message
    ): ?string {
        list($signature, $key) = array_pad($data, 2, '');

        return StakeProof::verify($signature, $key, $message, $stakeAddress, $walletAddress) ? $stakeAddress : null;
    }

    /** Read a single string field from $_POST, unslashed and sanitized. */
    private function postString(string $key): string
    {
        if (! isset($_POST[$key]) || ! is_string($_POST[$key])) {
            return '';
        }

        $value = wp_unslash($_POST[$key]);

        return is_string($value) ? sanitize_text_field($value) : '';
    }

    /**
     * Issue a single-use, time-bound login challenge. The signed message is
     * built server-side so the client signs exactly what we will validate,
     * defeating signature replay and predictable-message phishing.
     */
    public function getLoginChallenge(): void
    {
        $this->maybeInvalidPost();

        $token = self::makeChallengeToken();

        wp_send_json_success([
            'nonce' => $token,
            'message' => CoreAction::challengeMessage($token),
        ]);
    }

    /**
     * Validate a login challenge token (genuine, unexpired, not yet used) and
     * return it. Sends a JSON error (and exits) when invalid. The token is only
     * burned by markChallengeUsed() once the signature over it has verified.
     */
    private function consumeChallenge(): string
    {
        $token = $this->postString('login_nonce');

        if ('' === $token || ! self::isFreshChallenge($token) || false !== get_transient(self::usedKey($token))) {
            wp_send_json_error($this->messager::getAjaxMessage('incorrectSignature'));
        }

        return $token;
    }

    /** Single use: remember the token until it would expire anyway. */
    private function markChallengeUsed(string $token): void
    {
        set_transient(self::usedKey($token), 1, self::CHALLENGE_TTL + 120);
    }

    public function initializeUserAccount(): void
    {
        $this->maybeInvalidPost(['query_network', 'wallet_address', 'stake_address', 'data_signature']);

        $queryNetwork = $this->sanitization->sanitizePost('query_network');
        $walletAddress = $this->sanitization->sanitizePost('wallet_address');
        $postedStake = $this->sanitization->sanitizePost('stake_address');
        $dataSignature = $this->sanitization->sanitizePost('data_signature');

        $token = $this->consumeChallenge();

        // The posted stake_address only counts once its stake key has signed the challenge.
        $signed = explode('|', $dataSignature);
        $stakeAddress = $this->verifyDataSignature(
            $signed,
            $postedStake,
            $walletAddress,
            CoreAction::challengeMessage($token)
        );

        if (null === $stakeAddress) {
            wp_send_json_error($this->messager::getAjaxMessage('incorrectSignature'));

            return;
        }

        $this->markChallengeUsed($token);

        $username = md5($stakeAddress);
        $userId = username_exists($username);
        $shouldReload = false;
        $newAccount = false;

        if (false === $userId) {
            $userId = wp_create_user($username, wp_hash_password($stakeAddress));
            $newAccount = true;

            if ($userId instanceof WP_Error) {
                $this->application->logger('actions')->error($userId->get_error_message());
                wp_send_json_error($this->messager::getAjaxMessage('somethingWrong'));
                return;
            }

            update_user_meta($userId, self::LOGIN_MARKER, $stakeAddress);
        }

        $user = get_user_by('id', $userId);

        if (false === $user) {
            wp_send_json_error($this->messager::getAjaxMessage('somethingWrong'));
            return;
        }

        $userProfile = new Profile($user);

        if (! $newAccount && ! $this->ownsAccount($user, $userProfile, $stakeAddress)) {
            $this->application->logger('actions')->error(
                sprintf('Refused wallet login to user %d: not created by wallet login.', $user->ID)
            );
            wp_send_json_error($this->messager::getAjaxMessage('accountNotLinked'));

            return;
        }

        if ($newAccount || ! $userProfile->isConnected()) {
            $userProfile->saveNetwork($queryNetwork);
            $userProfile->saveWallet($walletAddress);
            $userProfile->saveStake($stakeAddress);
        }

        if ($userId !== get_current_user_id()) {
            $shouldReload = true;

            $userProfile->setUserAuth($username);
        }

        wp_send_json_success([
            'message' => sprintf($this->messager::getAjaxMessage('welcome'), $username),
            'reload' => $shouldReload,
        ]);
    }

    /**
     * An existing account with the wallet's username is only the wallet's own when
     * wallet login created it. Anyone could have registered that username by hand.
     */
    private function ownsAccount(WP_User $user, Profile $userProfile, string $stakeAddress): bool
    {
        $marker = (string) get_user_meta($user->ID, self::LOGIN_MARKER, true);

        if ('' !== $marker && hash_equals($marker, $stakeAddress)) {
            return true;
        }

        // Legacy accounts: connected to this stake, or made by the plugin (never had an email).
        if (hash_equals($userProfile->connectedStake(), $stakeAddress) || '' === (string) $user->user_email) {
            update_user_meta($user->ID, self::LOGIN_MARKER, $stakeAddress);

            return true;
        }

        return false;
    }

    public function connectUserWallet(): void
    {
        $this->maybeInvalidPost(['query_network', 'wallet_address', 'stake_address', 'data_signature']);

        $queryNetwork = $this->sanitization->sanitizePost('query_network');
        $walletAddress = $this->sanitization->sanitizePost('wallet_address');
        $postedStake = $this->sanitization->sanitizePost('stake_address');
        $dataSignature = $this->sanitization->sanitizePost('data_signature');

        $token = $this->consumeChallenge();

        // The posted stake_address only counts once its stake key has signed the challenge.
        $signed = explode('|', $dataSignature);
        $stakeAddress = $this->verifyDataSignature(
            $signed,
            $postedStake,
            $walletAddress,
            CoreAction::challengeMessage($token)
        );

        if (null === $stakeAddress) {
            wp_send_json_error($this->messager::getAjaxMessage('incorrectSignature'));

            return;
        }

        $this->markChallengeUsed($token);

        $userProfile = $this->application->userProfile();

        $userProfile->saveNetwork($queryNetwork);
        $userProfile->saveWallet($walletAddress);
        $userProfile->saveStake($stakeAddress);

        do_action('wp_login', $userProfile->getData('user_login'), $userProfile->getData());

        wp_send_json_success([
            'message' => $this->messager::getAjaxMessage('connected'),
            'reload' => false,
        ]);
    }

    public function syncUserAssets(): void
    {
        $this->maybeInvalidPost();

        if ($this->throttled('sync')) {
            wp_send_json_error($this->messager::getAjaxMessage('throttled'));
        }

        $userProfile = $this->application->userProfile();
        $stored = $userProfile->storedAssets();

        do_action('wp_login', $userProfile->getData('user_login'), $userProfile->getData());

        wp_send_json_success([
            'message' => $this->messager::getAjaxMessage('walletSynced'),
            'updated' => $stored !== $userProfile->storedAssets(),
        ]);
    }

    public function logoutCurrentUser(): void
    {
        $this->maybeInvalidPost(['query_network', 'wallet_address']);

        $queryNetwork = $this->sanitization->sanitizePost('query_network');
        $walletAddress = $this->sanitization->sanitizePost('wallet_address');
        $userProfile = $this->application->userProfile();
        $shouldReload = false;

        if (
            $queryNetwork !== $userProfile->connectedNetwork() ||
            $walletAddress !== $userProfile->connectedWallet()
        ) {
            $shouldReload = true;

            $userProfile->unsetUserAuth();
        }

        $message = $shouldReload ? __('Bye', 'cardanopress') : __('Hello', 'cardanopress');

        wp_send_json_success([
            /* translators: %s: message %s: username */
            'message' => sprintf(__('%1$s %2$s', 'cardanopress'), $message, $userProfile->getData('user_login')),
            'reload' => $shouldReload,
        ]);
    }

    public function getProtocolParameters(): void
    {
        $this->maybeInvalidPost(['query_network']);

        $queryNetwork = $this->sanitization->sanitizePost('query_network');

        if (! Blockfrost::isReady($queryNetwork)) {
            wp_send_json_error(sprintf($this->messager::getAjaxMessage('unsupportedNetwork'), $queryNetwork));
        }

        $blockfrost = new Blockfrost($queryNetwork);
        $response = $blockfrost->protocolParameters();

        if (empty($response)) {
            $this->application->logger('actions')->error($this->messager::getErrorMessage('blockfrost'));
            wp_send_json_error($this->messager::getAjaxMessage('blockfrostError'));
        }

        wp_send_json_success($response);
    }

    public function getAccountDetails(): void
    {
        $this->maybeInvalidPost(['query_network', 'reward_address']);

        $queryNetwork = $this->sanitization->sanitizePost('query_network');
        $rewardAddress = $this->sanitization->sanitizePost('reward_address');
        $connectedStake = $this->application->userProfile()->connectedStake();

        if (! Blockfrost::isReady($queryNetwork)) {
            wp_send_json_error(sprintf($this->messager::getAjaxMessage('unsupportedNetwork'), $queryNetwork));
        }

        // Only the logged-in user's own stake address can be queried.
        if ('' === $connectedStake || ! hash_equals($connectedStake, $rewardAddress)) {
            wp_send_json_error($this->messager::getAjaxMessage('notPermitted'));
        }

        $blockfrost = new Blockfrost($queryNetwork);
        $response = $blockfrost->getAccountDetails($rewardAddress);

        if (empty($response)) {
            $this->application->logger('actions')->error($this->messager::getErrorMessage('blockfrost'));
            wp_send_json_error($this->messager::getAjaxMessage('blockfrostError'));
        }

        wp_send_json_success($response);
    }

    public function getDelegationData(): void
    {
        $this->maybeInvalidPost();

        $poolData = $this->application->delegationPool();
        $response = $poolData['hex'] ?? '';

        if (empty($response)) {
            $this->application->logger('actions')->error($this->messager::getErrorMessage('delegation'));
            wp_send_json_error($this->messager::getAjaxMessage('somethingWrong'));
        }

        wp_send_json_success($response);
    }

    public function saveWalletTransaction(): void
    {
        $this->maybeInvalidPost(['query_network', 'transaction_action', 'transaction_hash']);

        $queryNetwork = $this->sanitization->sanitizePost('query_network');
        $transactionAction = $this->sanitization->sanitizePost('transaction_action');
        $transactionHash = $this->sanitization->sanitizePost('transaction_hash');

        $userProfile = $this->application->userProfile();
        $success = $userProfile->saveTransaction(
            $queryNetwork,
            $transactionAction,
            $transactionHash
        );

        if (! $success) {
            $this->application->logger('actions')->error($this->messager::getErrorMessage('transaction'));
            wp_send_json_error($this->messager::getAjaxMessage('somethingWrong'));
        }

        wp_send_json_success([
            'message' => sprintf($this->messager::getAjaxMessage('successfulTransaction'), $transactionAction),
            'hash' => $transactionHash,
        ]);
    }

    public function getPaymentAddress(): void
    {
        $this->maybeInvalidPost();

        if (! $this->verifyRecaptcha()) {
            wp_send_json_error($this->messager::getAjaxMessage('notPermitted'));
        }

        $response = $this->application->paymentAddress();

        if (empty($response)) {
            $this->application->logger('actions')->error($this->messager::getErrorMessage('payment'));
            wp_send_json_error($this->messager::getAjaxMessage('somethingWrong'));
        }

        wp_send_json_success($response);
    }

    public function saveUserHandle(): void
    {
        $this->maybeInvalidPost(['ada_handle']);

        $adaHandle = $this->sanitization->sanitizePost('ada_handle');
        $userProfile = $this->application->userProfile();

        if ('' !== $adaHandle && ! in_array($adaHandle, $userProfile->storedHandles(), true)) {
            wp_send_json_error($this->messager::getAjaxMessage('notPermitted'));
        }

        $userProfile->saveFavoriteHandle($adaHandle);
        wp_send_json_success($this->messager::getAjaxMessage('handleSaved'));
    }

    /**
     * Verify the reCAPTCHA token server-side. Returns true when reCAPTCHA is
     * not configured (no secret), so sites without it are unaffected.
     */
    private function verifyRecaptcha(): bool
    {
        $recaptcha = (array) $this->application->option('recaptcha_key');
        $secret = (string) ($recaptcha['secret'] ?? '');

        if ('' === $secret) {
            return true;
        }

        $token = $this->postString('recaptcha_token');

        if ('' === $token) {
            return false;
        }

        $response = wp_remote_post('https://www.google.com/recaptcha/api/siteverify', [
            'timeout' => apply_filters('http_request_timeout', 5, ''),
            'body' => [
                'secret' => $secret,
                'response' => $token,
                'remoteip' => sanitize_text_field((string) ($_SERVER['REMOTE_ADDR'] ?? '')),
            ],
        ]);

        if (is_wp_error($response)) {
            return false;
        }

        $body = json_decode((string) wp_remote_retrieve_body($response), true);

        if (! is_array($body) || empty($body['success'])) {
            return false;
        }

        // Google names the site the token was issued for, so a token from another site is no good here.
        $host = (string) wp_parse_url(home_url(), PHP_URL_HOST);

        return empty($body['hostname']) || 0 === strcasecmp((string) $body['hostname'], $host);
    }
}
