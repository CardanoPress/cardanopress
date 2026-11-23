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

    /** @param array<string, mixed> $attributes */
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

        if (! TemplateLoader::isSafeName((string) $args['name'])) {
            return '';
        }

        $name = pathinfo($args['name'], PATHINFO_DIRNAME) . '/';
        $name .= sanitize_file_name(pathinfo($args['name'], PATHINFO_BASENAME));
        $loader = new TemplateLoader($this->templates);

        ob_start();
        $loader->load(ltrim($name, './'), $variables);

        $html = (string) ob_get_clean();

        return $this->doTemplateIf(['condition' => $args['if']], $html);
    }

    /** @param array<string, string> $attributes */
    public function doTemplateIf(array $attributes, ?string $content = null): string
    {
        $args = shortcode_atts([
            'condition' => '',
        ], $attributes);

        $html = (string) $content;

        if (empty($args['condition'])) {
            return $html;
        }

        if (! $this->isAllowedCondition($args['condition'])) {
            return '';
        }

        return '<template x-if="' . esc_attr($args['condition']) . '">' . $html . '</template>';
    }

    /**
     * Alpine evaluates x-if, so only simple identifiers are accepted, unless
     * the author of the current post is allowed to post unfiltered HTML.
     */
    protected function isAllowedCondition(string $condition): bool
    {
        $id = '!?\s*[a-zA-Z_]\w*';

        if (1 === preg_match('/^\s*' . $id . '(?:\s*(?:&&|\|\|)\s*' . $id . ')*\s*$/', $condition)) {
            return true;
        }

        $post = get_post();

        return $post && user_can((int) $post->post_author, 'unfiltered_html');
    }
}
