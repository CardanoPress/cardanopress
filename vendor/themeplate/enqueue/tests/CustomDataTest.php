<?php

/**
 * @package ThemePlate
 */

namespace Tests;

use Brain\Monkey;
use PHPUnit\Framework\TestCase;
use ThemePlate\Enqueue\CustomData;
use ThemePlate\Tester\Utils;
use function Brain\Monkey\Functions\stubEscapeFunctions;

class CustomDataTest extends TestCase {
	// phpcs:disable WordPress.WP.EnqueuedResources
	public const SCRIPT_TAG = "<script src='script-src' id='script-js'></script>\n";
	public const STYLE_TAG  = "<link rel='stylesheet' id='style-css' href='style-href' media='all' />\n";

	protected function setUp(): void {
		parent::setUp();
		Monkey\setUp();
	}

	protected function tearDown(): void {
		Monkey\tearDown();
		parent::tearDown();
	}

	public function for_stringify_data_correctly(): array {
		return array(
			'without passing any custom data'    => array(
				'test',
				array(),
				'',
			),
			'with string key and value'          => array(
				'test',
				array( 'try' => 'this' ),
				" try='this'",
			),
			'with string key and "true" value'   => array(
				'test',
				array( 'try' => true ),
				' try',
			),
			'with string key and "false" value'  => array(
				'test',
				array( 'try' => false ),
				'',
			),
			'with string key and "0" value'      => array(
				'test',
				array( 'try' => 0 ),
				'',
			),
			'with string key and null value'     => array(
				'test',
				array( 'try' => null ),
				'',
			),
			'with string key and empty string'   => array(
				'test',
				array( 'try' => '' ),
				'',
			),
			'with string key and empty array'    => array(
				'test',
				array( 'try' => array() ),
				'',
			),
			'with string key and integer value'  => array(
				'test',
				array( 'try' => 1 ),
				" try='1'",
			),
			'with string key and array value'    => array(
				'test',
				array( 'me' => array( 'need', 'want' ) ),
				" me='need'",
			),
			'with string key and deep array'     => array(
				'test',
				array( 'me' => array( array( 'need', 'want' ) ) ),
				'',
			),
			'with integer key and value'         => array(
				'test',
				array( 1 => 1 ),
				" 1='1'",
			),
			'with integer key and "true" value'  => array(
				'test',
				array( 1 => true ),
				' 1',
			),
			'with integer key and "false" value' => array(
				'test',
				array( 1 => false ),
				'',
			),
			'with integer key and "0" value'     => array(
				'test',
				array( 1 => 0 ),
				'',
			),
			'with integer key and null value'    => array(
				'test',
				array( 1 => null ),
				'',
			),
			'with integer key and empty string'  => array(
				'test',
				array( 1 => '' ),
				'',
			),
			'with integer key and empty array'   => array(
				'test',
				array( 1 => array() ),
				'',
			),
			'with integer key and string value'  => array(
				'test',
				array( 1 => 'one' ),
				" 1='one'",
			),
			'with integer key and array value'   => array(
				'test',
				array( 1 => array( 2, 3 ) ),
				" 1='2'",
			),
			'with integer key and deep array'    => array(
				'test',
				array( 1 => array( array( 2 ), 3 ) ),
				'',
			),
		);
	}

	/**
	 * @dataProvider for_stringify_data_correctly
	 */
	public function test_stringify_data_correctly( string $handle, array $attributes, string $equivalent ): void {
		stubEscapeFunctions();

		$data    = new CustomData();
		$scripts = Utils::get_reflection_property( CustomData::class, 'scripts' );
		$styles  = Utils::get_reflection_property( CustomData::class, 'styles' );

		$scripts->setValue( $data, array( $handle => $attributes ) );
		$styles->setValue( $data, array( $handle => $attributes ) );

		$expect_script = str_replace( ' src', "$equivalent src", self::SCRIPT_TAG );
		$expect_style  = str_replace( ' href=', "$equivalent href=", self::STYLE_TAG );

		$actual_script = $data->script( self::SCRIPT_TAG, $handle );
		$actual_style  = $data->style( self::STYLE_TAG, $handle );

		$data->action();
		$this->assertSame( $expect_script, $actual_script );
		$this->assertSame( $expect_style, $actual_style );
	}

	public function for_no_replacements_made_to_unknown_handles(): array {
		return array(
			'with even "important" handle' => array( 'important' ),
			'with even asking "please"'    => array( 'please' ),
		);
	}
	/**
	 * @dataProvider for_no_replacements_made_to_unknown_handles
	 */
	public function test_no_replacements_made_to_unknown_handles( string $handle ): void {
		$data = new CustomData();

		$actual_script = $data->script( self::SCRIPT_TAG, $handle );
		$actual_style  = $data->style( self::STYLE_TAG, $handle );

		$data->action();
		$this->assertSame( self::SCRIPT_TAG, $actual_script );
		$this->assertSame( self::STYLE_TAG, $actual_style );
	}
}
