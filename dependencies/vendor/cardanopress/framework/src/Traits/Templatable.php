<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

use CardanoPress\Interfaces\TemplatesInterface;

trait Templatable
{
    protected TemplatesInterface $templates;

    protected function setTemplates(TemplatesInterface $templates): void
    {
        $this->templates = $templates;
    }

    protected function getTemplates(): TemplatesInterface
    {
        return $this->templates;
    }

    public function template(string $name, array $variables = []): void
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
