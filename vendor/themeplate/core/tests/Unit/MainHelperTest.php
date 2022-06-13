<?php

/**
 * @package ThemePlate
 */

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use ThemePlate\Core\Helper\MainHelper;

class MainHelperTest extends TestCase {
	public function for_fool_proof(): array {
		// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
		return array(
			'with object to array' => array(
				array( 'array' => (object) array() ),
				array( 'array' => array() ),
			),
			'with boolean to array' => array(
				array( 'array' => true ),
				array( 'array' => array( true ) ),
			),
			'with integer to array' => array(
				array( 'array' => 10 ),
				array( 'array' => array( 10 ) ),
			),
			'with string to array' => array(
				array( 'array' => 'array' ),
				array( 'array' => array( 'array' ) ),
			),
			'with null to array' => array(
				array( 'array' => null ),
				array( 'array' => array() ),
			),
			'with array to bool' => array(
				array( 'bool' => array() ),
				array( 'bool' => false ),
			),
			'with object to bool' => array(
				array( 'bool' => (object) array() ),
				array( 'bool' => true ),
			),
			'with integer to bool' => array(
				array( 'bool' => 0 ),
				array( 'bool' => false ),
			),
			'with string to bool' => array(
				array( 'bool' => 'bool' ),
				array( 'bool' => true ),
			),
			'with null to bool' => array(
				array( 'bool' => null ),
				array( 'bool' => false ),
			),
			'with array to int' => array(
				array( 'int' => array() ),
				array( 'int' => 0 ),
			),
			'with object to int' => array(
				array( 'int' => (object) array() ),
				array( 'int' => 1 ),
			),
			'with boolean to int' => array(
				array( 'int' => false ),
				array( 'int' => 0 ),
			),
			'with string to int' => array(
				array( 'int' => 'int' ),
				array( 'int' => 0 ),
			),
			'with null to int' => array(
				array( 'int' => null ),
				array( 'int' => 0 ),
			),
			'with array to string' => array(
				array( 'string' => array() ),
				array( 'string' => '[]' ),
			),
			'with object to string' => array(
				array( 'string' => (object) array() ),
				array( 'string' => '{}' ),
			),
			'with boolean to string' => array(
				array( 'string' => true ),
				array( 'string' => '1' ),
			),
			'with integer to string' => array(
				array( 'string' => 0 ),
				array( 'string' => '0' ),
			),
			'with null to string' => array(
				array( 'string' => null ),
				array( 'string' => '' ),
			),
		);
		// phpcs:enable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
	}

	/**
	 * @dataProvider for_fool_proof
	 */
	public function test_fool_proof( array $options, array $expected ): void {
		$defaults = array(
			'array'  => array(),
			'bool'   => true,
			'int'    => 1,
			'string' => '',
		);

		$options  = array_merge( $defaults, $options );
		$expected = array_merge( $defaults, $expected );

		$this->assertSame( $expected, MainHelper::fool_proof( $defaults, $options ) );
	}

	public function for_is_sequential(): array {
		// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
		return array(
			'with different type values' => array(
				array( 1, 3, 'five', true ),
				true,
			),
			'with multidimensional no keys' => array(
				array( array( 1, 2, 3 ), array( 'test' => 'this' ) ),
				true,
			),
			'with consecutive number keys' => array(
				array(
					0 => array( 1, 2, 3 ),
					1 => array( 'test' => 'this' ),
				),
				true,
			),
			'with integer keys not starting 0' => array(
				array(
					4 => array( 1, 2, 3 ),
					5 => array( 'test' => 'this' ),
				),
				false,
			),
			'with a single added key' => array(
				array(
					'first' => array( 1, 2, 3 ),
					array( 'test' => 'this' ),
				),
				false,
			),
		);
		// phpcs:enable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
	}

	/**
	 * @dataProvider for_is_sequential
	 */
	public function test_is_sequential( array $input, bool $is_sequential ): void {
		if ( $is_sequential ) {
			$this->assertTrue( MainHelper::is_sequential( $input ) );
		} else {
			$this->assertFalse( MainHelper::is_sequential( $input ) );
		}
	}

	public function for_is_complete(): array {
		return array(
			array(
				array(
					'significant' => 'yes',
				),
				false,
			),
			array(
				array(
					'important' => array(),
				),
				false,
			),
			array(
				array(
					'important' => true,
					'critical'  => 1,
				),
				true,
			),
		);
	}

	/**
	 * @dataProvider for_is_complete
	 */
	public function test_is_complete( array $config, bool $is_complete ): void {
		$expected = array(
			'important',
			array( 'critical', 'crucial' ),
		);

		if ( $is_complete ) {
			$this->assertTrue( MainHelper::is_complete( $config, $expected ) );
		} else {
			$this->assertFalse( MainHelper::is_complete( $config, $expected ) );
		}
	}
}
