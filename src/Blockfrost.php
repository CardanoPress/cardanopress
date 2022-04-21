<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use PBWebDev\CardanoPress\Clients\BlockfrostClient;

class Blockfrost
{
    protected BlockfrostClient $client;

    public function __construct(string $query_network)
    {
        $this->client = $this->getClient($query_network);
    }

    public function request(string $endpoint, array $query = []): array
    {
        $response = $this->client->request($endpoint, $query);

        if (200 !== $response['status_code'] || ! empty($response['error'])) {
            Application::logger()->channel('blockfrost')->info($endpoint);
            Application::logger()->channel('blockfrost')->info(print_r($query, true));
            Application::logger()->channel('blockfrost')->info(print_r($response, true));
        }

        return $response;
    }

    public function protocolParameters(): array
    {
        $block = $this->blocksLatest();

        if (empty($block)) {
            return [];
        }

        $parameters = $this->epochParameters($block['epoch']);

        if (empty($parameters)) {
            return [];
        }

        return [
            'linearFee' => [
                'minFeeA' => $parameters['min_fee_a'],
                'minFeeB' => $parameters['min_fee_b'],
            ],
            'minUtxo' => $parameters['min_utxo'],
            'poolDeposit' => $parameters['pool_deposit'],
            'keyDeposit' => $parameters['key_deposit'],
            'coinsPerUtxoWord' => $parameters['coins_per_utxo_word'],
            'maxValSize' => $parameters['max_val_size'],
            'priceMem' => $parameters['price_mem'],
            'priceStep' => $parameters['price_step'],
            'maxTxSize' => $parameters['max_tx_size'],
            'slot' => $block['slot'],
        ];
    }

    public function getAddressDetails(string $key): array
    {
        $response = $this->request('addresses/' . $key);

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    public function getAccountDetails(string $stake): array
    {
        $response = $this->request('accounts/' . $stake);

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    public function getAccountHistory(string $address, int $page = 1): array
    {
        $response = $this->request('accounts/' . $address . '/history', compact('page'));

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    public function getEpochsLatest(): array
    {
        $response = $this->request('epochs/latest');

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    public function getPoolDetails(string $id): array
    {
        $response = $this->request('pools/' . $id . '/metadata');

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    public function associatedAssets(string $address, int $page = 1): array
    {
        $response = $this->request('accounts/' . $address . '/addresses/assets', compact('page'));

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    public function specificAsset(string $key): array
    {
        $response = $this->request('assets/' . $key);

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    private function getClient(string $query_network): BlockfrostClient
    {
        $projectId = $this->getProjectId($query_network);

        return new BlockfrostClient($projectId, $query_network);
    }

    private function getProjectId(string $network): string
    {
        $app = Application::instance();
        $project_ids = $app->option('blockfrost_project_id');

        return $project_ids[$network];
    }

    private function blocksLatest(): array
    {
        $response = $this->request('blocks/latest');

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    private function epochParameters(string $number): array
    {
        $response = $this->request('epochs/' . $number . '/parameters');

        return 200 === $response['status_code'] ? $response['data'] : [];
    }
}
