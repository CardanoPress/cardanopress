<?php

/**
 * @package ThemePlate
 */

namespace Tests;

use Brain\Monkey;
use PHPUnit\Framework\TestCase;
use ThemePlate\Enqueue\Dynamic;
use function Brain\Monkey\Functions\expect;

class DynamicTest extends TestCase {
	protected function setUp(): void {
		parent::setUp();
		Monkey\setUp();
	}

	protected function tearDown(): void {
		Monkey\tearDown();
		parent::tearDown();
	}

	public function for_script_and_style_fires_wanted_functions(): array {
		return array(
			'with only handle passed to methods'     => array( array() ),
			'with custom metadata passed to methods' => array( array( 'try' => 'this' ) ),
		);
	}

	/**
	 * @dataProvider for_script_and_style_fires_wanted_functions
	 */
	public function test_script_and_style_fires_wanted_functions( array $with_data ): void {
		expect( 'wp_enqueue_script' )->withAnyArgs()->once();
		expect( 'wp_enqueue_style' )->withAnyArgs()->once();

		if ( $with_data ) {
			expect( 'wp_script_add_data' )->withAnyArgs()->once();
			expect( 'wp_style_add_data' )->withAnyArgs()->once();
		}

		$dynamic = new Dynamic();

		if ( $with_data ) {
			$dynamic->script( 'test', 'script', $with_data );
			$dynamic->style( 'test', 'style', $with_data );
		} else {
			$dynamic->script( 'test' );
			$dynamic->style( 'test' );
		}

		$dynamic->action();
		$this->assertTrue( true );
	}
}
