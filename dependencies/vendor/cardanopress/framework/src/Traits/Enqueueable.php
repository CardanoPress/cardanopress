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

    protected function setManifest(ManifestInterface $manifest): void
    {
        $this->manifest = $manifest;
    }

    protected function getManifest(): ManifestInterface
    {
        return $this->manifest;
    }

    public function enqueue(string $type, string $handle): void
    {
        if (! in_array(strtolower($type), array('script', 'style'), true)) {
            return;
        }

        $methodName = 'enqueue' . ucfirst($type);

        $this->manifest->$methodName($handle);
    }
}
