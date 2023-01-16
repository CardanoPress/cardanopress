<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Interfaces\ApplicationInterface;
use CardanoPress\Interfaces\HookInterface;
use CardanoPress\SharedBase;
use Monolog\Logger as MonoLogger;
use ThemePlate\Logger;

abstract class AbstractApplication extends SharedBase implements ApplicationInterface, HookInterface
{
    protected string $pluginFile;
    protected array $data;
    protected Logger $logger;

    public function __construct(string $pluginFile)
    {
        if (! function_exists('get_plugin_data')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        $this->pluginFile = $pluginFile;
        $this->data = get_plugin_data($pluginFile);
        $this->logger = new Logger('cardanopress-logs');

        $this->initialize();
    }

    public function getData(string $key): string
    {
        return $this->data[$key] ?? '';
    }

    public function getPluginFile(): string
    {
        return $this->pluginFile;
    }

    public function logger(string $channel): MonoLogger
    {
        return $this->logger->channel($channel);
    }
}
