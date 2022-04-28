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
