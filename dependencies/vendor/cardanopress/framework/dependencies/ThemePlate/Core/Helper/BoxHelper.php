<?php

/**
 * Helper functions
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Helper;

class BoxHelper {

	/**
	 * @param array<string, mixed> $data
	 * @return array<string, mixed>
	 */
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


	/**
	 * @param array<string, mixed> $data
	 * @return array<string, mixed>
	 */
	private static function filter( array $data ): array {

		foreach ( $data as $key => $value ) {
			if ( is_array( $value ) ) {
				$data[ $key ] = self::filter( $value );
			}

			if ( empty( $value ) || 'i-x' === $key ) {
				unset( $data[ $key ] );
			}
		}

		return array_merge( array_filter( $data ) );

	}


	/**
	 * @param array<string, mixed> $config
	 */
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
