<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

use CardanoPress\Interfaces\ManifestInterface;

trait Enqueueable
{
    protected ManifestInterface $manifest;

    public function enqueue(string $type, string $handle): void
    {
        $this->manifest->enqueueAsset($type, $handle);
    }
}
