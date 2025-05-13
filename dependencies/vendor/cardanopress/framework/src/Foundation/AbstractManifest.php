<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Asset;
use CardanoPress\Dependencies\ThemePlate\Enqueue\CustomData;
use CardanoPress\Dependencies\ThemePlate\Enqueue\Dynamic;
use CardanoPress\Dependencies\ThemePlate\Vite;
use CardanoPress\Interfaces\HookInterface;
use CardanoPress\Interfaces\ManifestInterface;
use CardanoPress\SharedBase;

abstract class AbstractManifest extends SharedBase implements ManifestInterface, HookInterface
{
    protected string $path;
    protected string $version;
    protected CustomData $data;
    protected Dynamic $dynamic;
    protected ?Vite $vite = null;

    public const HANDLE_PREFIX = '';

    public function __construct(string $path, string $version)
    {
        $this->path = trailingslashit($path);
        $this->version = $version;
        $this->data = new CustomData();
        $this->dynamic = new Dynamic();

        if (file_exists(plugin_dir_path($this->path) . Vite::CONFIG)) {
            $this->vite = new Vite(plugin_dir_path($this->path), plugin_dir_url($this->path));
        }

        $this->initialize();
    }

    /** @return array<string, mixed> */
    protected function readAssetsManifest(string $manifest): array
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
        add_action('wp_footer', [$this->dynamic, 'action'], -PHP_INT_MAX);
        add_action('wp_enqueue_scripts', [$this->data, 'action'], PHP_INT_MAX);
        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets']);
    }

    public function enqueueAssets(): void
    {
        if (null === $this->vite) {
            $this->webpackAssets();
        } else {
            $this->viteAssets();
        }
    }

    protected function webpackAssets(): void
    {
        $manifest = $this->path . 'manifest.json';
        $base = plugin_dir_url($manifest);

        foreach ($this->readAssetsManifest($manifest) as $file => $entry) {
            $asset = new Asset($file);

            if (! $asset->isEntry()) {
                continue;
            }

            $type = $asset->type();
            $arg = 'script' === $type ? true : 'all';
            /** @var non-falsy-string $func */
            $func = 'wp_register_' . $type;
            $deps = [];

            if ('script' === $type && 'script' !== $asset->name()) {
                $deps[] = static::HANDLE_PREFIX . 'script';
            }

            /** @var callable-string $func */
            $func(static::HANDLE_PREFIX . $asset->name(), $base . $entry, $deps, $this->version, $arg);
        }
    }

    protected function viteAssets(): void
    {
        if (null === $this->vite) {
            return;
        }

        $manifest = plugin_dir_path($this->path) . Vite::CONFIG;
        $manifest = $this->readAssetsManifest($manifest);

        $this->vite->prefix(static::HANDLE_PREFIX);

        foreach ($manifest['entryNames'] ?? [] as $entry => $file) {
            $asset = new Asset($file);

            if (! $asset->isEntry()) {
                continue;
            }

            $type = $asset->type();
            /** @var non-falsy-string $func */
            $func = 'wp_dequeue_' . $type;
            $handle = $this->vite->$type(
                $entry,
                ('script' === $type && 'script' !== $entry) ? [static::HANDLE_PREFIX . 'script'] : [],
                'script' === $type ? ['in_footer' => true] : ['media' => 'all']
            );

            /** @var callable-string $func */
            $func($handle);
        }

        $this->vite->action();
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
