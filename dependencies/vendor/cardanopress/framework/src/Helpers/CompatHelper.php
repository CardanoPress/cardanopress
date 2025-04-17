<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Helpers;

use WP_Hook;

class CompatHelper
{
    public const TEMPLATES = ['header.php', 'footer.php'];
    public const ACTIONS = ['wp_head', 'wp_body_open', 'wp_footer'];

    /** @var array<string, WP_Hook[]> */
    protected array $temporaryActionHolder = [];

    public function start(): void
    {
        global $wp_filter;

        foreach (self::ACTIONS as $action) {
            $this->temporaryActionHolder[$action] = $wp_filter[$action];

            unset($wp_filter[$action]);
        }

        add_action('wp_before_load_template', [$this, 'before']);
        add_action('wp_after_load_template', [$this, 'after']);
    }

    public function stop(): void
    {
        global $wp_filter;

        foreach (self::ACTIONS as $action) {
            $wp_filter[$action] = $this->temporaryActionHolder[$action];
        }

        remove_action('wp_before_load_template', [$this, 'before']);
        remove_action('wp_after_load_template', [$this, 'after']);
    }

    public function before(string $loadTemplate): void
    {
        if (in_array(basename($loadTemplate), self::TEMPLATES, true)) {
            ob_start();
        }
    }

    public function after(string $loadTemplate): void
    {
        $template = basename($loadTemplate);

        if (! in_array($template, self::TEMPLATES, true)) {
            return;
        }

        ob_get_clean();

        echo wp_kses_post(
            sprintf(
                '<!-- wp:template-part {"slug":"%1$s","area":"%1$s","tagName":"%1$s"} /-->',
                str_replace('.php', '', $template),
            )
        );
    }
}
