<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Interfaces\MessagerInterface;
use CardanoPress\Interfaces\HookInterface;

abstract class AbstractMessager implements MessagerInterface, HookInterface
{
    public const HOOK_PREFIX = '';

    public function setupHooks(): void
    {
        add_action('wp_enqueue_scripts', [$this, 'localizeMessages'], 20);
    }

    /** @return array{
     *     ajax?: array{
     *         notPermitted: string,
     *         somethingWrong: string,
     *         ...<string, string>,
     *     },
     *     error?: array{
     *         unauthorized: string,
     *         incomplete: string,
     *         ...<string, string>,
     *     },
     *     script?: array<string, string>,
     * } */
    abstract public static function customizableMessages(): array;

    public static function getAjaxMessage(string $type): string
    {
        $messages = apply_filters(
            static::HOOK_PREFIX . 'ajax_messages',
            static::customizableMessages()['ajax'] ?? []
        );

        return $messages[$type] ?? '';
    }

    public static function getErrorMessage(string $type): string
    {
        $messages = apply_filters(
            static::HOOK_PREFIX . 'error_messages',
            static::customizableMessages()['error'] ?? []
        );

        return $messages[$type] ?? '';
    }

    /** @param array<string, string> $messages */
    abstract protected static function localizeScript(array $messages): void;

    public function localizeMessages(): void
    {
        $messages = apply_filters(
            static::HOOK_PREFIX . 'script_messages',
            static::customizableMessages()['script'] ?? []
        );

        static::localizeScript($messages);
    }
}
