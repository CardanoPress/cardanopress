<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\NamiPress\Actions;

use PBWebDev\NamiPress\Application;
use PBWebDev\NamiPress\Blockfrost;
use PBWebDev\NamiPress\Profile;

class WalletAction
{
    public function __construct()
    {
        add_action('wp_ajax_nopriv_namipress_user_account', [$this, 'initializeUserAccount']);
        add_action('wp_ajax_namipress_reconnect_account', [$this, 'reconnectUserWallet']);
        add_action('wp_ajax_namipress_sync_assets', [$this, 'syncUserAssets']);
        add_action('wp_ajax_namipress_network_change', [$this, 'logoutCurrentUser']);
        add_action('wp_ajax_namipress_protocol_parameters', [$this, 'getProtocolParameters']);
    }

    public function initializeUserAccount(): void
    {
        check_ajax_referer('namipress-actions');

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

        if ($newAccount || empty($userProfile->connectedStake())) {
            $blockfrost = new Blockfrost($_POST['query_network']);
            $response = $blockfrost->stakeAddress($address);

            if (! empty($response)) {
                $userProfile->saveNetwork($_POST['query_network']);
                $userProfile->saveWallet($address);
                $userProfile->saveStake($response['stake_address']);
            }
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
        check_ajax_referer('namipress-actions');

        $blockfrost = new Blockfrost($_POST['query_network']);
        $response = $blockfrost->stakeAddress($_POST['wallet_address']);

        if (empty($response)) {
            wp_send_json_error(__('Blockfrost API Error. Please try again', 'ronin-universe'));
        }

        $userProfile = new Profile(wp_get_current_user());

        $userProfile->saveNetwork($_POST['query_network']);
        $userProfile->saveWallet($_POST['wallet_address']);
        $userProfile->saveStake($response['stake_address']);

        wp_send_json_success();
    }

    public function syncUserAssets(): void
    {
        check_ajax_referer('namipress-actions');

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
        check_ajax_referer('namipress-actions');

        $network = $_POST['query_network'];
        $blockfrost = new Blockfrost($network);

        $response = $blockfrost->protocolParameters();

        if (empty($response)) {
            wp_send_json_error(__('Blockfrost API Error. Please try again', 'ronin-universe'));
        }

        wp_send_json_success($response);
    }
}
