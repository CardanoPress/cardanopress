<?php

/**
 * @package ThemePlate
 */

namespace Tests;

use WP_UnitTestCase;

abstract class AbstractTest extends WP_UnitTestCase {
	use TestCommon;

	public function test_firing_setup_actually_add_hooks(): void {
		$page = $this->get_tested_instance( $this->default );

		$page->setup();

		$this->assertSame( 10, has_filter( 'allowed_options', array( $page, 'maybe_init_option' ) ) );
		$this->assertSame( 10, has_action( 'admin_menu', array( $page, 'menu' ) ) );
	}

	/**
	 * @dataProvider for_maybe_init_option
	 */
	public function test_maybe_init_option( array $options ): void {
		$page = $this->get_tested_instance( $this->default );

		$this->assertArrayHasKey( $this->default['menu_slug'], $page->maybe_init_option( $options ) );
	}

	/**
	 * @dataProvider for_correctly_fired_hooks_and_assigned_variables
	 */
	public function test_menu_method_registers_pages( array $parameters, string $option_group_name ) {
		$page = $this->get_tested_instance( $parameters );

		wp_set_current_user( 1 );
		$page->menu();

		$parent_slug = $parameters['parent_slug'];
		$menu_slug   = $option_group_name;
		$hookname    = get_plugin_page_hookname( $menu_slug, $parameters['parent_slug'] );

		$this->assertSame( $hookname, $page->get_hookname() );
		$this->assertSame( 10, has_action( 'load-' . $hookname, array( $page, 'load' ) ) );
		$page->load();
		$this->assertSame( 10, has_action( 'admin_notices', array( $page, 'notices' ) ) );
		$this->assertSame( 1, did_action( 'themeplate_page_' . $menu_slug . '_load' ) );

		global $_registered_pages, $_parent_pages;

		$this->assertArrayHasKey( $hookname, $_registered_pages );
		$this->assertTrue( $_registered_pages[ $hookname ] );
		$this->assertArrayHasKey( $menu_slug, $_parent_pages );

		if ( '' === $parent_slug ) {
			$this->assertFalse( $_parent_pages[ $menu_slug ] );
		} else {
			$this->assertSame( $parameters['parent_slug'], $_parent_pages[ $menu_slug ] );
		}
	}

	/**
	 * @dataProvider for_notices_method_echoing_a_message
	 */
	public function test_notices_method_echoing_a_message( ?string $page, ?string $updated ): void {
		global $_REQUEST; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

		if ( $page ) {
			$_REQUEST['page'] = $page;
		}

		if ( $updated ) {
			$_REQUEST['settings-updated'] = $updated;
		}

		ob_start();
		( $this->get_tested_instance( $this->default ) )->notices();
		$output = ob_get_clean();

		$this->assertIsString( $output );

		if ( 'true' === $updated && $page === $this->default['menu_slug'] ) {
			$this->assertNotEmpty( $output );
		} else {
			$this->assertEmpty( $output );
		}

	}

	/**
	 * @dataProvider for_correctly_fired_hooks_and_assigned_variables
	 */
	public function test_create_method_layouts_pages( array $parameters, string $option_group_name ) {
		add_action( $option_group_name . '_content', '__return_null' );
		ob_start();
		( $this->get_tested_instance( $parameters ) )->create();
		ob_get_clean();

		$this->assertSame( 1, did_action( 'themeplate_settings_' . $option_group_name . '_after_title' ) );
		$this->assertSame( 1, did_action( 'themeplate_settings_' . $option_group_name . '_side' ) );
		$this->assertSame( 1, did_action( 'themeplate_settings_' . $option_group_name . '_normal' ) );
		$this->assertSame( 1, did_action( 'themeplate_settings_' . $option_group_name . '_advanced' ) );
	}
}
