<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

use CardanoPress\Foundation\AbstractManifest;

trait Enqueueable
{
    protected AbstractManifest $manifest;

    protected function setManifest(AbstractManifest $manifest): void
    {
        $this->manifest = $manifest;
    }

    protected function getManifest(): AbstractManifest
    {
        return $this->manifest;
    }

    public function enqueue(string $type, string $handle): void
    {
        if (! in_array(strtolower($type), ['script', 'style'], true)) {
            return;
        }

        $methodName = 'enqueue' . ucfirst($type);

        $this->manifest->$methodName($handle);
    }
}
