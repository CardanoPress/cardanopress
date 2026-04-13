<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use CardanoPress\Clients\BlockfrostClient;
use CardanoPress\Foundation\AbstractSanitizer;

// phpcs:disable PSR1.Methods.CamelCapsMethodName.NotCamelCaps
class Sanitization extends AbstractSanitizer
{
    public const HOOK_PREFIX = 'cardanopress_sanitization_';

    /** @return array<string, string> */
    public static function customizableMessages(): array
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

    public function query_network(string $value): string
    {
        $value = sanitize_key($value);

        if (! array_key_exists($value, BlockfrostClient::ENDPOINT)) {
            return '';
        }

        return $value;
    }

    public function wallet_address(string $value): string
    {
        $value = sanitize_text_field($value);

        if ('' === $value || (0 !== strpos($value, 'addr1') && 0 !== strpos($value, 'addr_test1'))) {
            return '';
        }

        return $value;
    }

    public function stake_address(string $value): string
    {
        $value = sanitize_text_field($value);

        if ('' === $value || (0 !== strpos($value, 'stake1') && 0 !== strpos($value, 'stake_test1'))) {
            return '';
        }

        return $value;
    }

    public function reward_address(string $value): string
    {
        $value = sanitize_text_field($value);

        if ('' === $value || (0 !== strpos($value, 'stake1') && 0 !== strpos($value, 'stake_test1'))) {
            return '';
        }

        return $value;
    }

    public function pool_id(string $value): string
    {
        $value = sanitize_text_field($value);

        if ('' === $value || 0 !== strpos($value, 'pool1')) {
            return '';
        }

        return $value;
    }

    public function transaction_action(string $value): string
    {
        $value = sanitize_key($value);

        if (! in_array($value, ['payment', 'delegation'], true)) {
            return '';
        }

        return $value;
    }

    public function transaction_hash(string $value): string
    {
        $value = sanitize_key($value);

        if (! ctype_xdigit($value) || 64 !== strlen($value)) {
            return '';
        }

        return $value;
    }

    public function ada_handle(string $value): string
    {
        $value = sanitize_text_field($value);

        if (empty($value)) {
            return '';
        }

        return $value;
    }

    public function data_signature(string $value): string
    {
        $value = sanitize_text_field($value);

        if (empty($value)) {
            return '';
        }

        $value = json_decode(stripslashes_deep($value), true);

        if (! is_array($value) || ! isset($value['signature'], $value['key'])) {
            return '';
        }

        return join('|', [$value['signature'], $value['key']]);
    }
}
