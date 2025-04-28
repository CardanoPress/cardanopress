<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Dependencies\ThemePlate\Vite;
use CardanoPress\Foundation\AbstractManifest;

class Manifest extends AbstractManifest
{
    public const HANDLE_PREFIX = 'cardanopress-';

    public function initialize(): void
    {
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

        wp_enqueue_style(self::HANDLE_PREFIX . 'style');
        wp_register_script(
            self::HANDLE_PREFIX . 'recaptcha',
            'https://www.google.com/recaptcha/api.js?onload=cardanoPressRecaptchaCallback'
        );

        $this->data->script(self::HANDLE_PREFIX . 'alpinejs', ['defer' => true]);
        $this->data->script(self::HANDLE_PREFIX . 'recaptcha', ['defer' => true]);

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
        echo '<div ' . Application::getInstance()->component(false)->cardanoPress() . '>';
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
