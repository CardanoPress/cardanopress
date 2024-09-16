<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use CardanoPress\Dependencies\CardanoPHP\Verifier;
use CardanoPress\Interfaces\HookInterface;
use PBWebDev\CardanoPress\Application;
use PBWebDev\CardanoPress\Blockfrost;
use PBWebDev\CardanoPress\Manifest;
use PBWebDev\CardanoPress\Profile;

class WalletAction implements HookInterface
{
    protected Application $application;
    protected Sanitization $sanitization;

    public function __construct()
    {
        $this->application = Application::getInstance();
        $this->sanitization = new Sanitization();
    }

    public function setupHooks(): void
    {
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
    }

    private function verifyDataSignature(array $data, string $walletAddress): bool
    {
        list($signature, $key) = $data;
        $message = CoreAction::getAjaxMessage('dataMessage');

        return Verifier::verify($signature, $key, $message, $walletAddress);
    }

    public function initializeUserAccount(): void
    {
        $this->maybeInvalid(['query_network', 'wallet_address', 'stake_address']);

        $queryNetwork = $this->sanitization->sanitizePost('query_network');
        $walletAddress = $this->sanitization->sanitizePost('wallet_address');
        $stakeAddress = $this->sanitization->sanitizePost('stake_address');
        $dataSignature = $this->sanitization->sanitizePost('data_signature');

        if (! $this->verifyDataSignature(explode('|', $dataSignature), $walletAddress)) {
            wp_send_json_error(CoreAction::getAjaxMessage('incorrectSignature'));
        }

        $username = md5($stakeAddress);
        $userId = username_exists($username);
        $shouldReload = false;
        $newAccount = false;

        if (! $userId) {
            $userId = wp_create_user($username, wp_hash_password($stakeAddress));
            $newAccount = true;

            if (is_wp_error($userId)) {
                $this->application->logger('actions')->error($userId->get_error_message());
                wp_send_json_error(CoreAction::getAjaxMessage('somethingWrong'));
            }
        }

        $user = get_user_by('id', $userId);
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
            'message' => sprintf(CoreAction::getAjaxMessage('welcome'), $username),
            'reload' => $shouldReload,
        ]);
    }

    public function connectUserWallet(): void
    {
        $this->maybeInvalid(['query_network', 'wallet_address', 'stake_address']);

        $queryNetwork = $this->sanitization->sanitizePost('query_network');
        $walletAddress = $this->sanitization->sanitizePost('wallet_address');
        $stakeAddress = $this->sanitization->sanitizePost('stake_address');
        $userProfile = $this->application->userProfile();

        $userProfile->saveNetwork($queryNetwork);
        $userProfile->saveWallet($walletAddress);
        $userProfile->saveStake($stakeAddress);

        do_action('wp_login', $userProfile->getData('user_login'), $userProfile->getData());

        wp_send_json_success([
            'message' => CoreAction::getAjaxMessage('connected'),
            'reload' => false,
        ]);
    }

    public function syncUserAssets(): void
    {
        $this->maybeInvalid();

        $userProfile = $this->application->userProfile();
        $stored = $userProfile->storedAssets();

        do_action('wp_login', $userProfile->getData('user_login'), $userProfile->getData());

        wp_send_json_success([
            'message' => CoreAction::getAjaxMessage('walletSynced'),
            'updated' => $stored !== $userProfile->storedAssets(),
        ]);
    }

    public function logoutCurrentUser(): void
    {
        $this->maybeInvalid(['query_network', 'wallet_address']);

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
        $this->maybeInvalid(['query_network']);

        $queryNetwork = $this->sanitization->sanitizePost('query_network');

        if (! Blockfrost::isReady($queryNetwork)) {
            wp_send_json_error(sprintf(CoreAction::getAjaxMessage('unsupportedNetwork'), $queryNetwork));
        }

        $blockfrost = new Blockfrost($queryNetwork);
        $response = $blockfrost->protocolParameters();

        if (empty($response)) {
            $this->application->logger('actions')->error(CoreAction::getErrorMessage('blockfrost'));
            wp_send_json_error(CoreAction::getAjaxMessage('blockfrostError'));
        }

        wp_send_json_success($response);
    }

    public function getAccountDetails(): void
    {
        $this->maybeInvalid(['query_network', 'reward_address']);

        $queryNetwork = $this->sanitization->sanitizePost('query_network');
        $rewardAddress = $this->sanitization->sanitizePost('reward_address');

        if (! Blockfrost::isReady($queryNetwork)) {
            wp_send_json_error(sprintf(CoreAction::getAjaxMessage('unsupportedNetwork'), $queryNetwork));
        }

        $blockfrost = new Blockfrost($queryNetwork);
        $response = $blockfrost->getAccountDetails($rewardAddress);

        if (empty($response)) {
            $this->application->logger('actions')->error(CoreAction::getErrorMessage('blockfrost'));
            wp_send_json_error(CoreAction::getAjaxMessage('blockfrostError'));
        }

        wp_send_json_success($response);
    }

    public function getDelegationData(): void
    {
        $this->maybeInvalid();

        $poolData = $this->application->delegationPool();
        $response = $poolData['hex'] ?? '';

        if (empty($response)) {
            $this->application->logger('actions')->error(CoreAction::getErrorMessage('delegation'));
            wp_send_json_error(CoreAction::getAjaxMessage('somethingWrong'));
        }

        wp_send_json_success($response);
    }

    public function saveWalletTransaction(): void
    {
        $this->maybeInvalid(['query_network', 'transaction_action', 'transaction_hash']);

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
            $this->application->logger('actions')->error(CoreAction::getErrorMessage('transaction'));
            wp_send_json_error(CoreAction::getAjaxMessage('somethingWrong'));
        }

        wp_send_json_success([
            'message' => sprintf(CoreAction::getAjaxMessage('successfulTransaction'), $transactionAction),
            'hash' => $transactionHash,
        ]);
    }

    public function getPaymentAddress(): void
    {
        $this->maybeInvalid();

        $response = $this->application->paymentAddress();

        if (empty($response)) {
            $this->application->logger('actions')->error(CoreAction::getErrorMessage('payment'));
            wp_send_json_error(CoreAction::getAjaxMessage('somethingWrong'));
        }

        wp_send_json_success($response);
    }

    private function maybeInvalid(array $postVars = []): void
    {
        if (is_user_logged_in()) {
            check_ajax_referer(Manifest::HANDLE_PREFIX . 'actions');
        }

        if (! is_allowed_http_origin()) {
            $message = sprintf(CoreAction::getErrorMessage('unauthorized'), get_http_origin());

            $this->application->logger('actions')->error($message);
            wp_send_json_error(CoreAction::getAjaxMessage('notPermitted'));
        }

        if (empty($postVars) || (! empty($_POST) && empty(array_diff($postVars, array_keys($_POST))))) {
            return;
        }

        $this->application->logger('actions')->error(CoreAction::getErrorMessage('incomplete'));
        wp_send_json_error(CoreAction::getAjaxMessage('somethingWrong'));
    }
}
