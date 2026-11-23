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
use Throwable;
use WP_User;

class CoreAction implements HookInterface
{
    public const RECHECK_HOOK = 'cardanopress_recheck_roles';
    public const CHECKED_META = 'cardanopress_last_checked';
    public const STAKE_META = 'cardanopress_connected_stake';
    public const ASSET_CACHE_PREFIX = 'cardanopress_asset_';

    protected Application $application;

    public function __construct()
    {
        $this->application = Application::getInstance();
    }

    public function setupHooks(): void
    {
        add_action('wp_login', [$this, 'doWalletStatusChecks'], 10, 2);
        add_action('parse_request', [$this, 'maybeRedirect']);
        add_action('init', [$this, 'scheduleRecheck']);
        add_action(self::RECHECK_HOOK, [$this, 'recheckConnectedUsers']);
        add_action('deactivate_' . plugin_basename($this->application->getPluginFile()), [$this, 'unscheduleRecheck']);
    }

    public static function challengeMessage(string $token): string
    {
        $message = (string) apply_filters(
            'cardanopress_data_message',
            sprintf(
                /* translators: 1: site name, 2: site host, 3: login nonce */
                __('Login to %1$s (%2$s) -- One-time nonce: %3$s', 'cardanopress'),
                get_bloginfo('name'),
                (string) wp_parse_url(home_url(), PHP_URL_HOST),
                $token
            ),
            $token
        );

        // A callback that drops the one-time nonce would make signatures replayable.
        if (false === strpos($message, $token)) {
            $message .= ' -- One-time nonce: ' . $token;
        }

        return $message;
    }

    public function doWalletStatusChecks(string $username, WP_User $user): void
    {
        $userProfile = new Profile($user);

        $this->checkManagedRoles($userProfile);
        $this->refreshWallet($user, $userProfile);
    }

    protected function refreshWallet(WP_User $user, Profile $userProfile): void
    {
        if (! $this->application->isReady()) {
            return;
        }

        $queryNetwork = $userProfile->connectedNetwork();
        $stakeAddress = $userProfile->connectedStake();

        if (! $queryNetwork || ! $stakeAddress) {
            return;
        }

        update_user_meta($user->ID, self::CHECKED_META, time());

        if (! Blockfrost::isReady($queryNetwork)) {
            return;
        }

        $blockfrost = new Blockfrost($queryNetwork);

        do_action('cardanopress_wallet_status_checks', $user, $blockfrost);

        $this->checkWalletAssets($stakeAddress, $userProfile, $blockfrost);
        $this->checkDelegationStatus($stakeAddress, $queryNetwork, $userProfile, $blockfrost);
    }

    public function scheduleRecheck(): void
    {
        $event = wp_get_scheduled_event(self::RECHECK_HOOK);

        // Sites upgrading from the old daily schedule are moved to hourly
        if (is_object($event) && 'hourly' !== ($event->schedule ?? '')) {
            wp_clear_scheduled_hook(self::RECHECK_HOOK);

            $event = false;
        }

        if (! $event) {
            wp_schedule_event(time() + 5 * MINUTE_IN_SECONDS, 'hourly', self::RECHECK_HOOK);
        }
    }

    public function unscheduleRecheck(): void
    {
        wp_clear_scheduled_hook(self::RECHECK_HOOK);
    }

