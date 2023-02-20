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
        ];
    }

    public function getMessage(string $type): string
    {
        $messages = apply_filters('cardanopress_sanitization_messages', $this->customizableMessages());

        return $messages[$type] ?? '';
    }

    public function query_network(): string
    {
        $value = sanitize_key($_POST['query_network']);

        if (! array_key_exists($value, BlockfrostClient::ENDPOINT)) {
            wp_send_json_error($this->getMessage('query_network'));
        }

        return $value;
    }

    public function wallet_address(): string
    {
        $value = sanitize_text_field($_POST['wallet_address']);

        if ('' === $value || (0 !== strpos($value, 'addr1') && 0 !== strpos($value, 'addr_test1'))) {
            wp_send_json_error($this->getMessage('wallet_address'));
        }

        return $value;
    }

    public function stake_address(): string
    {
        $value = sanitize_text_field($_POST['stake_address']);

        if ('' === $value || (0 !== strpos($value, 'stake1') && 0 !== strpos($value, 'stake_test1'))) {
            wp_send_json_error($this->getMessage('stake_address'));
        }

        return $value;
    }

    public function reward_address(): string
    {
        $value = sanitize_text_field($_POST['reward_address']);

        if ('' === $value || (0 !== strpos($value, 'stake1') && 0 !== strpos($value, 'stake_test1'))) {
            wp_send_json_error($this->getMessage('reward_address'));
        }

        return $value;
    }

    public function pool_id(): string
    {
        $value = sanitize_text_field($_POST['pool_id']);

        if ('' === $value || 0 !== strpos($value, 'pool1')) {
            wp_send_json_error($this->getMessage('pool_id'));
        }

        return $value;
    }

    public function transaction_action(): string
    {
        $value = sanitize_key($_POST['transaction_action']);

        if (! in_array($value, ['payment', 'delegation'], true)) {
            wp_send_json_error($this->getMessage('transaction_action'));
        }

        return $value;
    }

    public function transaction_hash(): string
    {
        $value = sanitize_key($_POST['transaction_hash']);

        if (! ctype_xdigit($value) || 64 !== strlen($value)) {
            wp_send_json_error($this->getMessage('transaction_hash'));
        }

        return $value;
    }

    public function ada_handle(): string
    {
        $value = sanitize_text_field($_POST['ada_handle']);

        if (empty($value)) {
            wp_send_json_error($this->getMessage('ada_handle'));
        }

        return $value;
    }
}
