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
        add_shortcode('cardanopress_delegationpool', [$this, 'doDelegationPool']);
    }

    public function doOption(array $attributes): string
    {
        $args = shortcode_atts([
            'key' => '',
            'sub' => '',
        ], $attributes);

        if (empty($args['key'])) {
            return '';
        }

        $app = Application::instance();
        $value = $app->option($args['key']);

        return $this->printOutput($value, $args['sub']);
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

    public function doUserProfile(array $attributes): string
    {
        $args = shortcode_atts([
            'method' => '',
            'sub' => '',
        ], $attributes);

        if (empty($args['method'])) {
            return '';
        }

        $app = Application::instance();
        $method = $args['method'];
        $value = $app->userProfile()->$method();

        return $this->printOutput($value, $args['sub']);
    }

    public function doDelegationPool(array $attributes): string
    {
        $args = shortcode_atts([
            'key' => '',
        ], $attributes);

        if (empty($args['key'])) {
            return '';
        }

        $app = Application::instance();
        $value = $app->delegationPool();
        $value = $value[$args['key']] ?? '';

        return $this->printOutput($value);
    }

    private function printOutput($value, string $sub = '')
    {
        if (is_array($value)) {
            $value = empty($sub) ? $value : $value[$sub] ?? '';

            return $this->getString($value);
        }

        return $value;
    }

    private function getString($value): string
    {
        return is_array($value) ? json_encode($value) : $value;
    }
}
