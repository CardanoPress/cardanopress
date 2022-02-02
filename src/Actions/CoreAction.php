<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use PBWebDev\CardanoPress\Application;
use PBWebDev\CardanoPress\Blockfrost;
use PBWebDev\CardanoPress\Collection;
use PBWebDev\CardanoPress\Profile;

class CoreAction
{
    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'injectScriptVariables']);
        add_action('wp_login', [$this, 'checkWalletAssets'], 10, 2);
        add_action('wp_login', [$this, 'checkDelegationStatus'], 10, 2);
        add_action('parse_request', [$this, 'maybeRedirect']);
    }

    public function injectScriptVariables(): void
    {
        $app = Application::instance();

        if (! $app->isReady()) {
            return;
        }

        wp_register_script('cardanopress-dummy', '');
        wp_enqueue_script('cardanopress-dummy');

        $data = [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            '_nonce' => wp_create_nonce('cardanopress-actions'),
            'logged' => is_user_logged_in(),
        ];

        wp_localize_script('cardanopress-dummy', 'cardanoPress', $data);
    }

    public function checkWalletAssets($username, $user): void
    {
        $app = Application::instance();

        if (! $app->isReady()) {
            return;
        }

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

    public function checkDelegationStatus($username, $user): void
    {
        $app = Application::instance();

        if (! $app->isReady()) {
            return;
        }

        $userProfile = new Profile($user);
        $queryNetwork = $userProfile->connectedNetwork();
        $stakeAddress = $userProfile->connectedStake();

        if (! $queryNetwork || ! $stakeAddress) {
            return;
        }

        $poolIds = $app->option('delegation_pool_id');
        $blockfrost = new Blockfrost($queryNetwork);
        $wanted = [];
        $page = 1;

        do {
            $response = $blockfrost->getAccountHistory($stakeAddress, $page);

            foreach ($response as $history) {
                if ($history['pool_id'] === $poolIds[$queryNetwork]) {
                    $wanted = $history;
                    break;
                }
            }

            $page++;
        } while (100 === count($response));

        if (! empty($wanted)) {
            $latest = $blockfrost->getEpochsLatest();

            if (! empty($latest)) {
                $active = $latest['epoch'] - $wanted['active_epoch'];

                if ($active >= $app->option('ua_required_epoch')) {
                    $userProfile->addRole($app->option('ua_additional_role'));
                }
            }
        }
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
