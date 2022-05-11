<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Foundation;

abstract class AbstractManifest
{
    protected array $storage;
    protected string $version;

    public function __construct(string $load_path, string $version = '0.1.0')
    {
        $this->storage = $this->getAssetsManifest($load_path);
        $this->version = $version;

        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets']);
    }

    abstract protected function getAssetsBase(): string;

    abstract protected function getAssetPrefix(): string;

    private function getAssetsManifest(string $path)
    {
        $path = trailingslashit($path) . 'manifest.json';

        if (! file_exists($path)) {
            return [];
        }

        $contents = file_get_contents($path);

        if (! $contents) {
            return [];
        }

        $decoded = json_decode($contents, true);

        if (! $decoded) {
            return [];
        }

        return $decoded;
    }

    public function enqueueAssets(): void
    {
        $base = trailingslashit($this->getAssetsBase());

        foreach ($this->storage as $file => $asset) {
            $parts = explode('.', $file);
            $type = 'js' === $parts[1] ? 'script' : 'style';
            $arg = 'js' === $parts[1] ? true : 'all';
            $func = 'wp_register_' . $type;
            $deps = [];

            if ('script' === $type && 'script' !== $parts[0]) {
                $deps[] = $this->getAssetPrefix() . 'script';
            }

            $func($this->getAssetPrefix() . $parts[0], $base . $asset, $deps, $this->version, $arg);
        }
    }
}
