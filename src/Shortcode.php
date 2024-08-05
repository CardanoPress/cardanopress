<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Foundation\AbstractShortcode;
use CardanoPress\Helpers\NumberHelper;
use CardanoPress\Helpers\WalletHelper;

class Shortcode extends AbstractShortcode
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
        add_shortcode('cardanopress_template_if', [$this, 'doTemplateIf']);
        add_shortcode('cardanopress_userprofile', [$this, 'doUserProfile']);
        add_shortcode('cardanopress_delegationpool', [$this, 'doDelegationPool']);
        add_shortcode('cardanopress_wallet_balance', [$this, 'doWalletBalance']);
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

        $name = pathinfo($args['name'], PATHINFO_DIRNAME) . '/';
        $name .= sanitize_file_name(pathinfo($args['name'], PATHINFO_BASENAME));

        ob_start();
        $this->application->template(ltrim($name, './'), $args['variables']);

        $html = ob_get_clean();

        if (empty($args['if'])) {
            return $html;
        }

        return '<template x-if="' . esc_attr($args['if']) . '">' . $html . '</template>';
    }

    public function doTemplateIf(array $attributes, ?string $content = null): string
    {
        $args = shortcode_atts([
            'condition' => '',
        ], $attributes);

        $html = apply_filters('the_content', $content);

        if (empty($args['condition'])) {
            return $html;
        }

        return '<template x-if="' . esc_attr($args['condition']) . '">' . $html . '</template>';
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

        wp_enqueue_script('cardanopress-delegation');

        return trim($html);
    }

    public function doComponentPaymentForm($attributes, ?string $content = null): string
    {
        $recaptchaKeys = $this->application->option('recaptcha_key');
        $dataAttributes = '';
        $args = shortcode_atts([
            'amount' => $this->application->option('payment_amount') ?? 1,
            'recaptcha' => $recaptchaKeys['site'] ?? '',
            'address' => '',
        ], $attributes);

        foreach ($args as $key => $value) {
            $dataAttributes .= ' data-' . $key . '="' . esc_attr($value) . '"';
        }

        $html = '<form x-data="paymentForm"' . $dataAttributes . '>';
        $html .= apply_filters('the_content', $content);
        $html .= '</form>';

        wp_enqueue_script('cardanopress-payment');

        if ('' !== $args['recaptcha']) {
            wp_enqueue_script('cardanopress-recaptcha');
        }

        return trim($html);
    }

    public function doComponentSplitForm($attributes, ?string $content = null): string
    {
        $fixedFee = $this->application->option('payment_split');

        $html = '<form x-data="splitForm" data-fee="' . esc_attr($fixedFee) . '">';
        $html .= apply_filters('the_content', $content);
        $html .= '</form>';

        wp_enqueue_script('cardanopress-split');

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

    public function doWalletBalance(array $attributes): string
    {
        $args = shortcode_atts([
            'address' => '',
            'unit' => 'lovelace',
        ], $attributes);

        if (
            empty($args['address']) ||
            (
                false === strpos($args['address'], 'addr1') &&
                false === strpos($args['address'], 'addr_test1')
            )
        ) {
            return '';
        }

        $queryNetwork = WalletHelper::getNetworkFromAddress($args['address']);

        if (! Blockfrost::isReady($queryNetwork)) {
            return '';
        }

        $cacheKey = 'wallet_balance_' . $args['address'];
        $value = wp_cache_get($cacheKey, Admin::OPTION_KEY);

        if (false === $value) {
            $blockfrost = new Blockfrost($queryNetwork);
            $addressDetails = $blockfrost->getAddressDetails($args['address']);
            $index = array_search('lovelace', array_column($addressDetails['amount'], 'unit'), true);

            if (false === $index) {
                return '';
            }

            $value = $addressDetails['amount'][$index]['quantity'];

            wp_cache_set($cacheKey, $value, Admin::OPTION_KEY);
        }

        if ('ada' === $args['unit']) {
            return strval(NumberHelper::lovelaceToAda($value));
        }

        return $value;
    }
}
