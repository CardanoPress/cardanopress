<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

class Shortcode
{
    public function __construct()
    {
        add_shortcode('cardanopress_option', [$this, 'doOption']);
        add_shortcode('cardanopress_template', [$this, 'doTemplate']);
        add_shortcode('cardanopress_userprofile', [$this, 'doUserProfile']);
    }

    public function doOption(array $attributes)
    {
        $args = shortcode_atts([
            'key' => '',
        ], $attributes);

        if (empty($args['key'])) {
            return '';
        }

        $app = Application::instance();

        return $app->option($args['key']);
    }

    public function doTemplate(array $attributes): string
    {
        $args = shortcode_atts([
            'name' => '',
            'variables' => [],
        ], $attributes);

        if (empty($args['name'])) {
            return '';
        }

        $app = Application::instance();

        ob_start();
        $app->template($args['name'], $args['variables']);

        return ob_get_clean();
    }

    public function doUserProfile(array $attributes)
    {
        $args = shortcode_atts([
            'method' => '',
        ], $attributes);

        if (empty($args['method'])) {
            return '';
        }

        $app = Application::instance();
        $method = $args['method'];

        return $app->userProfile()->$method();
    }
}
