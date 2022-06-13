<?php

/**
 * @package ThemePlate
 */

namespace Tests\Integration;

use ThemePlate\Core\Helper\MainHelper;
use WP_UnitTestCase;

class MainHelperTest extends WP_UnitTestCase {
	public function for_get_url(): array {
		return array(
			array(
				dirname( __FILE__, 3 ) . '/.cache/wordpress/wp-content/test.css',
				( is_ssl() ? 'https' : 'http' ) . '://' . WP_TESTS_DOMAIN . '/wp-content/test.css',
			),
		);
	}

	/**
	 * @dataProvider for_get_url
	 */
	public function test_get_url( string $base_path, string $base_url ): void {
		$this->assertSame( $base_url, MainHelper::get_url( $base_path ) );
	}
}
