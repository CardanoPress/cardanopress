<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use CardanoPress\Interfaces\HookInterface;
use PBWebDev\CardanoPress\Admin;
use PBWebDev\CardanoPress\Blockfrost;

class AdminAction implements HookInterface
{
    public function setupHooks(): void
    {
        add_filter('pre_update_option_' . Admin::OPTION_KEY, [$this, 'savePoolDetails'], 10, 2);
        add_action('themeplate_page_' . Admin::OPTION_KEY . '_load', [$this, 'checkPoolDetails']);
    }


    public function savePoolDetails($newValue, $oldValue)
    {
        if (
            ! empty($newValue['delegation_pool_data']) && ! empty($oldValue['delegation_pool_data']) && (
                $newValue['delegation_pool_id'] === $oldValue['delegation_pool_id'] ||
                empty(array_filter($newValue['blockfrost_project_id']))
            )
        ) {
            return $newValue;
        }

        $newValue['delegation_pool_data'] = $oldValue['delegation_pool_data'] ?? [];

        if (empty($newValue['delegation_pool_id'])) {
            return $newValue;
        }

        $newValue['delegation_pool_data'] = $this->getPoolDetails($newValue['delegation_pool_id']);

        return $newValue;
    }

    public function checkPoolDetails(): void
    {
        $optionsValue = get_option(Admin::OPTION_KEY, []);
        $poolData = $optionsValue['delegation_pool_data'] ?? [];
        $poolIds = $optionsValue['delegation_pool_id'] ?? [];

        if (
            ! empty($poolData) &&
            ! empty($poolIds) &&
            ! empty($optionsValue['blockfrost_project_id']) &&
            count(array_filter($poolData)) === count(array_filter($poolIds))
        ) {
            return;
        }

        $optionsValue['delegation_pool_data'] = $this->getPoolDetails($poolIds);

        update_option(Admin::OPTION_KEY, $optionsValue);
    }

    protected function getPoolDetails(array $poolIds): array
    {
        $poolDetails = [];

        foreach ($poolIds as $network => $poolId) {
            if (! Blockfrost::isReady($network)) {
                continue;
            }

            $blockfrost = new Blockfrost($network);
            $poolDetails[$network] = $blockfrost->getPoolDetails($poolId);

            if (! empty($poolDetails[$network])) {
                $this->addPoolExtended($poolDetails[$network]);
            }
        }

        return $poolDetails;
    }

    protected function addPoolExtended(array &$data): void
    {
        if (empty($data)) {
            return;
        }

        $extended = $this->checkPoolJson($data, 'url');

        if (! empty($extended)) {
            $data['extended'] = $extended;
        }
    }

    protected function checkPoolJson(array $data, string $key): array
    {
        if (empty($data)) {
            return [];
        }

        $url = $data[$key];
        $args = [
            'timeout' => apply_filters('http_request_timeout', MINUTE_IN_SECONDS, $url),
            'sslverify' => apply_filters('https_local_ssl_verify', false),
        ];

        $response = wp_remote_retrieve_body(wp_remote_get($url, $args));

        if ('' === $response) {
            return [];
        }

        $data = json_decode($response, true);

        if (empty($data)) {
            return [];
        }

        return isset($data['extended']) ? $this->checkPoolJson($data, 'extended') : $data;
    }
}
