<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Interfaces\SanitizerInterface;

abstract class AbstractSanitizer implements SanitizerInterface
{
    public const HOOK_PREFIX = '';

    /** @return array<string, string> */
    abstract public static function customizableMessages(): array;

    public static function getMessage(string $type): string
    {
        $messages = apply_filters(static::HOOK_PREFIX . 'messages', static::customizableMessages());

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
        if (! isset($_POST[$key])) {
            wp_send_json_error(static::getMessage($key));
        }

        $value = $_POST[$key];

        if (method_exists($this, $key)) {
            $value = $this->$key($value);
        }

        $value = apply_filters(static::HOOK_PREFIX . $key, $value, $_POST[$key]);

        if ('' === $value) {
            wp_send_json_error(static::getMessage($key));
        }

        return $value;
    }
}
