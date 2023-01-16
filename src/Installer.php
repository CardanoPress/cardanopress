<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Foundation\AbstractInstaller;
use CardanoPress\Traits\HasSettingsLink;

class Installer extends AbstractInstaller
{
    use HasSettingsLink;

    public const DATA_PREFIX = 'cardanopress_';

    protected function initialize(): void
    {
        $this->setSettingsLinkUrl(admin_url('admin.php?page=' . Admin::OPTION_KEY));
    }

    public function setupHooks(): void
    {
        parent::setupHooks();

        add_action('plugins_loaded', [$this, 'loaded'], -1);
        add_action('admin_notices', [$this, 'noticeApplicationNotReady']);
        add_action('admin_notices', [$this, 'noticePluginReview']);
        add_action('admin_footer', [$this, 'dismissNoticeReviewScript']);
        add_action('wp_ajax_cardanopress_dismiss_review', [$this, 'dismissNoticeReviewAction']);
        add_action(self::DATA_PREFIX . 'upgrading', [$this, 'doUpgrade'], 10, 2);
        add_filter('plugin_action_links_' . $this->pluginBaseName, [$this, 'mergeSettingsLink']);
    }

    public function loaded(): void
    {
        do_action('cardanopress_loaded');
    }

    public function noticeApplicationNotReady(): void
    {
        if ($this->application->isReady()) {
            return;
        }

        ?>
        <div class="notice notice-info">
            <p>
                <strong>CardanoPress</strong> requires Blockfrost API Token.
                <?php echo wp_kses($this->getSettingsLink(__('Please set here', 'cardanopress'), '_blank'), [
                    'a' => [
                        'href' => [],
                        'target' => [],
                    ],
                ]); ?>
            </p>
        </div>
        <?php
    }

    public function noticePluginReview(): void
    {
        if (! empty($_COOKIE['cardanopress_dismiss_review'])) {
            return;
        }

        ?>
        <div class="notice notice-info is-dismissible" id="cardanopress_notice_review">
            <p>
                Are you enjoying using <strong>CardanoPress</strong>?
                <?php echo wp_kses(
                    sprintf(
                        '<a href="%1$s" target="_blank">%2$s</a>',
                        'https://wordpress.org/support/plugin/cardanopress/reviews/',
                        __('Please leave a rating and review', 'cardanopress'),
                    ),
                    [
                        'a' => [
                            'href' => [],
                            'target' => [],
                        ],
                    ]
                ); ?>
                or
                <?php echo wp_kses(
                    sprintf(
                        '<a href="%1$s" target="_blank">%2$s</a>',
                        'https://cardanopress.io/community/',
                        __('comment on the forums to let us know how we can improve', 'cardanopress'),
                    ),
                    [
                        'a' => [
                            'href' => [],
                            'target' => [],
                        ],
                    ]
                ); ?>
                .
            </p>
        </div>
        <?php
    }

    public function dismissNoticeReviewScript()
    {
        if (wp_cache_get('cardanopress_dismiss_review')) {
            return;
        }

        ob_start();
        ?>

        <script id="cardanopress-notice-js" type="text/javascript">
            jQuery(document).on('click', '#cardanopress_notice_review .notice-dismiss', function() {
                jQuery.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data: {
                        action: 'cardanopress_dismiss_review',
                    }
                })
            })
        </script>

        <?php
        echo ob_get_clean();

        wp_cache_set('cardanopress_dismiss_review', true);
    }

    public function dismissNoticeReviewAction()
    {
        $expire = time() + HOUR_IN_SECONDS;
        $secure = is_ssl();

        setcookie('cardanopress_dismiss_review', true, $expire, ADMIN_COOKIE_PATH, COOKIE_DOMAIN, $secure, true);

        wp_die();
    }

    public function doUpgrade(string $currentVersion, string $appVersion): void
    {
        if ('' === $currentVersion) {
            $path = plugin_dir_path($this->application->getPluginFile());

            $this->log('Creating initial pages');
            (new Templates($path . 'templates'))->createPages();
        } elseif (version_compare($currentVersion, '0.29.0', '<')) {
            $this->updateOldPasswords();
        }
    }

    public function updateOldPasswords()
    {
        $this->log('Checking for old user passwords');

        foreach (get_users() as $user) {
            $userProfile = new Profile($user);
            $userId = $userProfile->getData('ID');

            if (! $userProfile->isConnected()) {
                $this->log('Skipped user ' . $userId);
                continue;
            }

            $currentPassword = $userProfile->getData('user_pass');
            $stakeAddress = $userProfile->connectedStake();

            if (
                wp_check_password($userProfile->connectedWallet(), $currentPassword) ||
                wp_check_password($stakeAddress, $currentPassword)
            ) {
                wp_set_password(wp_hash_password($stakeAddress), $userId);
                $this->log('Updated user ' . $userId);
            } else {
                $this->log('Checked user ' . $userId);
            }
        }
    }
}
