<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Interfaces;

interface MessagerInterface
{
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
    public static function customizableMessages(): array;

    public static function getAjaxMessage(string $type): string;

    public static function getErrorMessage(string $type): string;

    public function localizeMessages(): void;
}
