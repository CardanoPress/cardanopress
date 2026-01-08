<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress;

use CardanoPress\Interfaces\TemplatesInterface;

class TemplateLoader
{
    protected TemplatesInterface $templates;

    public function __construct(TemplatesInterface $templates)
    {
        $this->templates = $templates;
    }

    /** @param array<string, mixed> $variables */
    public function load(string $name, array $variables = []): void
    {
        $name .= '.php';
        $file = locate_template($this->templates->getOverridesPrefix() . $name);

        if (! $file) {
            $file = $this->templates->getPath() . $name;
        }

        if (file_exists($file)) {
            extract($variables, EXTR_OVERWRITE);
            include $file;
        }
    }
}
