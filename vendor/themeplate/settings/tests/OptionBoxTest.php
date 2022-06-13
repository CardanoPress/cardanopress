<?php

/**
 * @package ThemePlate
 */

namespace Tests;

use ThemePlate\Core\Field\ColorField;
use ThemePlate\Core\Field\EditorField;
use ThemePlate\Core\Field\LinkField;
use ThemePlate\Core\Field\SelectField;
use ThemePlate\Core\Helper\FormHelper;
use ThemePlate\Settings\OptionBox;
use WP_UnitTestCase;

class OptionBoxTest extends WP_UnitTestCase {
	private OptionBox $option_box;

	public function setUp(): void {
		$this->option_box = new OptionBox( 'Test' );
	}

	public function test_firing_create_actually_add_hooks(): void {
		$pages = array( 'page1', 'page2' );

		foreach ( $pages as $page ) {
			$this->option_box->location( $page );
		}

		$this->option_box->create();

		$this->assertSame( count( $pages ), did_action( 'register_setting' ) );

		foreach ( $pages as $page ) {
			$this->assertSame( 10, has_filter( 'default_option_' . $page, '__return_empty_array' ) );
			$this->assertSame( 10, has_filter( 'sanitize_option_' . $page, array( $this->option_box, 'sanitize_option' ) ) );
			$this->assertSame( 10, has_action( 'themeplate_page_' . $page . '_load', array( FormHelper::class, 'enqueue_assets' ) ) );
			$this->assertSame( 10, has_action( 'themeplate_settings_' . $page . '_normal', array( $this->option_box, 'layout_postbox' ) ) );
		}
	}

	public function test_sanitize_option_value(): void {
		$this->assertIsArray( $this->option_box->sanitize_option( null ) );
		$this->assertIsArray( $this->option_box->sanitize_option( array() ) );
	}

	public function test_get_config(): void {
		$config = $this->option_box->get_config();

		$this->assertSame( array(), $config->get_fields() );

		$this->option_box->fields(
			array(
				'test1' => array( 'type' => 'color' ),
				'test2' => array( 'type' => 'editor' ),
				'test3' => array( 'type' => 'link' ),
				'test4' => array( 'type' => 'select' ),
			),
		);

		$config = $this->option_box->get_config();
		$fields = $config->get_fields();

		$this->assertSame( 4, count( $fields ) );
		$this->assertInstanceOf( ColorField::class, $fields['test1'] );
		$this->assertInstanceOf( EditorField::class, $fields['test2'] );
		$this->assertInstanceOf( LinkField::class, $fields['test3'] );
		$this->assertInstanceOf( SelectField::class, $fields['test4'] );
	}
}
