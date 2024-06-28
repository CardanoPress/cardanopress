<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Clients\BlockfrostClient;
use CardanoPress\Dependencies\Psr\Log\LoggerInterface;
use CardanoPress\Foundation\AbstractBlockfrost;

class Blockfrost extends AbstractBlockfrost
{
    protected static array $projectIds = array(
        'mainnet' => '',
        'testnet' => '',
    );

    protected function initialize(): void
    {
        do_action('cardanopress_blockfrost_init', $this);

        if (isset($this->logger)) {
            return;
        }

        $this->setLogger(Application::getInstance()->logger('blockfrost'));
    }

    public function useLogger(LoggerInterface $logger): void
    {
        $this->logger = $logger;
    }

    public static function useProjectIds(string $mainnet, string $testnet): void
    {
        self::$projectIds['mainnet'] = $mainnet;
        self::$projectIds['testnet'] = $testnet;
    }

    public static function getProjectId(string $network): string
    {
        return self::$projectIds[$network] ?? '';
    }

    public static function isReady(string $network): bool
    {
        return '' !== self::getProjectId($network);
    }

    public function setClient(BlockfrostClient $client): void
    {
        $this->client = $client;
    }

    public function getClient(): BlockfrostClient
    {
        return $this->client;
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
            'coinsPerUtxoSize' => $parameters['coins_per_utxo_size'],
            'priceMem' => $parameters['price_mem'],
            'priceStep' => $parameters['price_step'],
            'collateralPercentage' => $parameters['collateral_percent'],
            'maxCollateralInputs' => $parameters['max_collateral_inputs'],
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

    public function getAccountHistory(string $address, int $page = 1, string $order = 'asc'): array
    {
        $response = $this->request('accounts/' . $address . '/history', compact('page', 'order'));

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
}
