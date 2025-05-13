<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Clients\BlockfrostClient;
use CardanoPress\Dependencies\Psr\Log\LoggerInterface;
use CardanoPress\Foundation\AbstractBlockfrost;

/**
 * @phpstan-type BlocksLatest array{
 *     time: int,
 *     height: int,
 *     hash: string,
 *     slot: int,
 *     epoch: int,
 *     epoch_slot: int,
 *     slot_leader: string,
 *     size: int,
 *     tx_count: int,
 *     output: string,
 *     fees: string,
 *     block_vrf: string,
 *     op_cert: string,
 *     op_cert_counter: string,
 *     previous_block: string,
 *     next_block: string,
 *     confirmations: int,
 * }
 *
 * @phpstan-type EpochParameters array{
 *     epoch: int,
 *     min_fee_a: int,
 *     min_fee_b: int,
 *     min_utxo: string,
 *     pool_deposit: string,
 *     key_deposit: string,
 *     max_val_size: int,
 *     max_tx_size: int,
 *     coins_per_utxo_size: string,
 *     price_mem: int,
 *     price_step: int,
 *     collateral_percent: int,
 *     max_collateral_inputs: int,
 * }
 *
 * @phpstan-type ProtocolParameters array{
 *     minFeeA: int,
 *     minFeeB: int,
 *     minUtxo: string,
 *     poolDeposit: string,
 *     keyDeposit: string,
 *     maxValSize: int,
 *     maxTxSize: int,
 *     coinsPerUtxoSize: string,
 *     priceMem: int,
 *     priceStep: int,
 *     collateralPercentage: int,
 *     maxCollateralInputs: int,
 *     slot: int,
 * }
 *
 * @phpstan-type AddressDetails array{
 *     address: string,
 *     amount: array{unit: string, quantity: string}[],
 *     stake_address: string,
 *     type: string,
 *     script: bool,
 * }
 *
 * @phpstan-type AccountDetails array{
 *     stake_address: string,
 *     active: bool,
 *     active_epoch: int,
 *     controlled_amount: string,
 *     rewards_sum: string,
 *     withdrawals_sum: string,
 *     reserves_sum: string,
 *     treasury_sum: string,
 *     withdrawable_amount: string,
 *     pool_id: string,
 *     drep_id: string,
 * }
 *
 * @phpstan-type AccountHistory array{
 *     active_epoch: int,
 *     amount: string,
 *     pool_id: string,
 * }
 *
 * @phpstan-type EpochsLatest array{
 *     epoch: int,
 *     start_time: int,
 *     end_time: int,
 *     first_block_time: int,
 *     last_block_time: int,
 *     block_count: int,
 *     tx_count: int,
 *     output: string,
 *     fees: string,
 *     active_stake: string,
 * }
 *
 * @phpstan-type PoolInfo array{
 *     pool_id: string,
 *     hex: string,
 *     vrf_key: string,
 *     blocks_minted: int,
 *     blocks_epoch: int,
 *     live_stake: int,
 *     live_size: float,
 *     live_saturation: float,
 *     live_delegators: int,
 *     active_stake: int,
 *     active_size: float,
 *     declared_pledge: int,
 *     live_pledge: int,
 *     margin_cost: float,
 *     fixed_cost: int,
 *     reward_account: string,
 *     owners: string[],
 *     registration: string[],
 *     retirement: string[],
 * }
 *
 * @phpstan-type PoolDetails array{
 *     pool_id: string,
 *     hex: string,
 *     url: string,
 *     hash: string,
 *     ticker: string,
 *     name: string,
 *     description: string,
 *     homepage: string,
 * }
 *
 * @phpstan-type AssetMetadata array{
 *     name: string,
 *     description: string,
 *     ticker: string,
 *     url: string,
 *     logo: string,
 *     decimals: int,
 * }
 *
 * @phpstan-type Asset array{
 *     asset: string,
 *     policy_id: string,
 *     asset_name: string,
 *     fingerprint: string,
 *     quantity: string,
 *     onchain_metadata: array<string, mixed>,
 *     metadata: AssetMetadata,
 * }
 */
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

    /** @return BlocksLatest|array{} */
    public function blocksLatest(): array
    {
        $response = $this->request('blocks/latest');

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    /** @return EpochParameters|array{} */
    public function epochParameters(string $number): array
    {
        $response = $this->request('epochs/' . $number . '/parameters');

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    /** @return ProtocolParameters|array{} */
    public function protocolParameters(): array
    {
        $block = $this->blocksLatest();

        if (empty($block)) {
            return [];
        }

        $parameters = $this->epochParameters((string) $block['epoch']);

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

    /** @return AddressDetails|array{} */
    public function getAddressDetails(string $key): array
    {
        $response = $this->request('addresses/' . $key);

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    /** @return AccountDetails|array{} */
    public function getAccountDetails(string $stake): array
    {
        $response = $this->request('accounts/' . $stake);

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    /** @return AccountHistory[]|array{} */
    public function getAccountHistory(string $address, int $page = 1, string $order = 'asc'): array
    {
        $response = $this->request('accounts/' . $address . '/history', compact('page', 'order'));

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    /** @return EpochsLatest|array{} */
    public function getEpochsLatest(): array
    {
        $response = $this->request('epochs/latest');

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    /** @return PoolInfo|array{} */
    public function getPoolInfo(string $id): array
    {
        $response = $this->request('pools/' . $id);

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    /** @return PoolDetails|array{} */
    public function getPoolDetails(string $id): array
    {
        $response = $this->request('pools/' . $id . '/metadata');

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    /** @return array{unit: string, quantity: string}[]|array{} */
    public function associatedAssets(string $address, int $page = 1): array
    {
        $response = $this->request('accounts/' . $address . '/addresses/assets', compact('page'));

        return 200 === $response['status_code'] ? $response['data'] : [];
    }

    /** @return Asset|array{} */
    public function specificAsset(string $key): array
    {
        $response = $this->request('assets/' . $key);

        return 200 === $response['status_code'] ? $response['data'] : [];
    }
}
