<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Dependencies\ThemePlate\Logger;
use CardanoPress\Interfaces\ApplicationInterface;
use CardanoPress\Interfaces\HookInterface;
use CardanoPress\SharedBase;
use Psr\Log\LoggerInterface;

abstract class AbstractApplication extends SharedBase implements ApplicationInterface, HookInterface
{
    protected string $pluginFile;
    protected array $data;
    protected Logger $logger;

    public const LOG_DIR = 'cardanopress-logs';

    public function __construct(string $pluginFile)
    {
        if (! function_exists('get_plugin_data')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        $this->pluginFile = $pluginFile;
        $this->data = get_plugin_data($pluginFile);
        $this->logger = new Logger(self::LOG_DIR);

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

    public function logger(string $channel): LoggerInterface
    {
        if (! function_exists('wp_hash')) {
            require_once ABSPATH . 'wp-includes/pluggable.php';
        }

        $suffix = wp_hash($channel . '_' . gmdate('Y-m-d'));
        $suffix = substr($suffix, 0, 6) . substr($suffix, -6);

        return $this->logger->channel($channel . '-' . $suffix);
    }
}
