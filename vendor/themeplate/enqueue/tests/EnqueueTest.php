<?php

/**
 * @package ThemePlate
 */

namespace Tests;

use Brain\Monkey;
use ThemePlate\Enqueue;
use PHPUnit\Framework\TestCase;
use function Brain\Monkey\Actions\expectAdded;
use function Brain\Monkey\Functions\expect;
use function Brain\Monkey\Functions\stubEscapeFunctions;

class EnqueueTest extends TestCase {
	protected function setUp(): void {
		parent::setUp();
		Monkey\setUp();
	}

	protected function tearDown(): void {
		Monkey\tearDown();
		parent::tearDown();
	}

	public function test_firing_init_actually_add_hooks(): void {
		expectAdded( 'wp_enqueue_scripts' )->twice();
		Enqueue::init();

		$this->assertSame(
			PHP_INT_MAX,
			has_action( 'wp_enqueue_scripts', 'ThemePlate\Enqueue\CustomData->action()' )
		);
		$this->assertSame( 10, has_action( 'wp_enqueue_scripts', 'ThemePlate\Enqueue\Dynamic->action()' ) );
	}

	public function for_old_method_asset_triggers_an_error_on_unwanted_type(): array {
		return array(
			'with unknown type passed'   => array( 'try' ),
			'with incorrect type passed' => array( 'StYlE' ),
		);
	}

	/**
	 * @dataProvider for_old_method_asset_triggers_an_error_on_unwanted_type
	 */
	public function test_old_method_asset_triggers_an_error_on_unwanted_type( string $type ): void {
		stubEscapeFunctions();
		expect( '_doing_it_wrong' )->withAnyArgs()->once();

		Enqueue::asset( $type, 'test' );
		$this->assertTrue( true );
	}

	public function test_old_method_asset_is_firing_deprecated_function(): void {
		stubEscapeFunctions();
		expect( '_deprecated_function' )->withAnyArgs()->twice();

		Enqueue::asset( 'script', 'test' );
		Enqueue::asset( 'style', 'test' );
		$this->assertTrue( true );
	}
}
