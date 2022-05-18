<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use PBWebDev\CardanoPress\Application;
use PBWebDev\CardanoPress\Blockfrost;
use PBWebDev\CardanoPress\Collection;
use PBWebDev\CardanoPress\Installer;
use PBWebDev\CardanoPress\Profile;

class CoreAction
{
    public function __construct()
    {
        add_filter('plugin_action_links_' . plugin_basename(CARDANOPRESS_FILE), [$this, 'addSettingsLink']);
        add_action('wp_login', [$this, 'checkWalletAssets'], 10, 2);
        add_action('wp_login', [$this, 'checkDelegationStatus'], 10, 2);
        add_action('parse_request', [$this, 'maybeRedirect']);
    }

    public function addSettingsLink(array $links): array
    {
        $settings = Installer::instance()->getSettingsLink(__('Settings', 'cardanopress'));

        return array_merge(compact('settings'), $links);
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

        if (! $queryNetwork || ! $stakeAddress || ! Blockfrost::isReady($queryNetwork)) {
            return;
        }

        $blockfrost = new Blockfrost($queryNetwork);
        $assetAccess = $app->option('asset_access');
        $policyIds = array_column($assetAccess, 'id');
        $assets = [];
        $page = 1;

        do {
            $response = $blockfrost->associatedAssets($stakeAddress, $page);

            foreach ($response as $asset) {
                $data = $blockfrost->specificAsset($asset['unit']);
                $collection = new Collection($data);
                $assets[] = $collection->filteredAsset();
                $index = array_search($data['policy_id'], $policyIds, true);

                if (false === $index || $userProfile->hasRole($assetAccess[$index]['role'])) {
                    continue;
                }

                $userProfile->addRole($assetAccess[$index]['role']);
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
        $customRole = $app->option('ua_additional_role');

        if ($userProfile->hasRole($customRole)) {
            return;
        }

        $queryNetwork = $userProfile->connectedNetwork();
        $stakeAddress = $userProfile->connectedStake();

        if (! $queryNetwork || ! $stakeAddress || ! Blockfrost::isReady($queryNetwork)) {
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
                    $userProfile->addRole($customRole);
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
