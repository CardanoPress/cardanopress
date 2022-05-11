<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use PBWebDev\CardanoPress\Admin;
use PBWebDev\CardanoPress\Application;
use PBWebDev\CardanoPress\Blockfrost;
use PBWebDev\CardanoPress\Profile;

class WalletAction
{
    public function __construct()
    {
        add_action('wp_ajax_nopriv_cardanopress_user_account', [$this, 'initializeUserAccount']);
        add_action('wp_ajax_cardanopress_user_account', [$this, 'connectUserWallet']);
        add_action('wp_ajax_cardanopress_reconnect_account', [$this, 'connectUserWallet']);
        add_action('wp_ajax_cardanopress_sync_assets', [$this, 'syncUserAssets']);
        add_action('wp_ajax_cardanopress_user_change', [$this, 'logoutCurrentUser']);
        add_action('wp_ajax_cardanopress_protocol_parameters', [$this, 'getProtocolParameters']);
        add_action('wp_ajax_cardanopress_account_details', [$this, 'getAccountDetails']);
        add_action('wp_ajax_cardanopress_pool_details', [$this, 'getPoolDetails']);
        add_action('wp_ajax_cardanopress_delegation_data', [$this, 'getDelegationData']);
        add_action('wp_ajax_cardanopress_wallet_transaction', [$this, 'saveWalletTransaction']);
        add_action('wp_ajax_nopriv_cardanopress_payment_address', [$this, 'getPaymentAddress']);
        add_action('wp_ajax_cardanopress_payment_address', [$this, 'getPaymentAddress']);
    }

    public function initializeUserAccount(): void
    {
        $this->maybeInvalid(['query_network', 'wallet_address', 'stake_address']);

        $address = $_POST['wallet_address'];
        $username = md5($address);
        $userId = username_exists($username);
        $shouldReload = false;
        $newAccount = false;

        if (! $userId) {
            $userId = wp_create_user($username, $address);
            $newAccount = true;

            if (is_wp_error($userId)) {
                wp_send_json_error([
                    'message' => 'API Error: ' . $userId->get_error_message(),
                ]);
            }
        }

        $user = get_user_by('id', $userId);
        $userProfile = new Profile($user);

        if ($newAccount || ! $userProfile->isConnected()) {
            $userProfile->saveNetwork($_POST['query_network']);
            $userProfile->saveWallet($_POST['wallet_address']);
            $userProfile->saveStake($_POST['stake_address']);
        }

        if ($userId !== get_current_user_id()) {
            $shouldReload = true;

            $userProfile->setUserAuth($username);
        }

        wp_send_json_success([
            'message' => 'Welcome ' . $username,
            'reload' => $shouldReload,
        ]);
    }

    public function connectUserWallet(): void
    {
        $this->maybeInvalid(['query_network', 'wallet_address', 'stake_address']);

        $userProfile = new Profile(wp_get_current_user());

        $userProfile->saveNetwork($_POST['query_network']);
        $userProfile->saveWallet($_POST['wallet_address']);
        $userProfile->saveStake($_POST['stake_address']);

        wp_send_json_success([
            'message' => 'Successfully connected',
            'reload' => false,
        ]);
    }

    public function syncUserAssets(): void
    {
        $this->maybeInvalid();

        $userProfile = new Profile(wp_get_current_user());
        $stored = $userProfile->storedAssets();

        do_action('wp_login', $userProfile->getData('user_login'), $userProfile->getData());

        wp_send_json_success($stored !== $userProfile->storedAssets());
    }

    public function logoutCurrentUser(): void
    {
        $this->maybeInvalid(['query_network', 'wallet_address']);

        $userProfile = new Profile(wp_get_current_user());
        $shouldReload = false;

        if (
            $_POST['query_network'] !== $userProfile->connectedNetwork() ||
            $_POST['wallet_address'] !== $userProfile->connectedWallet()
        ) {
            $shouldReload = true;

            $userProfile->unsetUserAuth();
        }

        $message = $shouldReload ? 'Bye' : 'Hello';

        wp_send_json_success([
            'message' => $message . ' ' . $userProfile->getData('user_login'),
            'reload' => $shouldReload,
        ]);
    }

    public function getProtocolParameters(): void
    {
        $this->maybeInvalid(['query_network']);

        $network = $_POST['query_network'];

        if (! Blockfrost::isReady($network)) {
            wp_send_json_error(__('Unsupported network ' . $network, 'cardanopress'));
        }

        $blockfrost = new Blockfrost($network);

        $response = $blockfrost->protocolParameters();

        if (empty($response)) {
            wp_send_json_error(__('Blockfrost API Error. Please try again', 'cardanopress'));
        }

        wp_send_json_success($response);
    }

    public function getAccountDetails(): void
    {
        $this->maybeInvalid(['query_network', 'reward_address']);

        $network = $_POST['query_network'];

        if (! Blockfrost::isReady($network)) {
            wp_send_json_error(__('Unsupported network ' . $network, 'cardanopress'));
        }

        $blockfrost = new Blockfrost($network);
        $response = $blockfrost->getAccountDetails($_POST['reward_address']);

        if (empty($response)) {
            wp_send_json_error(__('Blockfrost API Error. Please try again', 'cardanopress'));
        }

        wp_send_json_success($response);
    }

    public function getPoolDetails(): void
    {
        $this->maybeInvalid(['query_network', 'pool_id']);

        $network = $_POST['query_network'];

        if (! Blockfrost::isReady($network)) {
            wp_send_json_error(__('Unsupported network ' . $network, 'cardanopress'));
        }

        $blockfrost = new Blockfrost($network);
        $response = $blockfrost->getPoolDetails($_POST['pool_id']);

        if (empty($response)) {
            wp_send_json_error(__('Blockfrost API Error. Please try again', 'cardanopress'));
        }

        wp_send_json_success($response);
    }

    public function getDelegationData(): void
    {
        $this->maybeInvalid();

        $poolData = Application::instance()->delegationPool();
        $response = $poolData['hex'] ?? '';

        if (empty($response)) {
            wp_send_json_error(__('Something is wrong. Please try again', 'cardanopress'));
        }

        wp_send_json_success($response);
    }

    public function saveWalletTransaction(): void
    {
        $this->maybeInvalid(['query_network', 'transaction_action', 'transaction_hash']);

        $userProfile = new Profile(wp_get_current_user());
        $success = $userProfile->saveTransaction(
            $_POST['query_network'],
            $_POST['transaction_action'],
            $_POST['transaction_hash']
        );

        if (! $success) {
            wp_send_json_error(__('Something is wrong. Please try again', 'cardanopress'));
        }

        wp_send_json_success($_POST['transaction_hash']);
    }

    public function getPaymentAddress(): void
    {
        $this->maybeInvalid();

        $response = Application::instance()->paymentAddress();

        if (empty($response)) {
            wp_send_json_error(__('Something is wrong. Please try again', 'cardanopress'));
        }

        wp_send_json_success($response);
    }

    private function maybeInvalid(array $postVars = array()): void
    {
        check_ajax_referer(Admin::OPTION_KEY . '-actions');

        if (empty($postVars) || empty(array_diff($postVars, array_keys($_POST)))) {
            return;
        }

        wp_send_json_error(__('Something is wrong. Please try again', 'cardanopress'));
    }
}
