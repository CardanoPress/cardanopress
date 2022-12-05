<?php

/**
 * Helper functions
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Helper;

class AssetsHelper {

	public const LOADER_ACTION  = 'themeplate_assets_loader';
	public const LOADER_VERSION = '2.2.2';


	public static function setup_loader(): void {

		add_action( 'wp_ajax_' . self::LOADER_ACTION, array( self::class, 'load_asset' ) );

	}


	public static function get_url( string $filename ): string {

		return add_query_arg(
			array(
				'action'   => self::LOADER_ACTION,
				'filename' => $filename,
				'_wpnonce' => wp_create_nonce( self::LOADER_ACTION ),
			),
			admin_url( 'admin-ajax.php' )
		);

	}


	public static function load_asset(): void {

		check_ajax_referer( self::LOADER_ACTION );

		if ( empty( $_GET['filename'] ) ) {
			wp_die();
		}

		$filename = dirname( __DIR__, 2 ) . '/assets/' . $_GET['filename'];

		if ( ! file_exists( $filename ) ) {
			wp_die();
		}

		$file_info = wp_check_filetype( basename( $filename ) );

		header( 'Content-Type: ' . $file_info['type'] );
		ob_start();
		include $filename;
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		wp_die( ob_get_clean() );

	}

}
