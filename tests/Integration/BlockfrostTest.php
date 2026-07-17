<?php

/**
 * @package ThemePlate
 */

namespace Tests\Integration;

use CardanoPress\Clients\BlockfrostClient;
use CardanoPress\Dependencies\GuzzleHttp\Handler\MockHandler;
use CardanoPress\Dependencies\GuzzleHttp\HandlerStack;
use CardanoPress\Dependencies\GuzzleHttp\Middleware;
use CardanoPress\Dependencies\GuzzleHttp\Psr7\Response;
use CardanoPress\Dependencies\Monolog\Logger;
use Tests\LoadDependencies;
use PBWebDev\CardanoPress\Blockfrost;
use PHPUnit\Framework\TestCase;

class BlockfrostTest extends TestCase
{
    use LoadDependencies;

    protected Blockfrost $blockfrost;

    protected function setUp(): void
    {
        parent::setUp();
        $this->loadDependencies();

        $this->blockfrost = new Blockfrost('testnet', new Logger('blockfrost'));
    }

    /** @param array<int, Response> $responses */
    protected function mockResponses(array $responses): void
    {
        $mock = new MockHandler($responses);
        $handler = HandlerStack::create($mock);
        $client = new BlockfrostClient('tester', $handler);

        $this->blockfrost->setClient($client);
    }

    /** @param array<string, mixed> $body */
    protected function createResponse(int $status, array $body = []): Response
    {
        return new Response($status, [], (string) json_encode($body));
    }

    /** @return array<int, array<string, mixed>> */
    protected function captureRequests(string $method, string $input): array
    {
        $container = [];
        $history = Middleware::history($container);
        $mock = new MockHandler([
            $this->createResponse(200),
            $this->createResponse(200),
            $this->createResponse(200),
            $this->createResponse(200),
        ]);
        $handler = HandlerStack::create($mock);
        $handler->push($history);

        $this->blockfrost->setClient(new BlockfrostClient('tester', $handler));
        $this->blockfrost->$method($input);

        return is_array($container) ? $container : [];
    }

    /** @return array<string, array{string, string, string}> */
    public function for_path_encoding(): array
    {
        return [
            'getAddressDetails' => [
                'getAddressDetails', 'addr1test/../../secret', 'addresses/addr1test%2F..%2F..%2Fsecret',
            ],
            'getAccountDetails' => [
                'getAccountDetails', 'stake1test/../../secret', 'accounts/stake1test%2F..%2F..%2Fsecret',
            ],
            'getPoolInfo' => ['getPoolInfo', 'pool1test?q=1', 'pools/pool1test%3Fq%3D1'],
            'specificAsset' => ['specificAsset', 'asset#frag', 'assets/asset%23frag'],
        ];
    }

    /** @dataProvider for_path_encoding */
    public function test_path_encoding(string $method, string $input, string $expectedSubstring): void
    {
        $container = $this->captureRequests($method, $input);

        $this->assertNotEmpty($container);
        $uri = (string) $container[0]['request']->getUri();
        $this->assertStringContainsString($expectedSubstring, $uri);
    }

    public function test_clean_bech32_not_double_encoded(): void
    {
        $clean = 'stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw';
        $container = $this->captureRequests('getAccountDetails', $clean);

        $uri = (string) $container[0]['request']->getUri();
        $this->assertStringContainsString('accounts/' . $clean, $uri);
        $this->assertStringNotContainsString('%', $uri);
    }

    public function test_successful_protocol_parameters(): void
    {
        $expected = [
            'minFeeA' => 44,
            'minFeeB' => 155381,
            'minUtxo' => 1000000,
            'poolDeposit' => 500000000,
            'keyDeposit' => 2000000,
            'maxValSize' => 5000,
            'maxTxSize' => 16384,
            'coinsPerUtxoSize' => 34482,
            'priceMem' => 0.0577,
            'priceStep' => 0.0000721,
            'collateralPercentage' => 150,
            'maxCollateralInputs' => 3,
            'slot' => 412162133,
        ];

        $this->mockResponses([
            $this->createResponse(200, [
                'epoch' => 425,
                'slot' => $expected['slot'],
            ]),
            $this->createResponse(200, [
                'min_fee_a' => $expected['minFeeA'],
                'min_fee_b' => $expected['minFeeB'],
                'min_utxo' => $expected['minUtxo'],
                'pool_deposit' => $expected['poolDeposit'],
                'key_deposit' => $expected['keyDeposit'],
                'max_val_size' => $expected['maxValSize'],
                'max_tx_size' => $expected['maxTxSize'],
                'coins_per_utxo_size' => $expected['coinsPerUtxoSize'],
                'price_mem' => $expected['priceMem'],
                'price_step' => $expected['priceStep'],
                'collateral_percent' => $expected['collateralPercentage'],
                'max_collateral_inputs' => $expected['maxCollateralInputs'],
            ]),
        ]);

        $response = $this->blockfrost->protocolParameters();

        $this->assertSame($expected, $response);
    }

    public function test_failed_protocol_parameters(): void
    {
        $expected = [
            'status_code' => 400,
            'data' => [],
            'error' => [
                'error' => 'Bad Request',
                'message' => 'Backend did not understand your request.',
            ],
        ];

        $this->mockResponses([
            $this->createResponse($expected['status_code'], $expected['error']),
        ]);

        $response = $this->blockfrost->protocolParameters();
        $actual = $this->blockfrost->getResponse();

        $this->assertSame([], $response);
        $this->assertSame($expected['status_code'], $actual['status_code']);
        $this->assertSame($expected['data'], $actual['data']);
        $this->assertSame($expected['error'], $actual['error']);
    }
}
