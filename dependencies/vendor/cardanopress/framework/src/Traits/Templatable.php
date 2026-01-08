<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

use CardanoPress\Foundation\AbstractTemplates;
use CardanoPress\TemplateLoader;

trait Templatable
{
    protected AbstractTemplates $templates;

    protected function setTemplates(AbstractTemplates $templates): void
    {
        $this->templates = $templates;
    }

    protected function getTemplates(): AbstractTemplates
    {
        return $this->templates;
    }

    /** @param array<string, mixed> $variables */
    public function template(string $name, array $variables = []): void
    {
        $loader = new TemplateLoader($this->templates);

        $loader->load($name, $variables);
    }

    public function compatibleHeader(): void
    {
        if (! wp_is_block_theme()) {
            get_header();
        } else {
            echo wp_kses_post('<!-- wp:template-part {"slug":"header","area":"header","tagName":"header"} /-->');
        }
    }

    public function compatibleFooter(): void
    {
        if (! wp_is_block_theme()) {
            get_footer();
        } else {
            echo wp_kses_post('<!-- wp:template-part {"slug":"footer","area":"footer","tagName":"footer"} /-->');
        }
    }
}
