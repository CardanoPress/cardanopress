<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Traits\Instantiable;
use CardanoPress\Traits\Loggable;
use Psr\Log\LoggerInterface;

class Compatibility
{
    use Instantiable;
    use Loggable;

    protected array $issues = [];

    public const DATA_PREFIX = 'cardanopress_';

    public function __construct(LoggerInterface $logger)
    {
        $this->issues = $this->getIssues(true);

        $this->setLogger($logger);
        $this->setInstance($this);
    }

    public function getStatus()
    {
        return get_option(static::DATA_PREFIX . 'status', 'normal');
    }

    public function setStatus(string $state): bool
    {
        return update_option(static::DATA_PREFIX . 'status', $state, false);
    }

    public function theme(): bool
    {
        $url = home_url();
        $args = [
            'timeout' => apply_filters('http_request_timeout', MINUTE_IN_SECONDS, $url),
            'sslverify' => apply_filters('https_local_ssl_verify', false)
        ];

        return !is_wp_error(wp_remote_get($url, $args));
    }

    public function server(): bool
    {
        $url = plugin_dir_url(Application::getInstance()->getPluginFile());
        $args = [
            'timeout' => apply_filters('http_request_timeout', MINUTE_IN_SECONDS, $url),
            'sslverify' => apply_filters('https_local_ssl_verify', false)
        ];

        $response = wp_remote_head($url . 'src/test.wasm', $args);

        if (is_wp_error($response)) {
            return $this->server();
        }

        return ('application/wasm' === wp_remote_retrieve_header($response, 'content-type'));
    }

    public function message(string $type): string
    {
        $messages = [
            'server' => __('WebAssembly MIME type is not supported by the server.', 'cardanopress'),
            'theme' => __('Incomplete template injections in front-end.', 'cardanopress'),
            'classic' => __('Activated theme does not support the `wp_body_open` hook.', 'cardanopress'),
            'block' => __('Block theme rendered fallback templates from `theme-compat`.', 'cardanopress'),
        ];

        if (in_array($type, $messages, true)) {
            return $type;
        }

        return $messages[$type] ?? '';
    }

    public function addIssue(string $type): void
    {
        $this->issues[] = $this->message($type);
    }

    public function getIssues(bool $in_cache = false): array
    {
        if ($in_cache) {
            wp_cache_delete(static::DATA_PREFIX . 'issues', 'options');

            return get_option(static::DATA_PREFIX . 'issues', []);
        }

        return array_unique($this->issues);
    }

    public function saveIssues(bool $reset = false): bool
    {
        $issues = $reset ? [] : $this->getIssues();

        return update_option(static::DATA_PREFIX . 'issues', $issues, false);
    }

    public function dump(string $message, string $level = 'warning'): void
    {
        $this->log($message, $level);
    }
}
