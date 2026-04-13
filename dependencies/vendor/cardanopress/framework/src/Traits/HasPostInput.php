<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Helpers;

use CardanoPress\Interfaces\MessagerInterface;
use CardanoPress\Traits\Loggable;

trait HasPostInput
{
    use Loggable;

    protected MessagerInterface $messager;

    abstract public static function getNonce(): string;

    /** @param string[] $vars */
    public function maybeInvalidPost(array $vars = []): void
    {
        if (is_user_logged_in()) {
            check_ajax_referer(self::getNonce());
        }

        if (! is_allowed_http_origin()) {
            $message = sprintf($this->messager::getErrorMessage('unauthorized'), get_http_origin());

            $this->log($message);
            wp_send_json_error($this->messager::getAjaxMessage('notPermitted'));
        }

        if (empty($vars) || (! empty($_POST) && empty(array_diff($vars, array_keys($_POST))))) {
            return;
        }

        $this->log($this->messager::getErrorMessage('incomplete'));
        wp_send_json_error($this->messager::getAjaxMessage('somethingWrong'));
    }
}
