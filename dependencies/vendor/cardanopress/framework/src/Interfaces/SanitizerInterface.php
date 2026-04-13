<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Interfaces;

interface SanitizerInterface
{
    /** @return array<string, string> */
    public static function customizableMessages(): array;

    public static function getMessage(string $type): string;

    public function sanitizePost(string $key): string;
}
