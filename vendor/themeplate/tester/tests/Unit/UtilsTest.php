<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace ThemePlate\Tester\Tests\Unit;

use ThemePlate\Tester\Utils;
use PHPUnit\Framework\TestCase;

class UtilsTest extends TestCase {

	protected $unliberated;


	protected function setUp(): void {

		$this->unliberated = new class() {
			private string $property_name = 1 . 'value';

			/* @phpstan-ignore-next-line unused method */
			private function method_name( int $arg ): bool {
				return $arg . 'value' === $this->property_name;
			}
		};

	}


	public function test_invoking_unknown_method() {

		$value = Utils::invoke_inaccessible_method( $this->unliberated, 'tester' );

		$this->assertNull( $value );

	}


	public function test_getting_unknown_property() {

		$value = Utils::get_inaccessible_property( $this->unliberated, 'tester' );

		$this->assertNull( $value );

	}


	public function test_setting_unknown_property() {

		Utils::set_inaccessible_property( $this->unliberated, 'tester', true );

		$this->assertNull( Utils::get_inaccessible_property( $this->unliberated, 'tester' ) );

	}


	public function test_liberate_method() {

		$value = Utils::invoke_inaccessible_method( $this->unliberated, 'method_name', array( 1 ) );

		$this->assertIsBool( $value );
		$this->assertSame( true, $value );

	}


	public function test_liberate_property() {

		$value = Utils::get_inaccessible_property( $this->unliberated, 'property_name' );

		$this->assertIsString( $value );
		$this->assertSame( '1value', $value );

	}


	public function test_forced_property_value() {

		$expect = 'OWNED!';

		Utils::set_inaccessible_property( $this->unliberated, 'property_name', $expect );
		$this->assertSame( $expect, Utils::get_inaccessible_property( $this->unliberated, 'property_name' ) );

	}

}
