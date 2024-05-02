<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Dependencies\ThemePlate\Enqueue\CustomData;
use CardanoPress\Foundation\AbstractManifest;

class Manifest extends AbstractManifest
{
    private bool $legacy_loaded;

    public const HANDLE_PREFIX = 'cardanopress-';

    public function initialize(): void
    {
        $this->legacy_loaded = ! (isset($this->data) && $this->data instanceof CustomData);
    }

    public function setupHooks(): void
    {
        parent::setupHooks();
        add_action('wp_enqueue_scripts', [$this, 'autoEnqueues']);
        add_action('wp_body_open', [$this, 'completeInjections']);
        add_action('wp_footer', [$this, 'completeInjections']);
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
        ];

        wp_localize_script(self::HANDLE_PREFIX . 'script', 'cardanoPress', $data);
        wp_register_script(self::HANDLE_PREFIX . 'compatibility', '');

        $compatibility = Compatibility::getInstance();
        $issues = $compatibility->getIssues();

        if (empty($issues) || (1 === count($issues) && 'block' === $issues[0])) {
            return;
        }

        if ($compatibility->hasIssue('server')) {
            wp_deregister_script(self::HANDLE_PREFIX . 'script');
        }

        wp_enqueue_script(self::HANDLE_PREFIX . 'compatibility');
        wp_add_inline_script(
            self::HANDLE_PREFIX . 'compatibility',
            sprintf(
                'console.error("%s v%s", %s)',
                Application::getInstance()->getData('Name'),
                Application::getInstance()->getData('Version'),
                json_encode(array_map([$compatibility, 'message'], $compatibility->getIssues()))
            )
        );
    }

    public static function injectDataProvider(): void
    {
        $handle = '';

        if (is_user_logged_in()) {
            $handle = Application::getInstance()->userProfile()->getFavoriteHandle();
        }

        echo '<div x-data="cardanoPress" x-on:keydown.escape="showModal = false" data-handle="' . esc_attr($handle) . '">';
    }

    public function completeInjections(): void
    {
        $compatibility = Compatibility::getInstance();

        if (! doing_action('wp_body_open')) {
            $compatibility->addIssue('theme');
            $compatibility->addIssue('classic');

            if ('checking' === $compatibility->getStatus()) {
                $compatibility->saveIssues();
            }

            return;
        }

        if (! $compatibility->hasIssue('server')) {
            wp_enqueue_script(self::HANDLE_PREFIX . 'script');
            wp_enqueue_script(self::HANDLE_PREFIX . 'notification');

            if (apply_filters('cardanopress_alpinejs_cdn', false)) {
                wp_enqueue_script(
                    self::HANDLE_PREFIX . 'alpinejs',
                    'https://unpkg.com/alpinejs',
                    [self::HANDLE_PREFIX . 'script'],
                    'latest',
                    true
                );
            } else {
                wp_enqueue_script(
                    self::HANDLE_PREFIX . 'alpinejs',
                    plugin_dir_url($this->path) . 'vendor/alpinejs.min.js',
                    [self::HANDLE_PREFIX . 'script'],
                    '3.13.8',
                    true
                );
            }
        }

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
