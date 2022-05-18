<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use PBWebDev\CardanoPress\Foundation\AbstractProfile;

class Profile extends AbstractProfile
{
    private string $prefix = 'cardanopress_';

    public function isConnected(): bool
    {
        return $this->connectedNetwork() && $this->connectedWallet() && $this->connectedStake();
    }


    public function connectedNetwork(): string
    {
        $saved = get_user_meta($this->user->ID, $this->prefix . 'connected_network', true);

        return $saved ?? '';
    }

    public function saveNetwork(string $query_network): bool
    {
        $isAdded = false;

        if ($query_network !== $this->connectedNetwork()) {
            $isAdded = update_user_meta($this->user->ID, $this->prefix . 'connected_network', $query_network);
        }

        return (bool)$isAdded;
    }

    public function connectedWallet(): string
    {
        $saved = get_user_meta($this->user->ID, $this->prefix . 'connected_wallet', true);

        return $saved ?? '';
    }

    public function saveWallet(string $walletAddress): bool
    {
        $isAdded = false;

        if ($walletAddress !== $this->connectedWallet()) {
            $isAdded = update_user_meta($this->user->ID, $this->prefix . 'connected_wallet', $walletAddress);
        }

        return (bool)$isAdded;
    }

    public function connectedStake(): string
    {
        $saved = get_user_meta($this->user->ID, $this->prefix . 'connected_stake', true);

        return $saved ?? '';
    }

    public function saveStake(string $stakeAddress): bool
    {
        $isAdded = false;

        if ($stakeAddress !== $this->connectedStake()) {
            $isAdded = update_user_meta($this->user->ID, $this->prefix . 'connected_stake', $stakeAddress);
        }

        return (bool)$isAdded;
    }

    public function storedAssets(): array
    {
        $saved = get_user_meta($this->user->ID, $this->prefix . 'stored_assets', true);

        return array_filter((array)$saved);
    }

    public function saveAssets(array $data): bool
    {
        return update_user_meta($this->user->ID, $this->prefix . 'stored_assets', $data);
    }

    public function storedHandles(): array
    {
        $saved = get_user_meta($this->user->ID, $this->prefix . 'stored_handles', true);

        return array_filter((array)$saved);
    }

    public function saveHandles(array $data): bool
    {
        return update_user_meta($this->user->ID, $this->prefix . 'stored_handles', $data);
    }

    public function saveFavoriteHandle(string $handle): bool
    {
        return update_user_meta($this->user->ID, $this->prefix . 'favorite_handle', $handle);
    }

    public function allTransactions(): array
    {
        $saved = get_user_meta($this->user->ID, $this->prefix . 'transaction', false);

        return array_filter((array)$saved);
    }

    public function saveTransaction(string $network, string $action, string $hash): bool
    {
        $data = compact('network', 'action', 'hash');
        $isSaved = add_user_meta($this->user->ID, $this->prefix . 'transaction', $data);

        return (bool)$isSaved;
    }
}
