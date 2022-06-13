<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Interfaces\HookInterface;
use CardanoPress\Interfaces\ManifestInterface;
use CardanoPress\SharedBase;
use ThemePlate\Enqueue;

abstract class AbstractManifest extends SharedBase implements ManifestInterface, HookInterface
{
    protected string $path;
    protected string $version;

    public const HANDLE_PREFIX = '';

    public function __construct(string $path, string $version)
    {
        $this->path = trailingslashit($path);
        $this->version = $version;

        $this->initialize();
    }

    protected function readAssetsManifest(string $manifest)
    {
        if (! file_exists($manifest)) {
            return [];
        }

        $contents = file_get_contents($manifest);

        if (! $contents) {
            return [];
        }

        $decoded = json_decode($contents, true);

        if (! $decoded) {
            return [];
        }

        return $decoded;
    }

    public function setupHooks(): void
    {
        Enqueue::init();
        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets']);
    }

    public function enqueueAssets(): void
    {
        $manifest = $this->path . 'manifest.json';
        $base = plugin_dir_url($manifest);

        foreach ($this->readAssetsManifest($manifest) as $file => $asset) {
            $parts = explode('.', $file);
            $type = 'js' === $parts[1] ? 'script' : 'style';
            $arg = 'js' === $parts[1] ? true : 'all';
            $func = 'wp_register_' . $type;
            $deps = [];

            if ('script' === $type && 'script' !== $parts[0]) {
                $deps[] = static::HANDLE_PREFIX . 'script';
            }

            $func(static::HANDLE_PREFIX . $parts[0], $base . $asset, $deps, $this->version, $arg);
        }
    }

    public function enqueueScript(string $handle): void
    {
        Enqueue::script($handle);
    }

    public function enqueueStyle(string $handle): void
    {
        Enqueue::style($handle);
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function getVersion(): string
    {
        return $this->version;
    }
}
