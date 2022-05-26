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

        ob_start();

        ?>
        <div class="notice notice-info">
            <p>
                <strong>CardanoPress</strong> requires Blockfrost API Token.
                <?php echo $this->getSettingsLink(__('Please set here', 'cardanopress'), '_blank'); ?>
            </p>
        </div>
        <?php

        echo ob_get_clean();
    }

    protected function doUpgrade(string $currentVersion): void
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
