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
        add_action('admin_footer', [$this, 'dismissNoticeScript']);
        add_action('wp_ajax_cardanopress_dismiss_notice', [$this, 'dismissNoticeAction']);
        add_action('wp_ajax_cardanopress_compatibility_check', [$this, 'compatibilityCheckAction']);
        add_action('after_switch_theme', [$this, 'doActivate']);
        add_action(self::DATA_PREFIX . 'activating', [$this, 'doActivate']);
        add_action(self::DATA_PREFIX . 'upgrading', [$this, 'doUpgrade'], 10, 2);
        add_filter('plugin_action_links_' . $this->pluginBaseName, [$this, 'mergeSettingsLink']);
    }

    public function loaded(): void
    {
        do_action(static::DATA_PREFIX . 'loaded');

        if ('activated' === $this->compatibility->getStatus()) {
            $this->compatibility->run();
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
        if (! $this->shouldNotice('review')) {
            return;
        }

        ?>
        <div class="notice notice-info is-dismissible cardanopress-notice" id="cardanopress_notice_review">
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
        if (! $this->shouldNotice('issues') || 'issue' !== $this->compatibility->getStatus()) {
            return;
        }

        $issues = $this->compatibility->getIssues();

        if (empty($issues)) {
            return;
        }

        ?>
        <div class="notice notice-error is-dismissible cardanopress-notice" id="cardanopress_notice_issues">
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

            <ul style='list-style-type: decimal; padding: 0 1rem;'>
                <?php foreach ($issues as $issue) : ?>
                    <li><?php echo esc_html($this->compatibility->message($issue)); ?></li>
                <?php endforeach; ?>
            </ul>

            <p>
                <button id="cardanopress_compatibility_check">
                    <?php echo __('Re-check issues', 'cardanopress'); ?>
                </button>
                <span class="spinner" style="margin-top: -4px; float: none;"></span>
            </p>

            <script id="cardanopress-compatibility-js" type="text/javascript">
                jQuery(document).on('click', '#cardanopress_compatibility_check', function(e) {
                    e.preventDefault();

                    var $this = jQuery(this);

                    jQuery.ajax({
                        type: 'POST',
                        url: ajaxurl,
                        data: {
                            action: 'cardanopress_compatibility_check'
                        },
                        beforeSend: function() {
                            $this.siblings('.spinner').addClass('is-active');
                        }
                    }).done(function() {
                        location.reload();
                    })
                })
            </script>
        </div>
        <?php
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
                        name: jQuery(this).parent().attr('id'),
                    }
                })
            })
        </script>

        <?php
        echo ob_get_clean();

        wp_cache_set('cardanopress_dismiss_notice', true);
    }

    public function compatibilityCheckAction()
    {
        $this->doActivate();
        $this->log('Checking ' . $this->pluginNameAndVersion);

        wp_die();
    }

    public function dismissNoticeAction()
    {
        $name = sanitize_text_field($_POST['name']);
        $expire = time() + DAY_IN_SECONDS;
        $secure = is_ssl();

        setcookie($name, true, $expire, ADMIN_COOKIE_PATH, COOKIE_DOMAIN, $secure, true);

        $this->application->userProfile()->dismissNotice(str_replace('cardanopress_notice_', '', $name));

        wp_die();
    }

    protected function shouldNotice(string $type): bool
    {
        $screen = get_current_screen();

        if (Admin::OPTION_KEY === $screen->parent_base) {
            return empty($_COOKIE['cardanopress_notice_' . $type]);
        }

        return ! $this->application->userProfile()->isDismissedNotice($type);
    }

    public function doActivate(): void
    {
        if ('after_switch_theme' === current_filter() && ! isset($_GET['activated'])) {
            return;
        }

        $this->compatibility->setStatus('activated');
        $this->compatibility->saveIssues(true);

        if ('after_switch_theme' === current_filter()) {
            $this->log('Theming ' . $this->pluginNameAndVersion);
            $this->compatibility->run();
        }
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
