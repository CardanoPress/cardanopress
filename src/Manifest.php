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
    protected Application $application;
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
        wp_enqueue_script(self::HANDLE_PREFIX . 'script');
        wp_enqueue_script(self::HANDLE_PREFIX . 'notification');
        wp_register_script(
            self::HANDLE_PREFIX . 'recaptcha',
            'https://www.google.com/recaptcha/api.js?onload=cardanoPressRecaptchaCallback'
        );

        if ($this->legacy_loaded) {
            wp_script_add_data(self::HANDLE_PREFIX . 'script', 'defer', true);
            wp_script_add_data(self::HANDLE_PREFIX . 'recaptcha', 'defer', true);
        } else {
            $this->data->script(self::HANDLE_PREFIX . 'script', array('defer' => true));
            $this->data->script(self::HANDLE_PREFIX . 'recaptcha', array('defer' => true));
        }

        $data = [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            '_nonce' => wp_create_nonce(self::HANDLE_PREFIX . 'actions'),
            'logged' => is_user_logged_in(),
        ];

        wp_localize_script(self::HANDLE_PREFIX . 'script', 'cardanoPress', $data);
    }

    public static function injectDataProvider(): void
    {
        $handle = '';

        if (is_user_logged_in()) {
            $handle = Application::getInstance()->userProfile()->getFavoriteHandle();
        }

        echo '<div x-data="cardanoPress" @keydown.escape="showModal = false" data-handle="' . esc_attr($handle) . '">';
    }

    public function completeInjections(): void
    {
        if (! doing_action('wp_body_open')) {
            $log = Application::getInstance()->logger('manifest');
            $message = [
                __('CardanoPress component incomplete injections.', 'cardanopress'),
            ];

            if (wp_is_block_theme()) {
                $message[] = __('Block theme rendered fallback templates from `theme-compat`.', 'cardanopress');
            } else {
                $message[] = __('Activated theme does not support the `wp_body_open` hook.', 'cardanopress');
            }

            $log->error(implode(' ', $message));
            wp_add_inline_script(
                self::HANDLE_PREFIX . 'script',
                'console.error("' . implode(' ', $message) . '")'
            );

            return;
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
