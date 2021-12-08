<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use PBWebDev\CardanoPress\Application;
use PBWebDev\CardanoPress\Blockfrost;
use PBWebDev\CardanoPress\Profile;

class WalletAction
{
    public function __construct()
    {
        add_action('wp_ajax_nopriv_cardanopress_user_account', [$this, 'initializeUserAccount']);
        add_action('wp_ajax_cardanopress_reconnect_account', [$this, 'reconnectUserWallet']);
        add_action('wp_ajax_cardanopress_sync_assets', [$this, 'syncUserAssets']);
        add_action('wp_ajax_cardanopress_network_change', [$this, 'logoutCurrentUser']);
        add_action('wp_ajax_cardanopress_protocol_parameters', [$this, 'getProtocolParameters']);
        add_action('wp_ajax_cardanopress_pool_delegation', [$this, 'getDelegationData']);
        add_action('wp_ajax_cardanopress_wallet_transaction', [$this, 'saveWalletTransaction']);
    }

    public function initializeUserAccount(): void
    {
        check_ajax_referer('cardanopress-actions');

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

        if (
            $newAccount ||
            empty($userProfile->connectedNetwork()) ||
            empty($userProfile->connectedWallet()) ||
            empty($userProfile->connectedStake())
        ) {
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

    public function reconnectUserWallet(): void
    {
        check_ajax_referer('cardanopress-actions');

        if (empty($_POST['query_network']) || empty($_POST['wallet_address']) || empty($_POST['stake_address'])) {
            wp_send_json_error(__('Something is wrong. Please try again', 'cardanopress'));
        }

        $userProfile = new Profile(wp_get_current_user());

        $userProfile->saveNetwork($_POST['query_network']);
        $userProfile->saveWallet($_POST['wallet_address']);
        $userProfile->saveStake($_POST['stake_address']);

        wp_send_json_success();
    }

    public function syncUserAssets(): void
    {
        check_ajax_referer('cardanopress-actions');

        $userProfile = new Profile(wp_get_current_user());
        $stored = $userProfile->storedAssets();

        do_action('wp_login', $userProfile->getData('user_login'), $userProfile->getData());

        wp_send_json_success($stored !== $userProfile->storedAssets());
    }

    public function logoutCurrentUser(): void
    {
        $userProfile = new Profile(wp_get_current_user());
        $shouldReload = false;

        if ($_POST['query_network'] !== $userProfile->connectedNetwork()) {
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
        check_ajax_referer('cardanopress-actions');

        $network = $_POST['query_network'];
        $blockfrost = new Blockfrost($network);

        $response = $blockfrost->protocolParameters();

        if (empty($response)) {
            wp_send_json_error(__('Blockfrost API Error. Please try again', 'cardanopress'));
        }

        wp_send_json_success($response);
    }

    public function getDelegationData(): void
    {
        check_ajax_referer('cardanopress-actions');

        $network = $_POST['query_network'];
        $blockfrost = new Blockfrost($network);
        $account = $blockfrost->getAccountDetails($_POST['reward_address']);

        if (empty($account)) {
            wp_send_json_error(__('Blockfrost API Error. Please try again', 'cardanopress'));
        }

        $app = Application::instance();
        $poolIds = $app->option('delegation_pool_id');
        $pool = $blockfrost->getPoolDetails($poolIds[$network]);

        if (empty($pool)) {
            wp_send_json_error(__('Blockfrost API Error. Please try again', 'cardanopress'));
        }

        wp_send_json_success([
            'active' => $account['active'],
            'hex' => $pool['hex'],
        ]);
    }

    public function saveWalletTransaction(): void
    {
        check_ajax_referer('cardanopress-actions');

        $userProfile = new Profile(wp_get_current_user());
        $success = $userProfile->saveTransaction(
            $_POST['query_network'],
            $_POST['wallet_address'],
            $_POST['transaction_hash']
        );

        if (! $success) {
            wp_send_json_error(__('Something is wrong. Please try again', 'cardanopress'));
        }

        wp_send_json_success($_POST['transaction_hash']);
    }
}
