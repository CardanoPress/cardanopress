<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Traits\Instantiable;
use CardanoPress\Traits\Loggable;
use CardanoPress\Dependencies\Psr\Log\LoggerInterface;

class Compatibility
{
    use Instantiable;
    use Loggable;

    /** @var array<string, string> */
    protected array $messages = [];
    /** @var string[] */
    protected array $issues = [];

    public const DATA_PREFIX = 'cardanopress_';

    public function __construct(?LoggerInterface $logger)
    {
        if (null !== $logger) {
            $this->setLogger($logger);
        }

        $this->setInstance($this);
    }

    public function load(): void
    {
        $this->issues = $this->getIssues(true);
        $this->messages = [
            'missed' => __('Unable to complete the compatibility check run.', 'cardanopress'),
            'theme' => __('Incomplete template injections in front-end.', 'cardanopress'),
            'classic' => __('Activated theme does not support the `wp_body_open` hook.', 'cardanopress'),
            'html5' => __('Activated theme does not support HTML5 markup. `script` value required.', 'cardanopress'),
            'sodium' => __('Sodium extension is not loaded. Required in datasignature verification.', 'cardanopress'),
        ];
    }

    public function getStatus(): string
    {
        return get_option(static::DATA_PREFIX . 'status', 'normal');
    }

    public function setStatus(string $state): bool
    {
        return update_option(static::DATA_PREFIX . 'status', $state, false);
    }

    protected function theme(): bool
    {
        if (wp_is_block_theme()) {
            return true;
        }

        $url = add_query_arg(['cardanopress' => time()], home_url());
        $args = [
            'timeout' => apply_filters('http_request_timeout', MINUTE_IN_SECONDS, $url),
            'sslverify' => apply_filters('https_local_ssl_verify', false),
            'cookies' => $_COOKIE,
        ];

        return ! is_wp_error(wp_remote_get($url, $args));
    }

    public function html5(): bool
    {
        $support = get_theme_support('html5');

        return !empty($support) && in_array('script', $support[0], true);
    }

    public function message(string $type): string
    {
        return $this->messages[$type] ?? '';
    }

    public function addIssue(string $type): bool
    {
        if (! in_array($type, array_keys($this->messages), true)) {
            return false;
        }

        $this->issues[] = $type;

        $this->log($this->message($type), 'warning');

        return true;
    }

    public function hasIssue(string $type): bool
    {
        if (! in_array($type, array_keys($this->messages), true)) {
            return false;
        }

        return in_array($type, $this->issues, true);
    }

    /** @return string[] */
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
        $issues = $this->getIssues();

        if ($reset) {
            $issues = [];
            $this->issues = [];
        }

        $this->setStatus(empty($issues) ? 'normal' : 'issue');

        return update_option(static::DATA_PREFIX . 'issues', $issues, false);
    }

    public function run(): void
    {
        $this->setStatus('checking');

        if (! $this->theme()) {
            $this->setStatus('activated');

            return;
        }

        if (! extension_loaded('sodium')) {
            $this->addIssue('sodium');
            $this->saveIssues();
        }
    }
}
