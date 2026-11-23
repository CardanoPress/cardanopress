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

    private const PROFILE_GETTERS = [
        'storedHandles',
        'getFavoriteHandle',
        'getTrimmedAddress',
        'getAccountInfo',
        'isConnected',
        'connectedNetwork',
        'connectedWallet',
        'connectedStake',
        'storedAssets',
        'allTransactions',
    ];

    // Safe to show publicly; secrets (blockfrost_*, recaptcha_*) are excluded, and so is
    // payment_address while reCAPTCHA is on (see publicOptions)
    private const PUBLIC_OPTIONS = [
        'delegation_pool_id',
        'payment_amount',
        'payment_split',
        'policy_ids',
        'ua_required_amount',
        'ua_required_epoch',
    ];

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

    /** @return string[] */
    private function publicOptions(): array
    {
        $defaults = self::PUBLIC_OPTIONS;
        $recaptcha = (array) $this->application->option('recaptcha_key');

        // With reCAPTCHA on, the payment address is only revealed after the check passes
        if ('' === (string) ($recaptcha['secret'] ?? '')) {
            $defaults[] = 'payment_address';
        }

        $keys = (array) apply_filters('cardanopress_public_options', $defaults);

        return array_values(array_filter($keys, static function ($key) {
            return is_string($key) && 1 !== preg_match('/^(blockfrost|recaptcha)_/i', $key);
        }));
    }

    private function isPublicOption(string $key): bool
    {
        return in_array($key, $this->publicOptions(), true);
    }

    /** @param array<string, mixed> $attributes */
    public function doTemplate(array $attributes): string
    {
        $templates = $this->getTemplates();

        if (null === $templates) {
            return '';
        }

        $args = shortcode_atts([
            'name' => '',
            'variables' => '',
            'if' => '',
        ], $attributes);

        if (empty($args['name']) || ! TemplateLoader::isSafeName((string) $args['name'])) {
            return '';
        }

        $variables = [];

        if (isset($attributes['variables'])) {
            parse_str(str_replace('&amp;', '&', (string) $args['variables']), $variables);
        }

        $name = pathinfo($args['name'], PATHINFO_DIRNAME) . '/';
        $name .= sanitize_file_name(pathinfo($args['name'], PATHINFO_BASENAME));
        $loader = new TemplateLoader($templates);

        ob_start();
        $loader->load(ltrim($name, './'), $variables);

        $html = (string) ob_get_clean();

        return $this->doTemplateIf(['condition' => $args['if']], $html);
    }

    /** @param array<string, string> $attributes */
    public function doTemplateIf(array $attributes, ?string $content = null): string
    {
        $args = shortcode_atts([
            'condition' => '',
        ], $attributes);

        $html = (string) $content;

        if (empty($args['condition'])) {
            return $html;
        }

        if (! $this->isSafeCondition((string) $args['condition'])) {
            return '';
        }

        return '<template x-if="' . esc_attr($args['condition']) . '">' . $html . '</template>';
    }

    /**
     * Alpine evaluates x-if, so only plain identifiers (optionally negated) joined
     * by && or || are accepted, unless the post author may post unfiltered HTML.
     */
    private function isSafeCondition(string $condition): bool
    {
        $id = '!?\s*[a-zA-Z_]\w*';

        if (1 === preg_match('/^\s*' . $id . '(?:\s*(?:&&|\|\|)\s*' . $id . ')*\s*$/', $condition)) {
            return true;
        }

        $post = get_post();

        return $post instanceof \WP_Post && user_can((int) $post->post_author, 'unfiltered_html');
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

        if (! $this->isPublicOption((string) $args['key'])) {
            return '';
        }

        $value = $this->application->option($args['key']);

        // Option values are admin-set; allow safe HTML but strip scripts/handlers.
        return wp_kses_post((string) $this->printOutput($value, $args['sub']));
    }

    /** @param array<string, string> $attributes */
    public function doComponentCardanoPress(array $attributes, ?string $content = null): string
    {
        ob_start();
        Manifest::injectDataProvider();

        $html = ob_get_clean();
        $html .= apply_filters('the_content', (string) $content);

        ob_start();
        Manifest::closeDataProviderTag();

        $html .= ob_get_clean();

        return $html;
    }

    /** @param array<string, string> $attributes */
    public function doComponentPoolDelegation(array $attributes, ?string $content = null): string
    {
        $html = '<div ' . $this->component->poolDelegation() . '>';
        $html .= apply_filters('the_content', (string) $content);
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
        $html .= apply_filters('the_content', (string) $content);
        $html .= '</form>';

        return trim($html);
    }

    /** @param array<string, string> $attributes */
    public function doComponentSplitForm(array $attributes, ?string $content = null): string
    {
        $html = '<form ' . $this->component->splitForm() . '>';
        $html .= apply_filters('the_content', (string) $content);
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

        if (! in_array($method, self::PROFILE_GETTERS, true)) {
            return '';
        }

        $userProfile = $this->application->userProfile();
        $value = $userProfile->$method();

        // Profile/blockchain data is untrusted; escape before output.
        return esc_html((string) $this->printOutput($value, $args['sub']));
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

        // Pool metadata is fetched from off-chain URLs; escape before output.
        return esc_html((string) $this->printOutput($value));
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

        $cacheKey = 'cardanopress_balance_' . md5($queryNetwork . '|' . $args['address']);
        $value = get_transient($cacheKey);

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

            set_transient($cacheKey, $value, 5 * MINUTE_IN_SECONDS);
        }

        if ('ada' === $args['unit']) {
            return esc_html(strval(NumberHelper::lovelaceToAda($value)));
        }

        return esc_html((string) $value);
    }
}
