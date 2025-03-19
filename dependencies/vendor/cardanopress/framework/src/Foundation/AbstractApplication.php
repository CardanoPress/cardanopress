<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Dependencies\Psr\Log\LoggerInterface;
use CardanoPress\Dependencies\ThemePlate\Logger;
use CardanoPress\Interfaces\ApplicationInterface;
use CardanoPress\Interfaces\HookInterface;
use CardanoPress\SharedBase;

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
        $this->data = get_plugin_data($pluginFile, false, false);
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

    public function logger(string $channel): LoggerInterface
    {
        if (! function_exists('wp_hash')) {
            require_once ABSPATH . 'wp-includes/pluggable.php';
        }

        $salt = wp_salt('secure_auth');
        $data = $channel . '_' . gmdate('Y-m-d');
        $name = hash_hmac('sha256', $data, $salt);

        return $this->logger->channel($name);
    }
}
