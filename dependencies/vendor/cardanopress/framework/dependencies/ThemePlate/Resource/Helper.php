<?php

/**
 * Helper for resource hinting
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Resource;

use WP_Dependencies;

class Helper {

	public static function get_script_src( string $handle ): string {

		return self::get_source( $handle, wp_scripts() );

	}


	public static function get_style_src( string $handle ): string {

		return self::get_source( $handle, wp_styles() );

	}


	public static function get_source( string $handle, WP_Dependencies $dependencies ): string {

		$dependency = $dependencies->query( $handle );

		if ( $dependency ) {
			return $dependency->src;
		}

		return '';

	}

}
