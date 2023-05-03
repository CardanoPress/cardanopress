<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

use CardanoPress\Interfaces\ProfileInterface;

trait Noticeable
{
    protected ProfileInterface $userProfile;

    protected function setProfile(ProfileInterface $userProfile): void
    {
        $this->userProfile = $userProfile;
    }

    protected function getProfile(): ProfileInterface
    {
        return $this->userProfile;
    }

    protected function setupNotices(): void
    {
        add_action('admin_footer', [$this, 'dismissNoticeScript']);
        add_action('wp_ajax_cardanopress_dismiss_notice', [$this, 'dismissNoticeAction']);
    }

    protected function noticeId(string $type): string
    {
        return 'cardanopress_notice_' . $type;
    }

    protected function noticeKey(string $id): string
    {
        return str_replace('cardanopress_notice_', '', $id);
    }

    protected function shouldNotice(string $type, string $page = ''): bool
    {
        $screen = get_current_screen();

        if ('' !== $page && $page === $screen->parent_base) {
            return empty($_COOKIE[$this->noticeId($type)]);
        }

        return ! $this->userProfile->isDismissedNotice($type);
    }

    public function dismissNoticeScript()
    {
        if (wp_cache_get('cardanopress_dismiss_notice')) {
            return;
        }

        ob_start();
        ?>

        <script id="cardanopress-notice-js" type="text/javascript">
            jQuery(document).on('click', '.cardanopress-notice .notice-dismiss', function() {
                jQuery.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: {
                        action: 'cardanopress_dismiss_notice',
                        name: jQuery(this).parent().attr('id')
                    }
                })
            })
        </script>

        <?php
        echo ob_get_clean();

        wp_cache_set('cardanopress_dismiss_notice', true);
    }

    public function dismissNoticeAction()
    {
        $name = sanitize_text_field($_POST['name']);
        $expire = time() + DAY_IN_SECONDS;
        $secure = is_ssl();

        setcookie($name, true, $expire, ADMIN_COOKIE_PATH, COOKIE_DOMAIN, $secure, true);

        $this->userProfile->dismissNotice($this->noticeKey($name));

        wp_die();
    }
}
