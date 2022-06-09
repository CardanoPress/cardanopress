<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Foundation\AbstractManifest;

class Manifest extends AbstractManifest
{
    protected Application $application;

    public const HANDLE_PREFIX = 'cardanopress-';

    public function initialize(): void
    {
        $this->application = Application::getInstance();
    }

    public function setupHooks(): void
    {
        parent::setupHooks();
        add_action('wp_enqueue_scripts', [$this, 'autoEnqueues']);
        add_action('wp_body_open', [$this, 'injectDataProvider']);
        add_action('wp_footer', [$this, 'injectModalConnect']);
        add_action('wp_footer', [$this, 'injectNoticesHandler']);
        add_action('wp_footer', [$this, 'closeDataProviderTag']);
    }

    public function autoEnqueues(): void
    {
        wp_enqueue_style(self::HANDLE_PREFIX . 'style');
        wp_enqueue_script(self::HANDLE_PREFIX . 'script');
        wp_script_add_data(self::HANDLE_PREFIX . 'script', 'defer', true);
        wp_enqueue_script(self::HANDLE_PREFIX . 'notification');
        wp_register_script(
            self::HANDLE_PREFIX . 'recaptcha',
            'https://www.google.com/recaptcha/api.js?onload=cardanoPressRecaptchaCallback'
        );
        wp_script_add_data(self::HANDLE_PREFIX . 'recaptcha', 'defer', true);

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

        echo '<div x-data="cardanoPress" @keydown.escape="showModal = false" data-handle="' . $handle . '">';
    }

    public function injectModalConnect(): void
    {
        $this->application->template('modal-connect');
    }

    public function injectNoticesHandler(): void
    {
        $this->application->template('notices-handler');
    }

    public static function closeDataProviderTag(): void
    {
        echo '</div><!-- x-data="cardanoPress" -->';
    }
}
