<?php

/**
 * @package ThemePlate
 */

namespace Tests\Integration;

use ThemePlate\Core\Helper\AssetsHelper;
use WP_Ajax_UnitTestCase;
use WPAjaxDieStopException;

class AssetsHelperTest extends WP_Ajax_UnitTestCase {
	public function for_loader_assets(): array {
		return array(
			array( null ),
			array( 'non-existent.file' ),
			array( 'themeplate.css' ),
			array( 'themeplate.js' ),
		);
	}

	/**
	 * @dataProvider for_loader_assets
	 */
	public function test_loader_assets( ?string $filename ): void {
		AssetsHelper::setup_loader();
		wp_set_current_user( 1 );

		$this->assertSame( 10, has_action( 'wp_ajax_' . AssetsHelper::LOADER_ACTION, array( AssetsHelper::class,
			'load_asset'
		) ) );

		// phpcs:ignore WordPress.Security.NonceVerification.Recommended
		global $_GET;

		$asset_full_path  = dirname( __DIR__, 2 ) . '/assets/' . $filename;
		$_GET['_wpnonce'] = wp_create_nonce( AssetsHelper::LOADER_ACTION );
		$_GET['filename'] = $filename;

		try {
			$this->_handleAjax( AssetsHelper::LOADER_ACTION );
		} catch ( WPAjaxDieStopException $exception ) {
			$output = '';

			if ( $filename && file_exists( $asset_full_path ) ) {
				// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
				$output = file_get_contents( $asset_full_path );
			}

			$this->assertSame( $output, $exception->getMessage() );
		}
	}
}
