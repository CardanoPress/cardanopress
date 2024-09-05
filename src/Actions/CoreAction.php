<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use CardanoPress\Helpers\NumberHelper;
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

    protected static function dataMessage(): string
    {
        return apply_filters(
            'cardanopress_data_message',
            sprintf(__('Login to %s', 'cardanopress'), get_bloginfo('name'))
        );
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
                'clipboardCopy' => __('Successfully copied', 'cardanopress'),
            ],
            'ajax' => [
                /* translators: %s: connected username */
                'welcome' => __('Welcome %s', 'cardanopress'),
                'connected' => __('Successfully connected', 'cardanopress'),
                'walletSynced' => __('Successfully synced', 'cardanopress'),
                'handleSaved' => __('Successfully saved', 'cardanopress'),
                /* translators: %s: transaction action */
                'successfulTransaction' => __('Successful %s', 'cardanopress'),
                'somethingWrong' => __('Something is wrong. Please try again', 'cardanopress'),
                /* translators: %s: cardano environment */
                'unsupportedNetwork' => __('Unsupported network %s', 'cardanopress'),
                'blockfrostError' => __('Blockfrost API Error. Please try again', 'cardanopress'),
                'notPermitted' => __('You don\'t have permission to do this.', 'cardanopress'),
                'incorrectSignature' => __('Provided data signature is incorrect.', 'cardanopress'),
            ],
            'error' => [
                /* translators: %s: http origin */
                'unauthorized' => __('Bad AJAX request. Unauthorized HTTP origin %s', 'cardanopress'),
                'incomplete' => __('Bad AJAX request. Received missing required field/s data.', 'cardanopress'),
                'delegation' => __('Incomplete delegation settings. Empty pool details.', 'cardanopress'),
                'transaction' => __('Unable to save transaction details to user meta.', 'cardanopress'),
                'payment' => __('Incomplete payment settings. Empty wallet address to send funds.', 'cardanopress'),
                'blockfrost' => __('Bad blockfrost response. Actual data received in separate log.', 'cardanopress'),
            ],
        ];

        return $data[$type];
    }

    public static function getAjaxMessage(string $type): string
    {
        $messages = apply_filters('cardanopress_ajax_messages', self::customizableMessages('ajax'));
        $messages['dataMessage'] = self::dataMessage();

        return $messages[$type] ?? '';
    }

    public static function getErrorMessage(string $type): string
    {
        $messages = apply_filters('cardanopress_error_messages', self::customizableMessages('error'));

        return $messages[$type] ?? '';
    }

    public function localizeMessages()
    {
        $messages = apply_filters('cardanopress_script_messages', $this->customizableMessages('script'));
        $messages['dataMessage'] = $this->dataMessage();

        wp_localize_script(Manifest::HANDLE_PREFIX . 'script', 'cardanoPressMessages', $messages);
    }

    public function doWalletStatusChecks($username, $user): void
    {
        $userProfile = new Profile($user);

        $this->checkManagedRoles($userProfile);

        if (! $this->application->isReady()) {
            return;
        }

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

    public function checkManagedRoles(Profile $userProfile): void
    {
        $roles = $this->application->option('managed_roles');

        if (
            empty($roles) ||
            ! $userProfile->connectedNetwork() ||
            ! $userProfile->connectedWallet() ||
            ! $userProfile->connectedStake()
        ) {
            return;
        }

        foreach ($roles as $role) {
            if (!$userProfile->hasRole($role)) {
                continue;
            }

            $userProfile->removeRole($role);
        }
    }

    protected function getAssetAccess(): array
    {
        $assetAccess = $this->application->option('asset_access');

        return array_filter($assetAccess, function ($access) {
            return ! empty($access['id']) && ! empty($access['role']);
        });
    }

    public function checkWalletAssets(string $stakeAddress, Profile $userProfile, Blockfrost $blockfrost): void
    {
        $assetAccess = $this->getAssetAccess();
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

                do_action('cardanopress_associated_asset', $stakeAddress, $data, $asset);

                $collection = new Collection($data);
                $assets[] = $collection->filteredAsset($asset['quantity']);
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

        if (! in_array($userProfile->getFavoriteHandle(), $handles, true)) {
            $userProfile->saveFavoriteHandle('');
        }

        $userProfile->saveAssets($assets);
        $userProfile->saveHandles($handles);
    }

    public function checkDelegationStatus(
        string $stakeAddress,
        string $queryNetwork,
        Profile $userProfile,
        Blockfrost $blockfrost
    ): void {
        $userProfile->saveAccountInfo($blockfrost->getAccountDetails($stakeAddress));

        $customRole = $this->application->option('ua_additional_role');
        $poolIds = $this->application->option('delegation_pool_id');
        $wanted = [];
        $page = 1;

        do {
            $response = $blockfrost->getAccountHistory($stakeAddress, $page, 'desc');

            do_action('cardanopress_account_history', $stakeAddress, $response, $page);

            if (empty($wanted)) {
                $wanted = array_filter($response, function ($history) use ($poolIds, $queryNetwork) {
                    return (
                        $history['pool_id'] === $poolIds[$queryNetwork] &&
                        NumberHelper::lovelaceToAda($history['amount']) >= $this->application->option('amount')
                    );
                });
            }

            $page++;
        } while (100 === count($response));

        if ($userProfile->hasRole($customRole)) {
            return;
        }

        if (! empty($wanted)) {
            $latest = $blockfrost->getEpochsLatest();

            if (
                ! empty($latest) &&
                count($wanted) >= $this->application->option('ua_required_epoch') &&
                $latest['epoch'] <= $wanted[array_key_first($wanted)]['active_epoch']
            ) {
                $userProfile->addRole($customRole);
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

        if ($currentLink === $collectionLink && $currentLink !== $dashboardLink) {
            wp_safe_redirect($dashboardLink);
            exit;
        }
    }

    public function saveUserHandle()
    {
        check_ajax_referer(Manifest::HANDLE_PREFIX . 'actions');

        $adaHandle = (new Sanitization())->sanitizePost('ada_handle');
        $userProfile = $this->application->userProfile();

        $userProfile->saveFavoriteHandle($adaHandle);
        wp_send_json_success($this->getAjaxMessage('handleSaved'));
    }
}
