<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use PBWebDev\CardanoPress\Admin;
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
        add_action('wp_login', [$this, 'doWalletStatusChecks'], 10, 2);
        add_action('parse_request', [$this, 'maybeRedirect']);
        add_action('wp_ajax_cardanopress_save_handle', [$this, 'saveUserHandle']);
        add_action('wp_enqueue_scripts', [$this, 'localizeMessages']);
    }

    public function localizeMessages()
    {
        $data = [
            'connected' => __('Successfully connected', 'cardanopress'),
            'connecting' => __('Connecting...', 'cardanopress'),
            'reconnected' => __('Wallet reconnected', 'cardanopress'),
            'reconnecting' => __('Reconnecting...', 'cardanopress'),
            'walletSyncing' => __('Syncing...', 'cardanopress'),
            'newAssetsPulled' => __('New assets pulled', 'cardanopress'),
            'handleSaving' => __('Saving...', 'cardanopress'),
            'delegating' => __('Processing...', 'cardanopress'),
            'paying' => __('Processing...', 'cardanopress'),
        ];

        wp_localize_script(Admin::OPTION_KEY . '-script', 'cardanoPressMessages', $data);
    }

    public function addSettingsLink(array $links): array
    {
        $settings = Installer::instance()->getSettingsLink(__('Settings', 'cardanopress'));

        return array_merge(compact('settings'), $links);
    }

    public function doWalletStatusChecks($username, $user): void
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

        do_action('cardanopress_wallet_status_checks', $user, $blockfrost);

        $this->checkWalletAssets($stakeAddress, $userProfile, $blockfrost);
        $this->checkDelegationStatus($stakeAddress, $queryNetwork, $userProfile, $blockfrost);
    }

    public function checkWalletAssets(string $stakeAddress, Profile $userProfile, Blockfrost $blockfrost): void
    {
        $app = Application::instance();
        $assetAccess = $app->option('asset_access');
        $assetAccessPolicyIds = array_column($assetAccess, 'id');
        $wantedPolicyIds = Collection::wantedPolicyIds($assetAccessPolicyIds);
        $wantedPolicyIdsRegExPattern = '/^' . implode('|', $wantedPolicyIds) . '/';
        $assets = [];
        $handles = [];
        $page = 1;

        do {
            $response = $blockfrost->associatedAssets($stakeAddress, $page);

            do_action('cardanopress_associated_assets', $stakeAddress, $response, $page);

            foreach ($response as $asset) {
                if (! preg_match($wantedPolicyIdsRegExPattern, $asset['unit'])) {
                    continue;
                }

                $data = $blockfrost->specificAsset($asset['unit']);
                $collection = new Collection($data);
                $assets[] = $collection->filteredAsset();
                $handles[] = $collection->grabHandle();
                $index = array_search($data['policy_id'], $assetAccessPolicyIds, true);

                if (false === $index || $userProfile->hasRole($assetAccess[$index]['role'])) {
                    continue;
                }

                $userProfile->addRole($assetAccess[$index]['role']);
            }

            $page++;
        } while (100 === count($response));

        $assets = array_filter($assets);
        $handles = array_filter($handles);

        $userProfile->saveAssets($assets);
        $userProfile->saveHandles($handles);
    }

    public function checkDelegationStatus(
        string $stakeAddress,
        string $queryNetwork,
        Profile $userProfile,
        Blockfrost $blockfrost
    ): void {
        $app = Application::instance();
        $customRole = $app->option('ua_additional_role');

        if ($userProfile->hasRole($customRole)) {
            return;
        }

        $poolIds = $app->option('delegation_pool_id');
        $wanted = [];
        $page = 1;

        do {
            $response = $blockfrost->getAccountHistory($stakeAddress, $page);

            do_action('cardanopress_account_history', $stakeAddress, $response, $page);

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

    public function saveUserHandle()
    {
        check_ajax_referer(Admin::OPTION_KEY . '-actions');

        if (empty($_POST['ada_handle'])) {
            wp_send_json_error(__('Something is wrong. Please try again', 'cardanopress'));
        }

        $userProfile = Application::instance()->userProfile();

        $userProfile->saveFavoriteHandle($_POST['ada_handle']);
        wp_send_json_success(__('Successfully saved', 'cardanopress'));
    }
}
