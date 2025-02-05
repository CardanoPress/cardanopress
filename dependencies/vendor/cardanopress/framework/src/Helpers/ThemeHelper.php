<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Helpers;

class ThemeHelper
{
    public static function correctTemplate(string $candidate): string
    {
        if (wp_is_block_theme()) {
            $compatHandler = self::compatHandler();

            $compatHandler->start();
            self::captureBlockContent($candidate);
            $compatHandler->stop();

            return ABSPATH . WPINC . '/template-canvas.php';
        }

        return $candidate;
    }

    public static function captureBlockContent(string $template): void
    {
        global $_wp_current_template_content;

        ob_start();
        require $template;

        $_wp_current_template_content = ob_get_clean();
    }

    protected static function compatHandler(): object
    {
        return new class () {
            protected static array $wantedTemplates = ['header.php', 'footer.php'];
            protected static array $wantedActions = ['wp_head', 'wp_body_open', 'wp_footer'];
            protected array $temporaryActionHolder = [];

            public function start(): void
            {
                global $wp_filter;

                foreach (self::$wantedActions as $action) {
                    $this->temporaryActionHolder[$action] = $wp_filter[$action];

                    unset($wp_filter[$action]);
                }

                add_action('wp_before_load_template', [$this, 'before']);
                add_action('wp_after_load_template', [$this, 'after']);
            }

            public function stop(): void
            {
                global $wp_filter;

                foreach (self::$wantedActions as $action) {
                    $wp_filter[$action] = $this->temporaryActionHolder[$action];
                }

                remove_action('wp_before_load_template', [$this, 'before']);
                remove_action('wp_after_load_template', [$this, 'after']);
            }

            public function before(string $loadTemplate): void
            {
                if (in_array(basename($loadTemplate), self::$wantedTemplates, true)) {
                    ob_start();
                }
            }

            public function after(string $loadTemplate): void
            {
                $template = basename($loadTemplate);

                if (! in_array($template, self::$wantedTemplates, true)) {
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
        };
    }
}
