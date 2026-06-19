<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

use CardanoPress\Interfaces\HookInterface;
use CardanoPress\Helpers\HttpHelper;
use PBWebDev\CardanoPress\Admin;
use PBWebDev\CardanoPress\Blockfrost;

class AdminAction implements HookInterface
{
    public function setupHooks(): void
    {
        add_filter('pre_update_option_' . Admin::OPTION_KEY, [$this, 'savePoolDetails'], 10, 2);
        add_action('themeplate_page_' . Admin::OPTION_KEY . '_load', [$this, 'checkPoolDetails']);
    }


    /**
     * @param mixed $newValue
     * @param mixed $oldValue
     * @return mixed
     */
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

    /**
     * @param array<string, string> $poolIds
     * @return array<string, array<string, mixed>>
     */
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

    /** @param array<string, mixed> $data */
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

    /**
     * @param array<string, mixed> $data
     * @return array<string, mixed>
     */
    protected function checkPoolJson(array $data, string $key, int $depth = 0): array
    {
        // Pool metadata URLs are attacker-influenced (on-chain). Bound the
        // recursive `extended` follow to avoid loops/abuse.
        if (empty($data) || $depth > 2) {
            return [];
        }

        $url = $data[$key];

        // Guard against SSRF: reject non-string, non-http(s), and internal/
        // loopback/link-local hosts before issuing the server-side request.
        if (! is_string($url) || ! wp_http_validate_url($url)) {
            return [];
        }

        $args = HttpHelper::getRequestArgs($url);

        $response = wp_remote_retrieve_body(wp_remote_get($url, $args));

        if ('' === $response) {
            return [];
        }

        $data = json_decode($response, true);

        if (empty($data)) {
            return [];
        }

        if (isset($data['extended'])) {
            return $this->checkPoolJson($data, 'extended', $depth + 1);
        }

        return $data;
    }
}
