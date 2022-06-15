<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Foundation\AbstractBlockfrost;

class Blockfrost extends AbstractBlockfrost
{
    protected function initialize(): void
    {
        $this->setLogger(Application::getInstance()->logger('blockfrost'));
    }

    public function blocksLatest(): array
    {
        $response = $this->request('blocks/latest');

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    public function epochParameters(string $number): array
    {
        $response = $this->request('epochs/' . $number . '/parameters');

        return 200 === $response['status_code'] ? $response['data'] : [];
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
            'minFeeA' => $parameters['min_fee_a'],
            'minFeeB' => $parameters['min_fee_b'],
            'minUtxo' => $parameters['min_utxo'],
            'poolDeposit' => $parameters['pool_deposit'],
            'keyDeposit' => $parameters['key_deposit'],
            'maxValSize' => $parameters['max_val_size'],
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

    public function getPoolInfo(string $id): array
    {
        $response = $this->request('pools/' . $id);

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

    public static function getProjectId(string $network): string
    {
        $project_ids = Application::getInstance()->option('blockfrost_project_id');

        return $project_ids[$network] ?? '';
    }

    public static function isReady(string $network): bool
    {
        return '' !== self::getProjectId($network);
    }
}
