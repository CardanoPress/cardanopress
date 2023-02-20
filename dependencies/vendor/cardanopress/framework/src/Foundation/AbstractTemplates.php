<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Interfaces\HookInterface;
use CardanoPress\Interfaces\TemplatesInterface;
use CardanoPress\SharedBase;

abstract class AbstractTemplates extends SharedBase implements TemplatesInterface, HookInterface
{
    protected string $path;

    public const OVERRIDES_PREFIX = '';

    public function __construct(string $path)
    {
        $this->path = trailingslashit($path);

        $this->initialize();
    }

    abstract protected function getLoaderFile(): string;

    public function setupHooks(): void
    {
        add_filter('template_include', [$this, 'loadCustomTemplate'], -1);
    }

    public function loadCustomTemplate(string $default): string
    {
        if (is_embed()) {
            return $default;
        }

        $loaderFile = $this->getLoaderFile();

        if (empty($loaderFile)) {
            return $default;
        }

        $template_file = locate_template($loaderFile);

        if (! $template_file) {
            $template_file = $this->path . str_replace(static::OVERRIDES_PREFIX, '', $loaderFile);
        }

        if (file_exists($template_file)) {
            return $template_file;
        }

        return $default;
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function getOverridesPrefix(): string
    {
        return static::OVERRIDES_PREFIX;
    }
}
