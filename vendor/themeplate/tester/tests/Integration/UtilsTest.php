<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace ThemePlate\Tester\Tests\Integration;

use ThemePlate\Tester\Utils;
use WP_UnitTestCase;
use WP_User;

class UtilsTest extends WP_UnitTestCase {

	protected WP_User $user;


	protected function setUp(): void {

		$user_id    = $this->factory()->user->create();
		$this->user = get_user_by( 'ID', $user_id );

	}


	public function test_get_user_site_id() {

		$value = Utils::get_inaccessible_property( $this->user, 'site_id' );

		$this->assertIsInt( $value );
		$this->assertSame( get_current_blog_id(), $value );

	}


	public function test_set_user_site_id() {

		$expect = 666;

		Utils::set_inaccessible_property( $this->user, 'site_id', $expect );
		$this->assertSame( $expect, Utils::get_inaccessible_property( $this->user, 'site_id' ) );

	}


	public function test_get_user_caps_data() {

		$value = Utils::invoke_inaccessible_method( $this->user, 'get_caps_data' );

		$this->assertIsArray( $value );
		$this->assertSame( array( get_option( 'default_role' ) => true ), $value );

	}

}
