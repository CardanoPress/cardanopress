<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Foundation\AbstractProfile;

class Profile extends AbstractProfile
{
    private string $prefix = 'cardanopress_';

    protected function initialize(): void
    {
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
        $isAdded = false;

        if ($query_network !== $this->connectedNetwork()) {
            $isAdded = $this->updateMeta($this->prefix . 'connected_network', $query_network);
        }

        return (bool)$isAdded;
    }

    public function connectedWallet(): string
    {
        $saved = $this->getMeta($this->prefix . 'connected_wallet', true);

        return $saved ?? '';
    }

    public function saveWallet(string $walletAddress): bool
    {
        $isAdded = false;

        if ($walletAddress !== $this->connectedWallet()) {
            $isAdded = $this->updateMeta($this->prefix . 'connected_wallet', $walletAddress);
        }

        return (bool)$isAdded;
    }

    public function connectedStake(): string
    {
        $saved = $this->getMeta($this->prefix . 'connected_stake', true);

        return $saved ?? '';
    }

    public function saveStake(string $stakeAddress): bool
    {
        $isAdded = false;

        if ($stakeAddress !== $this->connectedStake()) {
            $isAdded = $this->updateMeta($this->prefix . 'connected_stake', $stakeAddress);
        }

        return (bool)$isAdded;
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

    public function storedHandles(): array
    {
        $saved = $this->getMeta($this->prefix . 'stored_handles', true);

        return array_filter((array)$saved);
    }

    public function saveHandles(array $data): bool
    {
        return $this->updateMeta($this->prefix . 'stored_handles', $data);
    }

    public function getFavoriteHandle(): string
    {
        $saved = $this->getMeta($this->prefix . 'favorite_handle', true);

        return $saved ?? '';
    }

    public function getTrimmedAddress(): string
    {
        $trimmedAddress = str_replace(['addr1', 'addr_test1'], ['', ''], $this->connectedWallet());

        return substr($trimmedAddress, 0, 2) . '...' . substr($trimmedAddress, -4);
    }

    public function saveFavoriteHandle(string $handle): bool
    {
        return $this->updateMeta($this->prefix . 'favorite_handle', $handle);
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
}
