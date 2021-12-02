<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\NamiPress;

class Manifest
{
    private array $storage;

    public function __construct(string $load_path)
    {
        $load_path .= '/dist/manifest.json';

        $this->storage = $this->getAssetsManifest($load_path);

        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets']);
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
        $base = plugin_dir_url(NAMIPRESS_FILE) . 'assets/dist/';

        foreach ($this->storage as $file => $asset) {
            $parts = explode('.', $file);
            $type = 'js' === $parts[1] ? 'script' : 'style';
            $arg = 'js' === $parts[1] ? true : 'all';
            $func = 'wp_register_' . $type;

            $func('namipress-' . $parts[0], $base . $asset, [], '0.1.0', $arg);
        }

        wp_enqueue_style('namipress-style');
        wp_enqueue_script('namipress-script');
        wp_script_add_data('namipress-script', 'defer', true);
        wp_enqueue_script('namipress-notification');
    }

    public function injectDataProvider(): void
    {
        echo '<div x-data="namiPress" @keydown.escape="showModal = false">';
    }

    public function injectModalConnect(): void
    {
        namiPress()->template('modal-connect');
    }

    public function injectNoticesHandler(): void
    {
        namiPress()->template('notices-handler');
    }

    public function closeDataProviderTag(): void
    {
        echo '</div>';
    }
}
