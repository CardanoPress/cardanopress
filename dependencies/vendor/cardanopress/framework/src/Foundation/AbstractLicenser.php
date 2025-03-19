<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Interfaces\ApplicationInterface;
use CardanoPress\Interfaces\HookInterface;
use CardanoPress\SharedBase;
use CardanoPress\Traits\Loggable;

abstract class AbstractLicenser extends SharedBase implements HookInterface
{
    use Loggable;

    protected ApplicationInterface $application;
    protected string $eumHookPrefix;

    public const ITEM_ID = 0;
    public const API_HOST = 'https://cardanopress.io';
    public const ACTION_PREFIX =  '';

    public function __construct(ApplicationInterface $application)
    {
        $this->application = $application;
        $this->eumHookPrefix = 'eum_plugin_' . basename(dirname($this->application->getPluginFile())) . '_';

        $this->setLogger($application->logger('licenser'));
        $this->initialize();
    }

    public function setupHooks(): void
    {
        add_filter($this->eumHookPrefix . 'api_update_url', [$this, 'updateUrl']);
        add_action('wp_ajax_' . static::ACTION_PREFIX . '_license', [$this, 'handleAction']);
    }

    public function updateUrl(): string
    {
        $savedLicenseKey = '';

        if (method_exists($this->application, 'option')) {
            $savedLicenseKey = $this->application->option('license_key');
        }

        return add_query_arg(
            [
                'edd_action' => 'get_version',
                'license' => $savedLicenseKey,
                'item_id' => static::ITEM_ID,
            ],
            static::API_HOST
        );
    }

    protected function callApi(bool $sslVerify = true, int $timeout = 15): array
    {
        $response = wp_remote_post(
            static::API_HOST,
            [
                'sslverify' => $sslVerify,
                'timeout'   => $timeout,
                'body'      => [
                    'edd_action' => sanitize_key($_POST['type']),
                    'license'    => sanitize_key($_POST['license']),
                    'item_id'    => static::ITEM_ID,
                    'url'        => home_url(),
                ],
            ]
        );

        return [
            'raw' => $response,
            'error' => is_wp_error($response),
            'code' => wp_remote_retrieve_response_code($response),
            'body' => wp_remote_retrieve_body($response),
        ];
    }

    public function handleAction(): void
    {
        check_ajax_referer(static::ACTION_PREFIX . '_license');

        $data = $this->callApi();
        $response = ['license' => 'invalid'];
        $message = __('Something went wrong, please try again.', 'cardanopress');

        if ($data['error'] || 200 !== $data['code']) {
            if (is_wp_error($data['error'])) {
                $message = $data['raw']->get_error_message();
            } else {
                $message = __('An error occurred, please try again.', 'cardanopress');
            }
        } else {
            $response = json_decode($data['body'], true);

            if (isset($response['error'])) {
                $message = $this->getErrorMessage($response);
            } else {
                switch ($response['license']) {
                    case 'valid':
                        $message = __('Valid license.', 'cardanopress');
                        break;

                    case 'failed':
                        $message = __('Unknown license.', 'cardanopress');
                        break;

                    case 'deactivated':
                        $message = __('Successful.', 'cardanopress');
                }
            }
        }

        wp_send_json_success(compact('message', 'response'));
    }

    protected function getErrorMessage(array $response): string
    {
        switch ($response['error']) {
            case 'expired':
                $message = sprintf(
                /* translators: the license key expiration date */
                    __('Your license key expired on %s.', 'cardanopress'),
                    date_i18n(
                        get_option('date_format'),
                        strtotime($response['expires'], current_time('timestamp'))
                    )
                );
                break;

            case 'disabled':
            case 'revoked':
                $message = __('Your license key has been disabled.', 'cardanopress');
                break;

            case 'missing':
                $message = __('Invalid license key provided.', 'cardanopress');
                break;

            case 'invalid':
            case 'site_inactive':
                $message = __('Your license key is not active for this URL.', 'cardanopress');
                break;

            case 'key_mismatch':
            case 'item_name_mismatch':
                $message = sprintf(
                /* translators: the plugin name */
                    __('Invalid license key for %s.', 'cardanopress'),
                    $this->application->getData('Name')
                );
                break;

            case 'no_activations_left':
                $message = __('Your license key has reached its activation limit.', 'cardanopress');
                break;

            // missing_url
            // license_not_activable
            // invalid_item_id
            default:
                $message = __('An error occurred, please try again.', 'cardanopress');
                break;
        }

        return $message;
    }
}
