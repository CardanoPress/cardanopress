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

    public function protectLogs(): void
    {
        global $wp_filesystem;
        WP_Filesystem();

        if ($wp_filesystem) {
            $logDir = $wp_filesystem->wp_content_dir() . 'cardanopress-logs';

            if (! $wp_filesystem->exists($logDir)) {
                $wp_filesystem->mkdir($logDir);
            }

            if (! $wp_filesystem->exists($logDir . '/.htaccess')) {
                $wp_filesystem->put_contents($logDir . '/.htaccess', 'deny from all');
            }

            if (! $wp_filesystem->exists($logDir . '/index.php')) {
                $wp_filesystem->copy(__DIR__ . '/index.php', $logDir . '/index.php');
            }
        }
    }

    public function activate(): void
    {
        $this->protectLogs();

        if ('yes' === get_transient(static::DATA_PREFIX . 'activating')) {
            $this->log(
                sprintf(
                    /* translators: %s: plugin name and version */
                    __('Is already activating %s', 'cardanopress'),
                    $this->pluginNameAndVersion
                )
            );

            return;
        }

        $this->log(
            sprintf(
                /* translators: %s: plugin name and version */
                __('Activating %s', 'cardanopress'),
                $this->pluginNameAndVersion
            )
        );
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
            update_option(static::DATA_PREFIX . 'version', $appVersion, false);
        }
    }

    public function noticeNeedingCorePlugin(): void
    {
        if ($this->application->isReady()) {
            return;
        }

        $plugin  = sprintf(
            '<a href="%1$s" target="_blank">%2$s</a>',
            'https://wordpress.org/plugins/cardanopress',
            __('core plugin', 'cardanopress')
        );
        $message = sprintf(
            __('%1$s requires the %2$s for its full functionality.', 'cardanopress'),
            '<strong>' . $this->application->getData('Name') . '</strong>',
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
