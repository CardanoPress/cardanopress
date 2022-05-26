<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Interfaces;

interface ManifestInterface
{
    public function __construct(string $path, string $version);

    public function enqueueAssets(): void;

    public function enqueueAsset(string $type, string $handle): void;

    public function getPath(): string;

    public function getVersion(): string;
}
