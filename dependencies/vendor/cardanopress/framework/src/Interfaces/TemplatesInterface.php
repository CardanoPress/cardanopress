<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Interfaces;

interface TemplatesInterface
{
    public function __construct(string $path);

    public function loadCustomTemplate(string $default): string;

    public function getPath(): string;

    public function getOverridesPrefix(): string;
}
