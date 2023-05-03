<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Interfaces\ProfileInterface;
use CardanoPress\SharedBase;
use WP_User;

abstract class AbstractProfile extends SharedBase implements ProfileInterface
{
    protected WP_User $user;
    private string $prefix = 'cardanopress_';

    public function __construct(WP_User $user)
    {
        $this->user = $user;

        $this->initialize();
    }

    public function setUserAuth(string $username): void
    {
        wp_set_current_user($this->getData('ID'));
        wp_set_auth_cookie($this->getData('ID'));
        do_action('wp_login', $username, $this->user);
    }

    public function unsetUserAuth(): void
    {
        wp_destroy_current_session();
        wp_clear_auth_cookie();
        wp_set_current_user(0);
        do_action('wp_logout', $this->getData('ID'));
    }

    public function getData(string $key = null)
    {
        if (null === $key) {
            return $this->user;
        }

        return $this->user->$key;
    }

    public function addRole(string $role): void
    {
        $this->user->add_role($role);
    }

    public function removeRole(string $role): void
    {
        $this->user->remove_role($role);
    }

    public function hasRole(string $role): bool
    {
        return in_array($role, $this->getData('roles'), true);
    }

    protected function getMeta(string $key, bool $single = false)
    {
        return get_user_meta($this->getData('ID'), $key, $single);
    }

    protected function addMeta(string $key, $value, bool $unique = false)
    {
        return add_user_meta($this->getData('ID'), $key, $value, $unique);
    }

    protected function updateMeta(string $key, $value, $previous = '')
    {
        return update_user_meta($this->getData('ID'), $key, $value, $previous);
    }

    public function isConnected(): bool
    {
        return $this->connectedNetwork() && $this->connectedWallet() && $this->connectedStake();
    }

    public function connectedNetwork(): string
    {
        $saved = $this->getMeta($this->prefix . 'connected_network', true);

        return $saved ?? '';
    }

    public function saveNetwork(string $query_network): bool
    {
        $isUpdated = false;

        if ($query_network !== $this->connectedNetwork()) {
            $isUpdated = $this->updateMeta($this->prefix . 'connected_network', $query_network);
        }

        return (bool)$isUpdated;
    }

    public function connectedWallet(): string
    {
        $saved = $this->getMeta($this->prefix . 'connected_wallet', true);

        return $saved ?? '';
    }

    public function saveWallet(string $walletAddress): bool
    {
        $isUpdated = false;

        if ($walletAddress !== $this->connectedWallet()) {
            $isUpdated = $this->updateMeta($this->prefix . 'connected_wallet', $walletAddress);
        }

        return (bool)$isUpdated;
    }

    public function connectedStake(): string
    {
        $saved = $this->getMeta($this->prefix . 'connected_stake', true);

        return $saved ?? '';
    }

    public function saveStake(string $stakeAddress): bool
    {
        $isUpdated = false;

        if ($stakeAddress !== $this->connectedStake()) {
            $isUpdated = $this->updateMeta($this->prefix . 'connected_stake', $stakeAddress);
        }

        return (bool)$isUpdated;
    }

    public function storedAssets(): array
    {
        $saved = $this->getMeta($this->prefix . 'stored_assets', true);

        return array_filter((array)$saved);
    }

    public function saveAssets(array $data): bool
    {
        return $this->updateMeta($this->prefix . 'stored_assets', $data);
    }

    public function allTransactions(): array
    {
        $saved = $this->getMeta($this->prefix . 'transaction');

        return array_filter((array)$saved);
    }

    public function saveTransaction(string $network, string $action, string $hash): bool
    {
        $data = compact('network', 'action', 'hash');
        $isSaved = $this->addMeta($this->prefix . 'transaction', $data);

        return (bool)$isSaved;
    }

    public function dismissNotice(string $type, bool $reset = false): bool
    {
        return $this->updateMeta($this->prefix . 'dismissed_' . $type, ! $reset);
    }

    public function isDismissedNotice(string $type): bool
    {
        return (bool)$this->getMeta($this->prefix . 'dismissed_' . $type, true);
    }
}
