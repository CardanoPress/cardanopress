<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use CardanoPress\Dependencies\CardanoPHP\Verifier;
use CardanoPress\Interfaces\HookInterface;
use CardanoPress\Traits\HasPostInput;
use PBWebDev\CardanoPress\Application;
use PBWebDev\CardanoPress\Blockfrost;
use PBWebDev\CardanoPress\Manifest;
use PBWebDev\CardanoPress\Profile;
use WP_Error;

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

    /** @param string[] $data */
    private function verifyDataSignature(array $data, string $walletAddress, string $message): bool
    {
        list($signature, $key) = $data;

        return Verifier::verify($signature, $key, $message, $walletAddress);
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

        $token = bin2hex(random_bytes(16));

        set_transient(self::CHALLENGE_PREFIX . $token, time(), self::CHALLENGE_TTL);

        wp_send_json_success([
            'nonce' => $token,
            'message' => CoreAction::challengeMessage($token),
        ]);
    }

    /**
     * Validate and consume a login challenge token, returning the exact message
     * that was issued for it. Sends a JSON error (and exits) when invalid.
     */
    private function consumeChallenge(): string
    {
        $token = $this->postString('login_nonce');

        if ('' === $token || false === get_transient(self::CHALLENGE_PREFIX . $token)) {
            wp_send_json_error($this->messager::getAjaxMessage('incorrectSignature'));
        }

        // Single use: invalidate immediately so a token can never be replayed.
        delete_transient(self::CHALLENGE_PREFIX . $token);

        return CoreAction::challengeMessage($token);
    }

    public function initializeUserAccount(): void
    {
        $this->maybeInvalidPost(['query_network', 'wallet_address', 'stake_address', 'data_signature']);

        $queryNetwork = $this->sanitization->sanitizePost('query_network');
        $walletAddress = $this->sanitization->sanitizePost('wallet_address');
        $stakeAddress = $this->sanitization->sanitizePost('stake_address');
        $dataSignature = $this->sanitization->sanitizePost('data_signature');

        $message = $this->consumeChallenge();

        if (! $this->verifyDataSignature(explode('|', $dataSignature), $walletAddress, $message)) {
            wp_send_json_error($this->messager::getAjaxMessage('incorrectSignature'));
        }

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
        }

        $user = get_user_by('id', $userId);

        if (false === $user) {
            wp_send_json_error($this->messager::getAjaxMessage('somethingWrong'));
            return;
        }

        $userProfile = new Profile($user);

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

    public function connectUserWallet(): void
    {
        $this->maybeInvalidPost(['query_network', 'wallet_address', 'stake_address', 'data_signature']);

        $queryNetwork = $this->sanitization->sanitizePost('query_network');
        $walletAddress = $this->sanitization->sanitizePost('wallet_address');
        $stakeAddress = $this->sanitization->sanitizePost('stake_address');
        $dataSignature = $this->sanitization->sanitizePost('data_signature');

        $message = $this->consumeChallenge();

        if (! $this->verifyDataSignature(explode('|', $dataSignature), $walletAddress, $message)) {
            wp_send_json_error($this->messager::getAjaxMessage('incorrectSignature'));
        }

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

        if (! Blockfrost::isReady($queryNetwork)) {
            wp_send_json_error(sprintf($this->messager::getAjaxMessage('unsupportedNetwork'), $queryNetwork));
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

        return is_array($body) && ! empty($body['success']);
    }
}
