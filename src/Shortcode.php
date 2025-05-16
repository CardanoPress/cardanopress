<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Foundation\AbstractShortcode;
use CardanoPress\Helpers\NumberHelper;
use CardanoPress\Helpers\WalletHelper;
use CardanoPress\Traits\HasTemplateShortcodes;

class Shortcode extends AbstractShortcode
{
    use HasTemplateShortcodes;

    protected Application $application;
    protected Component $component;

    public function __construct()
    {
        $this->application = Application::getInstance();
        $this->component = new Component(false);

        $this->setTemplates($this->application->getTemplates());
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

    /** @param array<string, string> $attributes */
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

    /** @param array<string, string> $attributes */
    public function doComponentCardanoPress(array $attributes, ?string $content = null): string
    {
        ob_start();
        Manifest::injectDataProvider();

        $html = ob_get_clean();
        $html .= (string) $content;

        ob_start();
        Manifest::closeDataProviderTag();

        $html .= ob_get_clean();

        return $html;
    }

    /** @param array<string, string> $attributes */
    public function doComponentPoolDelegation(array $attributes, ?string $content = null): string
    {
        $html = '<div ' . $this->component->poolDelegation() . '>';
        $html .= (string) $content;
        $html .= '</div>';

        return trim($html);
    }

    /** @param array<string, string> $attributes */
    public function doComponentPaymentForm(array $attributes, ?string $content = null): string
    {
        $args = shortcode_atts([
            'amount' => null,
            'address' => null,
        ], $attributes);

        $args['amount'] = (float) $args['amount'];

        if (! $args['amount']) {
            $args['amount'] = null;
        }

        $html = '<form ' . $this->component->paymentForm($args['amount'], $args['address']) . '>';
        $html .= (string) $content;
        $html .= '</form>';

        return trim($html);
    }

    /** @param array<string, string> $attributes */
    public function doComponentSplitForm(array $attributes, ?string $content = null): string
    {
        $html = '<form ' . $this->component->splitForm() . '>';
        $html .= (string) $content;
        $html .= '</form>';

        return trim($html);
    }

    /** @param array<string, string> $attributes */
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

    /** @param array<string, string> $attributes */
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

    /** @param array<string, string> $attributes */
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

            if (empty($addressDetails['amount'])) {
                return '';
            }

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
