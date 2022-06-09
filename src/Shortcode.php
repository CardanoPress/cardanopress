<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Interfaces\HookInterface;

class Shortcode implements HookInterface
{
    protected Application $application;

    public function __construct()
    {
        $this->application = Application::getInstance();
    }

    public function setupHooks(): void
    {
        add_shortcode('cardanopress_option', [$this, 'doOption']);
        add_shortcode('cardanopress_template', [$this, 'doTemplate']);
        add_shortcode('cardanopress_userprofile', [$this, 'doUserProfile']);
        add_shortcode('cardanopress_delegationpool', [$this, 'doDelegationPool']);
        add_shortcode('cardanopress_component_cardanopress', [$this, 'doComponentCardanoPress']);
        add_shortcode('cardanopress_component_pooldelegation', [$this, 'doComponentPoolDelegation']);
        add_shortcode('cardanopress_component_paymentform', [$this, 'doComponentPaymentForm']);
        add_shortcode('cardanopress_component_splitform', [$this, 'doComponentSplitForm']);
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

        $value = $this->application->option($args['key']);

        return $this->printOutput($value, $args['sub']);
    }

    public function doTemplate(array $attributes): string
    {
        $args = shortcode_atts([
            'name' => '',
            'variables' => [],
            'if' => '',
        ], $attributes);

        if (empty($args['name'])) {
            return '';
        }

        if (isset($attributes['variables'])) {
            parse_str(str_replace('&amp;', '&', $args['variables']), $args['variables']);
        }

        ob_start();
        $this->application->template($args['name'], $args['variables']);

        $html = ob_get_clean();

        if (empty($args['if'])) {
            return $html;
        }

        return '<template x-if="' . $args['if'] . '">' . $html . '</template>';
    }

    public function doComponentCardanoPress($attributes, ?string $content = null): string
    {
        ob_start();
        Manifest::injectDataProvider();

        $html = ob_get_clean();
        $html .= apply_filters('the_content', $content);

        ob_start();
        Manifest::closeDataProviderTag();

        $html .= ob_get_clean();

        return $html;
    }

    public function doComponentPoolDelegation($attributes, ?string $content = null): string
    {
        $html = '<div x-data="poolDelegation">';
        $html .= apply_filters('the_content', $content);
        $html .= '</div>';

        return trim($html);
    }

    public function doComponentPaymentForm($attributes, ?string $content = null): string
    {
        $paymentAmount = $this->application->option('payment_amount') ?? 1;
        $recaptchaKeys = $this->application->option('recaptcha_key');
        $recaptchaKey = $recaptchaKeys['site'] ?? '';

        $html = '<form x-data="paymentForm" data-amount="' . $paymentAmount . '" data-recaptcha="' . $recaptchaKey . '">';
        $html .= apply_filters('the_content', $content);
        $html .= '</form>';

        return trim($html);
    }

    public function doComponentSplitForm($attributes, ?string $content = null): string
    {
        $fixedFee = $this->application->option('payment_split');

        $html = '<form x-data="splitForm" data-fee="' . $fixedFee . '">';
        $html .= apply_filters('the_content', $content);
        $html .= '</form>';

        return trim($html);
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

        $method = $args['method'];
        $value = $this->application->userProfile()->$method();

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

        $value = $this->application->delegationPool();
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