    /** Hourly: recheck a batch of connected users, the never or longest ago checked first. */
    public function recheckConnectedUsers(): void
    {
        if (! $this->application->isReady()) {
            return;
        }

        $limit = max(1, (int) apply_filters('cardanopress_recheck_batch', 20));
        $connected = ['key' => self::STAKE_META, 'value' => '', 'compare' => '!='];

        $users = get_users([
            'number' => $limit,
            'meta_query' => [
                'relation' => 'AND',
                $connected,
                ['key' => self::CHECKED_META, 'compare' => 'NOT EXISTS'],
            ],
        ]);

        if (count($users) < $limit) {
            $users = array_merge($users, get_users([
                'number' => $limit - count($users),
                'meta_key' => self::CHECKED_META, // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_key
                'orderby' => 'meta_value_num',
                'order' => 'ASC',
                'meta_query' => [$connected], // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_meta_query
            ]));
        }

        foreach ($users as $user) {
            try {
                $this->refreshWallet($user, new Profile($user));
            } catch (Throwable $error) {
                $this->application->logger('actions')->error($error->getMessage());
            }
        }
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

    /** @return array<int, array<string, string>> */
    protected function getAssetAccess(): array
    {
        $assetAccess = (array) $this->application->option('asset_access');

        return array_values(array_filter($assetAccess, function ($access) {
            return ! empty($access['id']) && ! empty($access['role']);
        }));
    }

    /** Roles are only handled on mainnet, unless a site opts in for test networks. */
    protected function canHandleRoles(string $network): bool
    {
        return 'mainnet' === $network || (bool) apply_filters('cardanopress_allow_testnet_roles', false);
    }

    /**
     * On a network where roles aren't handled nothing is granted and the gated roles
     * are removed, or a holder could keep a role by reconnecting a test wallet.
     *
     * @param string[] $backed
     * @param string[] $removable
     */
    protected function syncRolesFor(
        string $network,
        Profile $userProfile,
        array $backed,
        array $removable,
        bool $complete
    ): void {
        if ($this->canHandleRoles($network)) {
            $this->syncRoles($userProfile, $backed, $removable, $complete);

            return;
        }

        $this->syncRoles($userProfile, [], $removable, true);
    }

    /**
     * Add the backed roles. Remove the removable ones the holdings no longer back,
     * but only after a complete and successful fetch.
     *
     * @param string[] $backed
     * @param string[] $removable
     */
    protected function syncRoles(Profile $userProfile, array $backed, array $removable, bool $complete): void
    {
        foreach ($backed as $role) {
            if (! $userProfile->hasRole($role)) {
                $userProfile->addRole($role);
            }
        }

        if (! $complete || ! apply_filters('cardanopress_manage_gated_roles', true)) {
            return;
        }

        $protected = ['administrator', (string) get_option('default_role')];

        foreach (array_unique($removable) as $role) {
            if (
                '' === $role ||
                in_array($role, $backed, true) ||
                in_array($role, $protected, true) ||
                ! $userProfile->hasRole($role)
            ) {
                continue;
            }

            $userProfile->removeRole($role);
        }
    }

    /**
     * Asset details, cached per network and unit. Null when the request failed.
     *
     * @return array<string, mixed>|null
     */
    protected function assetDetails(Blockfrost $blockfrost, string $network, string $unit): ?array
    {
        $key = self::ASSET_CACHE_PREFIX . md5($network . '|' . $unit);
        $cached = get_transient($key);

        if (is_array($cached) && ! empty($cached)) {
            return $cached;
        }

        $data = $blockfrost->specificAsset($unit);

        if (200 !== $blockfrost->lastStatus()) {
            return null;
        }

        if (! empty($data)) {
            set_transient($key, $data, 12 * HOUR_IN_SECONDS);
        }

        return $data;
    }

    public function checkWalletAssets(string $stakeAddress, Profile $userProfile, Blockfrost $blockfrost): void
    {
        $assetAccess = $this->getAssetAccess();
        $assetAccessPolicyIds = array_column($assetAccess, 'id');
        $wantedPolicyIds = Collection::wantedPolicyIds($assetAccessPolicyIds);
        $network = $userProfile->connectedNetwork();
        $maxPages = max(1, (int) apply_filters('cardanopress_max_asset_pages', 20));
        $assets = [];
        $handles = [];
        $backed = [];
        $complete = true;
        $page = 1;

        do {
            $response = $blockfrost->associatedAssets($stakeAddress, $page);

            if (200 !== $blockfrost->lastStatus()) {
                $complete = false;
            }

            do_action('cardanopress_associated_assets', $stakeAddress, $response, $page);

            foreach ($response as $asset) {
                $matched = false;

                foreach ($wantedPolicyIds as $policyId) {
                    if (str_starts_with($asset['unit'], $policyId)) {
                        $matched = true;

                        break;
                    }
                }

                if (! $matched) {
                    continue;
                }

                $data = $this->assetDetails($blockfrost, $network, $asset['unit']);

                if (null === $data) {
                    $complete = false;

                    continue;
                }

                if (empty($data)) {
                    continue;
                }

                do_action('cardanopress_associated_asset', $stakeAddress, $data, $asset);

                $collection = new Collection($data);
                $assets[] = $collection->filteredAsset((int) $asset['quantity']);
                $handles[] = $collection->grabHandle();

                foreach ($assetAccess as $access) {
                    if ($access['id'] === $data['policy_id']) {
                        $backed[] = $access['role'];
                    }
                }
            }

            $page++;
        } while (100 === count($response) && $page <= $maxPages);

        // Stopped at the page cap with more to read: the holdings are not fully known.
        if (100 === count($response)) {
            $complete = false;
        }

        $assets = array_filter($assets);
        $handles = array_filter($handles);

        $uaRole = (string) $this->application->option('ua_additional_role');
        $removable = array_diff(array_column($assetAccess, 'role'), [$uaRole]);

        $this->syncRolesFor($network, $userProfile, $backed, $removable, $complete);

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

        $customRole = (string) $this->application->option('ua_additional_role');

        if ('' === $customRole) {
            return;
        }

        $poolIds = (array) $this->application->option('delegation_pool_id');
        $minimum = $this->application->option('ua_required_amount');
        $complete = true;
        $wanted = [];
        $page = 1;

        do {
            $response = $blockfrost->getAccountHistory($stakeAddress, $page, 'desc');

            if (200 !== $blockfrost->lastStatus()) {
                $complete = false;
            }

            do_action('cardanopress_account_history', $stakeAddress, $response, $page);

            $wanted = array_filter($response, function ($history) use ($poolIds, $queryNetwork, $minimum) {
                return (
                    $history['pool_id'] === ($poolIds[$queryNetwork] ?? null) &&
                    NumberHelper::lovelaceToAda((int) $history['amount']) >= $minimum
                );
            });

            $page++;
        } while (empty($wanted) && 100 === count($response));

        $backed = false;

        if (! empty($wanted)) {
            $latest = $blockfrost->getEpochsLatest();

            if (200 !== $blockfrost->lastStatus()) {
                $complete = false;
            } elseif (
                ! empty($latest) &&
                count($wanted) >= $this->application->option('ua_required_epoch') &&
                $latest['epoch'] <= $wanted[array_key_first($wanted)]['active_epoch']
            ) {
                $backed = true;
            }
        }

        // A role shared with asset access can't be judged from delegation alone.
        $shared = in_array($customRole, array_column($this->getAssetAccess(), 'role'), true);

        $this->syncRolesFor(
            $queryNetwork,
            $userProfile,
            $backed ? [$customRole] : [],
            $shared ? [] : [$customRole],
            $complete
        );
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
        $dashboardLink = (string) get_permalink($dashboardPage);
        $collectionLink = (string) get_permalink($collectionPage);

        if ($currentLink === $collectionLink && $currentLink !== $dashboardLink) {
            wp_safe_redirect($dashboardLink);
            exit;
        }
    }
}
