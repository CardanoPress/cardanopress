<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\NamiPress\Actions;

use PBWebDev\NamiPress\Application;
use PBWebDev\NamiPress\Blockfrost;
use PBWebDev\NamiPress\Collection;
use PBWebDev\NamiPress\Profile;

class CoreAction
{
    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'injectScriptVariables']);
        add_action('wp_login', [$this, 'checkWalletAssets'], 10, 2);
        add_action('parse_request', [$this, 'maybeRedirect']);
    }

    public function injectScriptVariables(): void
    {
        wp_register_script('namipress-dummy', '');
        wp_enqueue_script('namipress-dummy');

        $data = [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            '_nonce' => wp_create_nonce('namipress-actions'),
            'logged' => is_user_logged_in(),
        ];

        wp_localize_script('namipress-dummy', 'namiPress', $data);
    }

    public function checkWalletAssets($username, $user): void
    {
        $userProfile = new Profile($user);
        $queryNetwork = $userProfile->connectedNetwork();
        $stakeAddress = $userProfile->connectedStake();

        if (! $queryNetwork || ! $stakeAddress) {
            return;
        }

        $blockfrost = new Blockfrost($queryNetwork);
        $assets = [];
        $page = 1;

        do {
            $response = $blockfrost->associatedAssets($stakeAddress, $page);

            foreach ($response as $asset) {
                $data = $blockfrost->specificAsset($asset['unit']);
                $collection = new Collection($data);
                $assets[] = $collection->filteredAsset();
            }

            $page++;
        } while (100 === count($response));

        $assets = array_filter($assets);

        $userProfile->saveAssets($assets);
    }

    public function maybeRedirect(): void
    {
        if (is_user_logged_in()) {
            return;
        }

        $app = Application::instance();
        $dashboardPage = $app->option('member_dashboard');
        $collectionPage = $app->option('member_collection');

        if (! $dashboardPage) {
            $dashboardPage = get_option('page_on_front');
        }

        global $wp;

        $currentLink = trailingslashit(home_url($wp->request));
        $dashboardLink = get_permalink($dashboardPage);
        $collectionLink = get_permalink($collectionPage);

        if ($currentLink === $collectionLink) {
            wp_safe_redirect($dashboardLink);
            exit;
        }
    }
}
