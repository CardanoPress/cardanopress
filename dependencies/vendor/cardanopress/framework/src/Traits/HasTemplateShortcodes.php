<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

use CardanoPress\Interfaces\TemplatesInterface;
use CardanoPress\TemplateLoader;

trait HasTemplateShortcodes
{
    protected ?TemplatesInterface $templates = null;

    protected function setTemplates(TemplatesInterface $templates): void
    {
        $this->templates = $templates;
    }

    protected function getTemplates(): ?TemplatesInterface
    {
        return $this->templates;
    }

    public function doTemplate(array $attributes): string
    {
        if (null === $this->getTemplates()) {
            return '';
        }

        $args = shortcode_atts([
            'name' => '',
            'variables' => '',
            'if' => '',
        ], $attributes);

        if (empty($args['name'])) {
            return '';
        }

        $variables = [];

        if (isset($attributes['variables'])) {
            parse_str(str_replace('&amp;', '&', $args['variables']), $variables);
        }

        $name = pathinfo($args['name'], PATHINFO_DIRNAME) . '/';
        $name .= sanitize_file_name(pathinfo($args['name'], PATHINFO_BASENAME));
        $loader = new TemplateLoader($this->templates);

        ob_start();
        $loader->load(ltrim($name, './'), $variables);

        $html = (string) ob_get_clean();

        return $this->doTemplateIf(['condition' => $args['if']], $html);
    }

    public function doTemplateIf(array $attributes, ?string $content = null): string
    {
        $args = shortcode_atts([
            'condition' => '',
        ], $attributes);

        $html = (string) $content;

        if (empty($args['condition'])) {
            return $html;
        }

        return '<template x-if="' . esc_attr($args['condition']) . '">' . $html . '</template>';
    }
}
