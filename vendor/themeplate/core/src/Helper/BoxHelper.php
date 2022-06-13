<?php

/**
 * Helper functions
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Helper;

class BoxHelper {

	public static function prepare_save( array $data ): array {

		$filtered = array();

		foreach ( $data as $key => $value ) {
			if ( is_array( $value ) ) {
				$value = self::filter( $value );
			}

			$filtered[ $key ] = $value;
		}

		return $filtered;

	}


	private static function filter( array $data ): array {

		foreach ( $data as $key => $value ) {
			if ( is_array( $value ) ) {
				$data[ $key ] = self::filter( $value );
			}

			if ( empty( $value ) ) {
				unset( $data[ $key ] );
			}
		}

		return array_merge( array_filter( $data ) );

	}


	public static function get_priority( array $config ): int {

		switch ( $config['priority'] ) {
			default:
			case 'default':
				$priority = 10;
				break;
			case 'high':
				$priority = 5;
				break;
			case 'low':
				$priority = 15;
				break;
		}

		return $priority;

	}

}
