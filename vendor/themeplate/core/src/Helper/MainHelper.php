<?php

/**
 * Helper functions
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Helper;

class MainHelper {

	public static function fool_proof( array $defaults, array $options ): array {

		$result = array_merge( $defaults, $options );

		foreach ( $defaults as $key => $value ) {
			if ( is_array( $value ) ) {
				$result[ $key ] = (array) $result[ $key ];
			}

			if ( is_bool( $value ) ) {
				$result[ $key ] = (bool) $result[ $key ];
			}

			if ( is_int( $value ) ) {
				if ( is_scalar( $result[ $key ] ) || null === $result[ $key ] ) {
					$result[ $key ] = (int) $result[ $key ];
				} else {
					$result[ $key ] = (int) ( (bool) $result[ $key ] );
				}
			}

			if ( is_string( $value ) ) {
				if ( is_scalar( $result[ $key ] ) || null === $result[ $key ] ) {
					$result[ $key ] = (string) $result[ $key ];
				} else {
					// phpcs:ignore WordPress.WP.AlternativeFunctions.json_encode_json_encode
					$result[ $key ] = json_encode( $result[ $key ] );
				}
			}
		}

		return $result;

	}


	public static function is_sequential( array $array ): bool {

		return ( array_keys( $array ) === range( 0, count( $array ) - 1 ) );

	}


	public static function is_complete( array $config, array $expected ): bool {

		$result = true;

		foreach ( $expected as $key ) {
			if ( is_array( $key ) ) {
				$result = false;

				foreach ( $key as $k ) {
					if ( array_key_exists( $k, $config ) ) {
						$result = true;
					}
				}
			} elseif ( ! array_key_exists( $key, $config ) ) {
				return false;
			}
		}

		return $result;

	}


	public static function get_url( string $file_path ): string {

		$absolute_path = wp_normalize_path( untrailingslashit( ABSPATH ) );
		$file_path     = wp_normalize_path( $file_path );
		$file_url      = str_replace( $absolute_path, site_url(), $file_path );
		$content_path  = wp_normalize_path( untrailingslashit( WP_CONTENT_DIR ) );
		$content_url   = untrailingslashit( content_url() );

		if ( false !== strpos( $file_path, $content_path ) ) {
			$file_url = str_replace( $content_path, $content_url, $file_path );
		}

		if ( 0 === strpos( $file_path, get_template_directory() ) ) {
			$file_url = get_template_directory_uri() . str_replace( get_template_directory(), '', $file_path );
		} elseif ( 0 === strpos( $file_path, get_stylesheet_directory() ) ) {
			$file_url = get_stylesheet_directory_uri() . str_replace( get_stylesheet_directory(), '', $file_path );
		}

		return set_url_scheme( $file_url );

	}


	public static function asset_url( string $file ): string {

		$url = defined( 'TP_CORE_URL' ) ? untrailingslashit( TP_CORE_URL ) : '';
		$url = '' !== $url ? $url : self::get_url( dirname( __DIR__, 2 ) );

		return $url . '/assets/' . $file;

	}

}
