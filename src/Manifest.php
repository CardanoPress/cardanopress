<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

class Manifest
{
    private array $storage;
    protected string $prefix = 'cardanopress-';

    public function __construct(string $load_path)
    {
        $load_path .= '/dist/manifest.json';

        $this->storage = $this->getAssetsManifest($load_path);

        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets']);

        $this->fireInjectors();
    }

    protected function fireInjectors(): void
    {
        add_action('wp_body_open', [$this, 'injectDataProvider']);
        add_action('wp_footer', [$this, 'injectModalConnect']);
        add_action('wp_footer', [$this, 'injectNoticesHandler']);
        add_action('wp_footer', [$this, 'closeDataProviderTag']);
    }

    private function getAssetsManifest(string $path)
    {
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
        $base = $this->getAssetsBase();

        foreach ($this->storage as $file => $asset) {
            $parts = explode('.', $file);
            $type = 'js' === $parts[1] ? 'script' : 'style';
            $arg = 'js' === $parts[1] ? true : 'all';
            $func = 'wp_register_' . $type;

            $func($this->prefix . $parts[0], $base . $asset, [], '0.1.0', $arg);
        }

        $this->autoEnqueues();
    }

    protected function getAssetsBase(): string
    {
        return plugin_dir_url(CARDANOPRESS_FILE) . 'assets/dist/';
    }

    protected function autoEnqueues(): void
    {
        wp_enqueue_style($this->prefix . 'style');
        wp_enqueue_script($this->prefix . 'script');
        wp_script_add_data($this->prefix . 'script', 'defer', true);
        wp_enqueue_script($this->prefix . 'notification');
    }

    public function injectDataProvider(): void
    {
        echo '<div x-data="cardanoPress" @keydown.escape="showModal = false">';
    }

    public function injectModalConnect(): void
    {
        cardanoPress()->template('modal-connect');
    }

    public function injectNoticesHandler(): void
    {
        cardanoPress()->template('notices-handler');
    }

    public function closeDataProviderTag(): void
    {
        echo '</div>';
    }
}
