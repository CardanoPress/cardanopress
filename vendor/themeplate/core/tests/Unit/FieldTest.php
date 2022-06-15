<?php

/**
 * @package ThemePlate
 */

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use ThemePlate\Core\Field\InputField;
use ThemePlate\Core\Helper\FormHelper;

class FieldTest extends TestCase {
	public function for_default_can_be_an_array(): array {
		// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
		return array(
			'with a group type field' => array(
				'group',
				array(),
				true,
			),
			'with a text type field' => array(
				'text',
				array(),
				false,
			),
			'with a text multiple' => array(
				'text',
				array( 'multiple' => true ),
				false,
			),
			'with a text repeatable' => array(
				'text',
				array( 'repeatable' => true ),
				true,
			),
			'with a select type field' => array(
				'select',
				array(),
				false,
			),
			'with a select multiple' => array(
				'select',
				array( 'multiple' => true ),
				true,
			),
			'with a select repeatable' => array(
				'select',
				array( 'repeatable' => true ),
				true,
			),
		);
		// phpcs:enable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
	}

	/**
	 * @dataProvider for_default_can_be_an_array
	 */
	public function test_default_can_be_an_array( string $type, array $config, bool $can_have_multiple_value ): void {
		$default = array(
			'test' => 'me',
			'out'  => 'please',
		);
		$field   = FormHelper::make_field( 'test', array_merge( $config, compact( 'type', 'default' ) ) );

		if ( $can_have_multiple_value ) {
			$this->assertIsArray( $field->get_config( 'default' ) );
		} else {
			$this->assertIsString( $field->get_config( 'default' ) );
		}
	}
	public function for_maybe_adjust_value(): array {
		// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
		return array(
			'with a non-repeatable and nothing specified' => array(
				false,
				null,
				null,
				null,
				null,
			),
			'with a non-repeatable and string' => array(
				false,
				null,
				null,
				'test',
				'test',
			),
			'with a non-repeatable and array' => array(
				false,
				null,
				null,
				array( 'test' ),
				array( 'test' ),
			),
			'with a repeatable and string' => array(
				true,
				1,
				null,
				'test',
				array( 'test' ),
			),
			'with a repeatable and array' => array(
				true,
				1,
				null,
				array( 'test' ),
				array( 'test' ),
			),
			'with 3 repeatable and string' => array(
				true,
				3,
				null,
				'test',
				array( 'test', 'test', 'test' ),
			),
			'with 3 repeatable and array' => array(
				true,
				3,
				null,
				array( 'test' ),
				array( 'test', '', '' ),
			),
			'with over the limit; a maximum of 2' => array(
				true,
				null,
				2,
				array( 'please', 'this', 'important' ),
				array( 'please', 'this' ),
			),
		);
		// phpcs:enable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
	}

	/**
	 * @dataProvider for_maybe_adjust_value
	 */
	public function test_maybe_adjust_value( bool $repeatable, ?int $minimum, ?int $maximum, $default, $expected_value ): void {
		$field = new InputField( 'test', compact( 'repeatable', 'minimum', 'maximum', 'default' ) );
		$count = max( $field->get_config( 'minimum' ), $field->get_config( 'maximum' ), 1 );
		$value = $default;

		$field->maybe_adjust( $value );
		$this->assertSame( $expected_value, $value );
		$this->assertSame( $count, $field->get_config( 'count' ) );
	}

	public function for_correctly_passed_classname(): array {
		// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
		return array(
			array(
				'color',
				'',
				'type-color',
			),
			array(
				'editor',
				'custom-class',
				'type-editor custom-class',
			),
			array(
				'group',
				' whitespaces ',
				'type-group whitespaces',
			),
		);
		// phpcs:enable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
	}

	/**
	 * @dataProvider for_correctly_passed_classname
	 */
	public function test_correctly_passed_classname( string $type, string $style, string $expected ): void {
		$field = FormHelper::make_field( 'test', compact( 'type', 'style' ) );

		$this->assertSame( $expected, $field->get_classname() );
	}

	public function test_set_id_and_name(): void {
		$field = new InputField( 'test' );
		$id    = 'my_id';
		$name  = 'my_name';

		$field->set_id( $id );
		$this->assertSame( $id, $field->get_config( 'id' ) );
		$field->set_name( $name );
		$this->assertSame( $name, $field->get_config( 'name' ) );
	}

	public function for_enforcing_minimum_and_maximum(): array {
		// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
		return array(
			'with both less than 0' => array(
				-1,
				-1,
				false,
				array( 0, 0 ),
			),
			'with max less than min' => array(
				4,
				2,
				false,
				array( 4, 4 ),
			),
			'with marked as required' => array(
				0,
				0,
				true,
				array( 1, 0 ),
			),
		);
		// phpcs:enable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
	}

	/**
	 * @dataProvider for_enforcing_minimum_and_maximum
	 */
	public function test_enforcing_minimum_and_maximum( int $minimum, int $maximum, bool $required, array $expected ): void {
		$field = new InputField( 'test', compact( 'minimum', 'maximum', 'required' ) );

		list( $min, $max ) = $expected;

		$this->assertSame( $min, $field->get_config( 'minimum' ) );
		$this->assertSame( $max, $field->get_config( 'maximum' ) );
	}
}
