<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use CardanoPress\Interfaces\HookInterface;
use PBWebDev\CardanoPress\Application;
use PBWebDev\CardanoPress\Blockfrost;
use PBWebDev\CardanoPress\Collection;
use PBWebDev\CardanoPress\Manifest;
use PBWebDev\CardanoPress\Profile;

class CoreAction implements HookInterface
{
    protected Application $application;

    public function __construct()
    {
        $this->application = Application::getInstance();
    }

    public function setupHooks(): void
    {
        add_action('wp_login', [$this, 'doWalletStatusChecks'], 10, 2);
        add_action('parse_request', [$this, 'maybeRedirect']);
        add_action('wp_ajax_cardanopress_save_handle', [$this, 'saveUserHandle']);
        add_action('wp_enqueue_scripts', [$this, 'localizeMessages'], 20);
    }

    protected static function customizableMessages(string $type): array
    {
        $data = [
            'script' => [
                'connected' => __('Successfully connected', 'cardanopress'),
                'connecting' => __('Connecting...', 'cardanopress'),
                'reconnected' => __('Wallet reconnected', 'cardanopress'),
                'reconnecting' => __('Reconnecting...', 'cardanopress'),
                'walletSyncing' => __('Syncing...', 'cardanopress'),
                'newAssetsPulled' => __('New assets pulled', 'cardanopress'),
                'handleSaving' => __('Saving...', 'cardanopress'),
                'delegating' => __('Processing...', 'cardanopress'),
                'paying' => __('Processing...', 'cardanopress'),
            ],
            'ajax' => [
                'welcome' => __('Welcome %s', 'cardanopress'),
                'connected' => __('Successfully connected', 'cardanopress'),
                'walletSynced' => __('Successfully synced', 'cardanopress'),
                'handleSaved' => __('Successfully saved', 'cardanopress'),
                'successfulTransaction' => __('Successful %s', 'cardanopress'),
                'somethingWrong' => __('Something is wrong. Please try again', 'cardanopress'),
                'unsupportedNetwork' => __('Unsupported network %s', 'cardanopress'),
                'blockfrostError' => __('Blockfrost API Error. Please try again', 'cardanopress'),
                'notPermitted' => __('You don\'t have permission to do this.', 'cardanopress'),
            ],
        ];

        return $data[$type];
    }

    public static function getAjaxMessage(string $type): string
    {
        $messages = apply_filters('cardanopress_ajax_messages', self::customizableMessages('ajax'));

        return $messages[$type] ?? '';
    }

    public function localizeMessages()
    {
        $messages = apply_filters('cardanopress_script_messages', $this->customizableMessages('script'));

        wp_localize_script(Manifest::HANDLE_PREFIX . 'script', 'cardanoPressMessages', $messages);
    }

    public function doWalletStatusChecks($username, $user): void
    {
        if (! $this->application->isReady()) {
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
        $assetAccess = $this->application->option('asset_access');
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
        $customRole = $this->application->option('ua_additional_role');

        if ($userProfile->hasRole($customRole)) {
            return;
        }

        $poolIds = $this->application->option('delegation_pool_id');
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

                if ($active >= $this->application->option('ua_required_epoch')) {
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

        $dashboardPage = $this->application->option('member_dashboard');
        $collectionPage = $this->application->option('member_collection');

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
        check_ajax_referer(Manifest::HANDLE_PREFIX . 'actions');

        if (empty($_POST['ada_handle'])) {
            wp_send_json_error($this->getAjaxMessage('somethingWrong'));
        }

        $userProfile = $this->application->userProfile();

        $userProfile->saveFavoriteHandle($_POST['ada_handle']);
        wp_send_json_success($this->getAjaxMessage('handleSaved'));
    }
}
