<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use CardanoPress\Clients\BlockfrostClient;

// phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps
class Sanitization
{
    protected function customizableMessages()
    {
        return [
            'query_network' => __('Invalid query network', 'cardanopress'),
            'wallet_address' => __('Invalid wallet address', 'cardanopress'),
            'stake_address' => __('Invalid stake address', 'cardanopress'),
            'reward_address' => __('Invalid reward address', 'cardanopress'),
            'pool_id' => __('Invalid pool id', 'cardanopress'),
            'transaction_action' => __('Invalid transaction action', 'cardanopress'),
            'transaction_hash' => __('Invalid transaction hash', 'cardanopress'),
            'ada_handle' => __('Invalid ada handle', 'cardanopress'),
            'data_signature' => __('Invalid data signature', 'cardanopress'),
        ];
    }

    public function getMessage(string $type): string
    {
        $messages = apply_filters('cardanopress_sanitization_messages', $this->customizableMessages());

        return $messages[$type] ?? '';
    }

    /**
     * Sends a JSON response back to an Ajax request if $_POST data fails
     *
     * @param string $key
     * @return string
     */
    public function sanitizePost(string $key): string
    {
        $value = $this->$key($_POST[$key]);
        $value = apply_filters('cardanopress_sanitization_' . $key, $value, $_POST[$key]);

        if ('' === $value) {
            wp_send_json_error($this->getMessage($key));
        }

        return $value;
    }

    public function query_network($value): string
    {
        $value = sanitize_key($value);

        if (! array_key_exists($value, BlockfrostClient::ENDPOINT)) {
            return '';
        }

        return $value;
    }

    public function wallet_address($value): string
    {
        $value = sanitize_text_field($value);

        if ('' === $value || (0 !== strpos($value, 'addr1') && 0 !== strpos($value, 'addr_test1'))) {
            return '';
        }

        return $value;
    }

    public function stake_address($value): string
    {
        $value = sanitize_text_field($value);

        if ('' === $value || (0 !== strpos($value, 'stake1') && 0 !== strpos($value, 'stake_test1'))) {
            return '';
        }

        return $value;
    }

    public function reward_address($value): string
    {
        $value = sanitize_text_field($value);

        if ('' === $value || (0 !== strpos($value, 'stake1') && 0 !== strpos($value, 'stake_test1'))) {
            return '';
        }

        return $value;
    }

    public function pool_id($value): string
    {
        $value = sanitize_text_field($value);

        if ('' === $value || 0 !== strpos($value, 'pool1')) {
            return '';
        }

        return $value;
    }

    public function transaction_action($value): string
    {
        $value = sanitize_key($value);

        if (! in_array($value, ['payment', 'delegation'], true)) {
            return '';
        }

        return $value;
    }

    public function transaction_hash($value): string
    {
        $value = sanitize_key($value);

        if (! ctype_xdigit($value) || 64 !== strlen($value)) {
            return '';
        }

        return $value;
    }

    public function ada_handle($value): string
    {
        $value = sanitize_text_field($value);

        if (empty($value)) {
            return '';
        }

        return $value;
    }

    public function data_signature($value): string
    {
        $value = sanitize_text_field($value);

        if (empty($value)) {
            return '';
        }

        $value = json_decode(stripslashes_deep($value), true);

        if (! is_array($value) || ! isset($value['signature'], $value['key'])) {
            return '';
        }

        return join('|', $value);
    }
}
