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
}
