<?php

/**
 * @package ThemePlate
 */

namespace Tests;

use ThemePlate\Core\Field\InputField;
use ThemePlate\Settings\OptionHandler;
use WP_UnitTestCase;

class OptionHandlerTest extends WP_UnitTestCase {
	private OptionHandler $handler;
	private InputField $field;
	private string $data_key = 'test';
	private string $default  = 'important!';

	public function setUp(): void {
		$config = array( 'default' => $this->default );

		if ( 'test_handling_repeatable' === $this->getName() ) {
			$config['repeatable'] = true;
		}

		$this->handler = new OptionHandler();
		$this->field   = new InputField( $this->data_key, $config );
	}

	public function test_handling_defaults(): void {
		$option_name = 'default_tester';

		add_filter( 'default_option_' . $option_name, '__return_empty_array' );
		$this->assertSame( $this->default, $this->handler->get_value( $this->field, '', $option_name ) );
	}

	public function test_handling_values(): void {
		$option_name = 'default_tester';

		add_option( $option_name, array( $this->data_key => 'wanted' ) );
		$this->assertSame( 'wanted', $this->handler->get_value( $this->field, '', $option_name ) );
	}

	public function test_handling_with_data_prefix(): void {
		$option_name = 'tester';
		$data_prefix = 'my_data_';

		add_option( $option_name, array( $data_prefix . $this->data_key => 'prefixed-value' ) );
		$this->assertSame( 'prefixed-value', $this->handler->get_value( $this->field, $data_prefix, $option_name ) );
	}
}
