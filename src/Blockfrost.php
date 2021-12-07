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
        $response = $this->client->request('addresses/' . $key);

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    public function getAccountDetails(string $stake): array
    {
        $response = $this->client->request('accounts/' . $stake);

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    public function getPoolDetails(string $id): array
    {
        $response = $this->client->request('pools/' . $id);

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    public function associatedAssets(string $address, int $page = 1): array
    {
        $response = $this->client->request('accounts/' . $address . '/addresses/assets', compact('page'));

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    public function specificAsset(string $key): array
    {
        $response = $this->client->request('assets/' . $key);

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
        $response = $this->client->request('blocks/latest');

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    private function epochParameters(string $number): array
    {
        $response = $this->client->request('epochs/' . $number . '/parameters');

        return 200 === $response['status_code'] ? $response['data'] : [];
    }
}
