<?php

/**
 * @package ThemePlate
 * @since   1.36.2
 */

namespace PBWebDev\CardanoPress\Helpers;

class OutputHelper
{
    private const ALLOWED_IMAGE_MIMES = [
        'image/png',
        'image/jpeg',
        'image/gif',
        'image/webp',
    ];

    public static function escapeSrc(string $value): string
    {
        if ('' === $value) {
            return '';
        }

        if (! str_starts_with($value, 'data:')) {
            return esc_url($value);
        }

        if (1 !== preg_match('#^data:(image/[a-z]+)[;,]#', $value, $matches)) {
            return '';
        }

        if (! in_array($matches[1], self::ALLOWED_IMAGE_MIMES, true)) {
            return '';
        }

        return esc_attr($value);
    }
}
