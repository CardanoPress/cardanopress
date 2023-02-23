<?php

/**
 * @package ThemePlate
 */

namespace Tests\Integration;

use PBWebDev\CardanoPress\Actions\Sanitization;
use Tests\LoadDependencies;
use WP_Ajax_UnitTestCase;
use WPAjaxDieContinueException;

class SanitizationTest extends WP_Ajax_UnitTestCase
{
    use LoadDependencies;

    protected Sanitization $sanitization;

    public function setUp(): void
    {
        parent::setUp();
        $this->loadDependencies();

        $this->sanitization = new Sanitization();
    }

    public function for_query_network(): array
    {
        return [
            ['mainnet', true],
            ['testnet', true],
            ['voidnet', false],
        ];
    }

    /** @dataProvider for_query_network */
    public function test_query_network(string $value, bool $is_known): void
    {
        $this->do_actual_test('query_network', $value, $is_known);
    }

    public function for_wallet_address(): array
    {
        // phpcs:disable Generic.Files.LineLength.TooLong
        return [
            ['addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgse35a3x', true],
            ['addr_test1qz2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3n0d3vllmyqwsx5wktcd8cc3sq835lu7drv2xwl2wywfgs68faae', true],
            ['invalidwallet', false],
        ];
        // phpcs:enable Generic.Files.LineLength.TooLong
    }

    /** @dataProvider for_wallet_address */
    public function test_wallet_address(string $value, bool $is_known): void
    {
        $this->do_actual_test('wallet_address', $value, $is_known);
    }

    public function for_stake_address(): array
    {
        return [
            ['stake1uyehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gh6ffgw', true],
            ['stake_test1uqehkck0lajq8gr28t9uxnuvgcqrc6070x3k9r8048z8y5gssrtvn', true],
            ['invalidstake', false],
        ];
    }

    /** @dataProvider for_stake_address */
    public function test_stake_address(string $value, bool $is_known): void
    {
        $this->do_actual_test('stake_address', $value, $is_known);
    }

    /** @dataProvider for_stake_address */
    public function test_reward_address(string $value, bool $is_known): void
    {
        $this->do_actual_test('reward_address', $value, $is_known);
    }

    public function for_pool_id(): array
    {
        return [
            ['pool1vev8z03vh7jwx3mfrgzrt9fltt97nupaxv8ffj4r5r8mgwts5ze', true],
            ['invalidpool', false],
        ];
    }

    /** @dataProvider for_pool_id */
    public function test_pool_id(string $value, bool $is_known): void
    {
        $this->do_actual_test('pool_id', $value, $is_known);
    }

    public function for_transaction_action(): array
    {
        return [
            ['payment', true],
            ['delegation', true],
            ['invalidaction', false],
        ];
    }

    /** @dataProvider for_transaction_action */
    public function test_transaction_action(string $value, bool $is_known): void
    {
        $this->do_actual_test('transaction_action', $value, $is_known);
    }

    public function for_transaction_hash(): array
    {
        return [
            ['40ce33d3ec8811af61a5975c1da057cfde65a7609a3ea5c7561e066a838ccf8a', true],
            ['69f01e8bd839a0d8c32697cb9c60e3525372d799e2941a169a0e2ba33bbc1a76', true],
            ['invalidhash', false],
        ];
    }

    /** @dataProvider for_transaction_hash */
    public function test_transaction_hash(string $value, bool $is_known): void
    {
        $this->do_actual_test('transaction_hash', $value, $is_known);
    }

    public function for_ada_handle(): array
    {
        return [
            ['$adahandle', true],
            ['$custom_name', true],
            ['', false],
        ];
    }

    /** @dataProvider for_ada_handle */
    public function test_ada_handle(string $value, bool $is_known): void
    {
        $this->do_actual_test('ada_handle', $value, $is_known);
    }

    protected function do_actual_test(string $method, string $value, bool $is_known): void
    {
        $_POST[$method] = $value;

        if ($is_known) {
            $this->assertSame($value, $this->sanitization->sanitizePost($method));
        } else {
            add_action('wp_ajax_test', function () use ($method) {
                $this->sanitization->sanitizePost($method);
            });

            try {
                $this->_handleAjax('test');
            } catch (WPAjaxDieContinueException $exception) {
            }

            $output = json_decode($this->_last_response, true);

            $this->assertSame(['success' => false, 'data' => $this->sanitization->getMessage($method)], $output);
        }

        $actual = $this->sanitization->$method($value);
        $expected = $is_known ? $value : '';

        $this->assertSame($expected, $actual);
    }

    public function test_customized_messages(): void
    {
        $expected = 'I am custom invalid message';

        add_filter('cardanopress_sanitization_messages', function ($messages) use ($expected) {
            $messages['query_network'] = $expected;
            $messages['ada_handle'] = $expected;

            return $messages;
        });

        $this->assertSame($expected, $this->sanitization->getMessage('query_network'));
        $this->assertSame($expected, $this->sanitization->getMessage('ada_handle'));
    }
}
