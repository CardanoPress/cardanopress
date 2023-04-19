<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Foundation\AbstractInstaller;
use CardanoPress\Traits\HasSettingsLink;

/** @property Application $application */
class Installer extends AbstractInstaller
{
    use HasSettingsLink;

    protected Compatibility $compatibility;

    public const DATA_PREFIX = 'cardanopress_';

    protected function initialize(): void
    {
        $this->compatibility = new Compatibility($this->getLogger());

        $this->setSettingsLinkUrl(admin_url('admin.php?page=' . Admin::OPTION_KEY));
    }

    public function setupHooks(): void
    {
        parent::setupHooks();

        add_action('plugins_loaded', [$this, 'loaded'], -1);
        add_action('admin_notices', [$this, 'noticeApplicationNotReady']);
        add_action('admin_notices', [$this, 'noticePluginReview']);
        add_action('admin_notices', [$this, 'noticePossibleIssues']);
        add_action('admin_footer', [$this, 'dismissNoticeReviewScript']);
        add_action('wp_ajax_cardanopress_dismiss_review', [$this, 'dismissNoticeReviewAction']);
        add_action('after_switch_theme', [$this, 'doActivate']);
        add_action(self::DATA_PREFIX . 'activating', [$this, 'doActivate']);
        add_action(self::DATA_PREFIX . 'upgrading', [$this, 'doUpgrade'], 10, 2);
        add_filter('plugin_action_links_' . $this->pluginBaseName, [$this, 'mergeSettingsLink']);
    }

    public function loaded(): void
    {
        do_action(static::DATA_PREFIX . 'loaded');

        if ('activated' === $this->compatibility->getStatus()) {
            $this->compatibility->setStatus('checking');

            if (! $this->compatibility->server()) {
                $this->compatibility->addIssue('server');
            }

            if (wp_is_block_theme()) {
                $this->compatibility->addIssue('block');
                $this->compatibility->addIssue('blank');
            }

            if (! $this->compatibility->theme()) {
                $this->compatibility->setStatus('activated');

                return;
            }

            foreach ($this->compatibility->getIssues(true) as $issue) {
                $this->compatibility->addIssue($issue);
            }

            $issues = $this->compatibility->getIssues();

            foreach ($issues as $issue) {
                $this->compatibility->dump($issue);
            }

            $this->compatibility->saveIssues();
            $this->compatibility->setStatus(empty($issues) ? 'normal' : 'issue');
        }
    }

    public function noticeApplicationNotReady(): void
    {
        if ($this->application->isReady()) {
            return;
        }

        ?>
        <div class="notice notice-info">
            <p>
                <?php echo wp_kses(
                    sprintf(
                        /* translators: %s: plugin name */
                        __('%s requires Blockfrost API Token.', 'cardanopress'),
                        '<strong>' . $this->application->getData('Name') . '</strong>',
                    ),
                    'strong'
                ); ?>
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
        if (! $this->shouldNoticeReview()) {
            return;
        }

        ?>
        <div class="notice notice-info is-dismissible" id="cardanopress_notice_review">
            <p>
                <?php echo wp_kses(
                    sprintf(
                        /* translators: %s: plugin name */
                        __('Are you enjoying using %s?', 'cardanopress'),
                        '<strong>' . $this->application->getData('Name') . '</strong>',
                    ),
                    'strong'
                ); ?>
                <?php echo wp_kses(
                    sprintf(
                        sprintf(
                            /* translators: %s: action message */
                            __('Please %1$s or %1$s to let us know how we can improve.', 'cardanopress'),
                            '<a href="%s" target="_blank">%s</a>',
                        ),
                        'https://wordpress.org/support/plugin/cardanopress/reviews/',
                        __('leave a rating and review', 'cardanopress'),
                        'https://cardanopress.io/community/',
                        __('comment on the forums', 'cardanopress'),
                    ),
                    [
                        'a' => [
                            'href' => [],
                            'target' => [],
                        ],
                    ]
                ); ?>
            </p>
        </div>
        <?php
    }

    public function noticePossibleIssues(): void
    {
        if ('issue' !== $this->compatibility->getStatus()) {
            return;
        }

        $issues = $this->compatibility->getIssues();

        if (empty($issues)) {
            return;
        }

        ?>
        <div class="notice notice-error">
            <p>
                <?php echo wp_kses(
                    sprintf(
                    /* translators: %s: plugin name */
                        __('%s issues detected.', 'cardanopress'),
                        '<strong>' . $this->application->getData('Name') . '</strong>',
                    ),
                    'strong'
                ); ?>
            </p>

            <ul style='list-style-type: decimal; padding: 1rem;'>
                <?php foreach ($issues as $issue) : ?>
                    <li><?php echo esc_html($issue); ?></li>
                <?php endforeach; ?>
            </ul>
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
                        action: 'cardanopress_dismiss_review'
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
        $expire = time() + DAY_IN_SECONDS;
        $secure = is_ssl();

        setcookie('cardanopress_dismiss_review', true, $expire, ADMIN_COOKIE_PATH, COOKIE_DOMAIN, $secure, true);
        $this->application->userProfile()->dismissNoticeReview();
        wp_die();
    }

    protected function shouldNoticeReview(): bool
    {
        $screen = get_current_screen();

        if (Admin::OPTION_KEY === $screen->parent_base) {
            return empty($_COOKIE['cardanopress_dismiss_review']);
        }

        return !$this->application->userProfile()->isDismissedNoticeReview();
    }

    public function doActivate(): void
    {
        $this->compatibility->setStatus('activated');
        $this->compatibility->saveIssues(true);
    }

    public function doUpgrade(string $currentVersion, string $appVersion): void
    {
        if ('' === $currentVersion) {
            $path = plugin_dir_path($this->application->getPluginFile());

            $this->log(__('Creating initial pages', 'cardanopress'));
            (new Templates($path . 'templates'))->createPages();
        } elseif (version_compare($currentVersion, '0.29.0', '<')) {
            $this->updateOldPasswords();
        }
    }

    public function updateOldPasswords()
    {
        $this->log(__('Checking for old user passwords', 'cardanopress'));

        foreach (get_users() as $user) {
            $userProfile = new Profile($user);
            $userId = $userProfile->getData('ID');

            if (! $userProfile->isConnected()) {
                /* translators: %s: ID */
                $this->log(sprintf(__('Skipped user %s', 'cardanopress'), $userId));
                continue;
            }

            $currentPassword = $userProfile->getData('user_pass');
            $stakeAddress = $userProfile->connectedStake();

            if (
                wp_check_password($userProfile->connectedWallet(), $currentPassword) ||
                wp_check_password($stakeAddress, $currentPassword)
            ) {
                wp_set_password(wp_hash_password($stakeAddress), $userId);
                /* translators: %s: ID */
                $this->log(sprintf(__('Updated user %s', 'cardanopress'), $userId));
            } else {
                /* translators: %s: ID */
                $this->log(sprintf(__('Checked user %s', 'cardanopress'), $userId));
            }
        }
    }
}
