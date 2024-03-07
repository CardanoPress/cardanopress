<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Dependencies\ThemePlate\Enqueue\CustomData;
use CardanoPress\Dependencies\ThemePlate\Enqueue\Dynamic;
use CardanoPress\Interfaces\HookInterface;
use CardanoPress\Interfaces\ManifestInterface;
use CardanoPress\SharedBase;

abstract class AbstractManifest extends SharedBase implements ManifestInterface, HookInterface
{
    protected string $path;
    protected string $version;
    protected CustomData $data;
    protected Dynamic $dynamic;

    public const HANDLE_PREFIX = '';

    public function __construct(string $path, string $version)
    {
        $this->path = trailingslashit($path);
        $this->version = $version;
        $this->data = new CustomData();
        $this->dynamic = new Dynamic();

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
        add_action('wp_enqueue_scripts', [$this->data, 'action'], PHP_INT_MAX);
        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets']);
    }

    public function enqueueAssets(): void
    {
        $manifest = $this->path . 'manifest.json';
        $base = plugin_dir_url($manifest);

        foreach ($this->readAssetsManifest($manifest) as $file => $asset) {
            $parts = explode('.', $file);

            if (1 === count($parts) || ! in_array($parts[1], ['js', 'css'])) {
                continue;
            }

            $type = 'js' === $parts[1] ? 'script' : 'style';
            $arg = 'js' === $parts[1] ? true : 'all';
            $func = 'wp_register_' . $type;
            $deps = [];

            if ('script' === $type && 'script' !== $parts[0]) {
                $deps[] = static::HANDLE_PREFIX . 'script';
            }

            $func(static::HANDLE_PREFIX . $parts[0], $base . $asset, $deps, $this->version, $arg);
        }

        $this->dynamic->action();
    }

    public function enqueueScript(string $handle): void
    {
        $this->dynamic->script($handle);
    }

    public function enqueueStyle(string $handle): void
    {
        $this->dynamic->style($handle);
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
