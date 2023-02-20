<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Interfaces\ApplicationInterface;
use CardanoPress\Interfaces\HookInterface;
use CardanoPress\Interfaces\InstallerInterface;
use CardanoPress\SharedBase;
use CardanoPress\Traits\Loggable;

abstract class AbstractInstaller extends SharedBase implements InstallerInterface, HookInterface
{
    use Loggable;

    protected ApplicationInterface $application;
    protected string $pluginBaseName;
    protected string $pluginNameAndVersion;

    public const DATA_PREFIX = '';

    public function __construct(ApplicationInterface $application)
    {
        $this->application = $application;
        $this->pluginBaseName = plugin_basename($this->application->getPluginFile());
        $this->pluginNameAndVersion = $application->getData('Name') . ' v' . $application->getData('Version');

        $this->setLogger($application->logger('installer'));
        $this->initialize();
    }

    public function setupHooks(): void
    {
        add_action('activate_' . $this->pluginBaseName, [$this, 'activate']);
        add_action('admin_init', [$this, 'maybeDoUpgrades']);
    }

    public function activate(): void
    {
        if ('yes' === get_transient(static::DATA_PREFIX . 'activating')) {
            $this->log('Is already activating ' . $this->pluginNameAndVersion);

            return;
        }

        $this->log('Activating ' . $this->pluginNameAndVersion);
        set_transient(static::DATA_PREFIX . 'activating', 'yes', MINUTE_IN_SECONDS * 2);
        do_action(static::DATA_PREFIX . 'activating');
        $this->maybeDoUpgrades(true);
        remove_action('admin_init', [$this, 'maybeDoUpgrades']);
        delete_transient(static::DATA_PREFIX . 'activating');
    }

    public function maybeDoUpgrades($isActivating = false): void
    {
        $currentVersion = get_option(static::DATA_PREFIX . 'version', '');
        $appVersion = $this->application->getData('Version');

        if (version_compare($currentVersion, $appVersion, '<')) {
            if (! $isActivating) {
                $this->log('Upgrading ' . $this->pluginNameAndVersion);
            }

            do_action(static::DATA_PREFIX . 'upgrading', $currentVersion, $appVersion);
            update_option(static::DATA_PREFIX . 'version', $appVersion);
        }
    }

    public function noticeNeedingCorePlugin(): void
    {
        if ($this->application->isReady()) {
            return;
        }

        $plugin  = sprintf(
            '<a href="%1$s" target="_blank">core plugin</a>',
            'https://wordpress.org/plugins/cardanopress'
        );
        $message = sprintf(
            '<strong>%1$s</strong> requires the %2$s for its full functionality.',
            $this->application->getData('Name'),
            $plugin
        );

        ?>
        <div class="notice notice-info">
            <p><?php echo wp_kses($message, [
                'a' => [
                    'href' => [],
                    'target' => [],
                ],
                'strong' => [],
            ]); ?></p>
        </div>
        <?php
    }
}
