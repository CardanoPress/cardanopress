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
            $compatHandler = new CompatHelper();

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
}
