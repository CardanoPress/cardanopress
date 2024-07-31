<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Dependencies\ThemePlate\Enqueue\CustomData;
use CardanoPress\Dependencies\ThemePlate\Vite;
use CardanoPress\Foundation\AbstractManifest;

class Manifest extends AbstractManifest
{
    private bool $legacy_loaded;
    private array $wasm_module;
    private Vite $vite;

    public const HANDLE_PREFIX = 'cardanopress-';

    public function initialize(): void
    {
        $this->legacy_loaded = ! (isset($this->data) && $this->data instanceof CustomData);
        $this->wasm_module = $this->getWasmModuleLinks();
        $this->vite = new Vite(plugin_dir_path($this->path), plugin_dir_url($this->path));
    }

    private function getWasmModuleLinks(): array
    {
        $manifest = $this->path . '.vite/manifest.json';
        $assets = array_column($this->readAssetsManifest($manifest), 'file');
        $wasm = array_filter($assets, function ($item) {
            return str_ends_with($item, '.wasm') && str_starts_with($item, 'cardano_serialization_lib_bg');
        });

        if (empty($wasm)) {
            return [];
        }

        return [
            'local' => plugin_dir_url($this->path . '/wasm') . array_pop($wasm),
            'remote' => 'https://unpkg.com/@emurgo/cardano-serialization-lib-browser@9.1.4/cardano_serialization_lib_bg.wasm'
        ];
    }

    public function setupHooks(): void
    {
        parent::setupHooks();
        add_action('wp_enqueue_scripts', [$this, 'autoEnqueues']);
        add_action('wp_body_open', [$this, 'completeInjections']);
        add_action('wp_footer', [$this, 'completeInjections']);

        if (empty($this->wasm_module)) {
            return;
        }

        add_action('plugins_loaded', function () {
            if ($_SERVER['REQUEST_URI'] === wp_make_link_relative($this->wasm_module['local'])) {
                wp_redirect($this->wasm_module['remote']);
                die;
            }
        });
    }

    public function enqueueAssets(): void
    {
        $manifest = plugin_dir_path($this->path) . Vite::CONFIG;
        $manifest = $this->readAssetsManifest($manifest);

        $this->vite->prefix(self::HANDLE_PREFIX);

        foreach ($manifest['entryNames'] ?? [] as $entry => $file) {
            $parts = explode('.', $file);

            if (1 === count($parts) || ! in_array($parts[1], ['js', 'css'])) {
                continue;
            }

            $type = 'js' === $parts[1] ? 'script' : 'style';
            $func = 'wp_dequeue_' . $type;
            $handle = $this->vite->$type(
                $entry,
                ('script' === $type && 'script' !== $entry) ? [static::HANDLE_PREFIX . 'script'] : [],
                'js' === $parts[1] ? ['in_footer' => true] : ['media' => 'all']
            );

            $func($handle);
        }

        if (apply_filters('cardanopress_alpinejs_cdn', false)) {
            wp_register_script(
                self::HANDLE_PREFIX . 'alpinejs',
                'https://unpkg.com/alpinejs',
                [self::HANDLE_PREFIX . 'script', self::HANDLE_PREFIX . 'notification'],
                'latest',
                true
            );
        } else {
            wp_register_script(
                self::HANDLE_PREFIX . 'alpinejs',
                plugin_dir_url($this->path) . 'vendor/alpinejs.min.js',
                [self::HANDLE_PREFIX . 'script', self::HANDLE_PREFIX . 'notification'],
                '3.14.1',
                true
            );
        }

        $this->dynamic->action();
        $this->vite->action();
    }

    public function autoEnqueues(): void
    {
        wp_enqueue_style(self::HANDLE_PREFIX . 'style');
        wp_register_script(
            self::HANDLE_PREFIX . 'recaptcha',
            'https://www.google.com/recaptcha/api.js?onload=cardanoPressRecaptchaCallback'
        );

        if ($this->legacy_loaded) {
            wp_script_add_data(self::HANDLE_PREFIX . 'alpinejs', 'defer', true);
            wp_script_add_data(self::HANDLE_PREFIX . 'recaptcha', 'defer', true);
        } else {
            $this->data->script(self::HANDLE_PREFIX . 'alpinejs', ['defer' => true]);
            $this->data->script(self::HANDLE_PREFIX . 'recaptcha', ['defer' => true]);
        }

        $data = [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            '_nonce' => wp_create_nonce(self::HANDLE_PREFIX . 'actions'),
            'logged' => is_user_logged_in(),
            'version' => Application::getInstance()->getData('Version'),
        ];

        wp_localize_script(self::HANDLE_PREFIX . 'script', 'cardanoPress', $data);
        wp_register_script(self::HANDLE_PREFIX . 'compatibility', '');

        $compatibility = Compatibility::getInstance();
        $issues = $compatibility->getIssues();

        if (empty($issues)) {
            return;
        }

        wp_enqueue_script(self::HANDLE_PREFIX . 'compatibility');
        wp_add_inline_script(
            self::HANDLE_PREFIX . 'compatibility',
            sprintf(
                'console.error("%s v%s", %s)',
                Application::getInstance()->getData('Name'),
                Application::getInstance()->getData('Version'),
                json_encode(array_map([$compatibility, 'message'], $issues))
            )
        );
    }

    public static function injectDataProvider(): void
    {
        $handle = '';

        if (is_user_logged_in()) {
            $handle = Application::getInstance()->userProfile()->getFavoriteHandle();
        }

        $wallets = json_encode(Application::getInstance()->getWallets());
        $attributes = [
            'x-data="cardanoPress"',
            'x-on:keydown.escape="showModal = false"',
            'data-handle="' . esc_attr($handle) . '"',
            'data-wallets="' . esc_attr($wallets) . '"',
        ];

        echo '<div ' . implode(' ', $attributes) . '>';
    }

    public function completeInjections(): void
    {
        $compatibility = Compatibility::getInstance();

        if ('checking' === $compatibility->getStatus()) {
            if (! doing_action('wp_body_open')) {
                $compatibility->addIssue('theme');
                $compatibility->addIssue('classic');
            }

            if (! $compatibility->html5()) {
                $compatibility->addIssue('html5');
            }

            $compatibility->saveIssues();
        }

        if (! empty($compatibility->getIssues())) {
            remove_action('wp_footer', [$this, 'completeInjections']);

            return;
        }

        wp_enqueue_script(self::HANDLE_PREFIX . 'script');
        wp_enqueue_script(self::HANDLE_PREFIX . 'notification');
        wp_enqueue_script(self::HANDLE_PREFIX . 'alpinejs');

        self::injectDataProvider();

        remove_action('wp_footer', [$this, 'completeInjections']);
        add_action('wp_footer', [$this, 'closeDataProviderTag']);
    }

    public static function closeDataProviderTag(): void
    {
        Application::getInstance()->template('modal-connect');
        Application::getInstance()->template('notices-handler');

        echo '</div><!-- x-data="cardanoPress" -->';
    }
}
