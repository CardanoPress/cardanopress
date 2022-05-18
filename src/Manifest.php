<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use PBWebDev\CardanoPress\Foundation\AbstractManifest;

class Manifest extends AbstractManifest
{
    public function __construct(string $load_path, string $version)
    {
        parent::__construct($load_path, $version);

        add_action('wp_enqueue_scripts', [$this, 'autoEnqueues']);
        add_action('wp_body_open', [$this, 'injectDataProvider']);
        add_action('wp_footer', [$this, 'injectModalConnect']);
        add_action('wp_footer', [$this, 'injectNoticesHandler']);
        add_action('wp_footer', [$this, 'closeDataProviderTag']);
    }

    public function getAssetsBase(): string
    {
        return plugin_dir_url(CARDANOPRESS_FILE) . 'assets/dist/';
    }

    public function getAssetPrefix(): string
    {
        return Admin::OPTION_KEY . '-';
    }

    public function autoEnqueues(): void
    {
        wp_enqueue_style($this->getAssetPrefix() . 'style');
        wp_enqueue_script($this->getAssetPrefix() . 'script');
        wp_script_add_data($this->getAssetPrefix() . 'script', 'defer', true);
        wp_enqueue_script($this->getAssetPrefix() . 'notification');
        wp_register_script(
            $this->getAssetPrefix() . 'recaptcha',
            'https://www.google.com/recaptcha/api.js?onload=cardanoPressRecaptchaCallback'
        );
        wp_script_add_data($this->getAssetPrefix() . 'recaptcha', 'defer', true);

        $data = [
            'ajaxUrl' => admin_url('admin-ajax.php'),
            '_nonce' => wp_create_nonce(Admin::OPTION_KEY . '-actions'),
            'logged' => is_user_logged_in(),
        ];

        wp_localize_script($this->getAssetPrefix() . 'script', 'cardanoPress', $data);
    }

    public function injectDataProvider(): void
    {
        $handle = '';

        if (is_user_logged_in()) {
            $handle = Application::instance()->userProfile()->getFavoriteHandle();
        }

        echo '<div x-data="cardanoPress" @keydown.escape="showModal = false" data-handle="' . $handle . '">';
    }

    public function injectModalConnect(): void
    {
        Application::instance()->template('modal-connect');
    }

    public function injectNoticesHandler(): void
    {
        Application::instance()->template('notices-handler');
    }

    public function closeDataProviderTag(): void
    {
        echo '</div>';
    }
}
