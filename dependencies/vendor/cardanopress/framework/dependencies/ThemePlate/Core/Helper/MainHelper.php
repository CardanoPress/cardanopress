<?php

/**
 * Helper functions
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Helper;

use CardanoPress\Dependencies\ThemePlate\Core\Field;

class MainHelper {

	/**
	 * @param array<string, mixed> $defaults
	 * @param array<string, mixed> $options
	 * @return array<string, mixed>
	 */
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
				$result[ $key ] = ( is_scalar( $result[ $key ] ) || null === $result[ $key ] ) ? (int) $result[ $key ] : (int) ( (bool) $result[ $key ] );
			}

			if ( is_string( $value ) ) {
				$result[ $key ] = ( is_scalar( $result[ $key ] ) || null === $result[ $key ] ) ? (string) $result[ $key ] : wp_json_encode( $result[ $key ] );
			}
		}

		return $result;

	}


	/**
	 * @param array<mixed> $array_var
	 */
	public static function is_sequential( array $array_var ): bool {

		return ( array_keys( $array_var ) === range( 0, count( $array_var ) - 1 ) );

	}


	/**
	 * @param array<mixed> $config
	 * @param array<mixed> $expected
	 */
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


	/**
	 * @param array<mixed> $array_var
	 * @return array<mixed>
	 */
	public static function values_to_string( array $array_var ): array {

		return array_map(
			function ( $value ) {
				if ( is_array( $value ) ) {
					return self::values_to_string( $value );
				}

				return (string) $value;
			},
			$array_var
		);

	}


	/**
	 * @param mixed $value
	 */
	public static function for_repeatable( $value ): bool {

		return is_array( $value ) && self::is_sequential( $value ) && is_array( $value[0] );

	}


	/**
	 * @param mixed $value
	 */
	public static function maybe_adjust( Field $field, &$value ): void {

		if (
			self::for_repeatable( $value ) &&
			(
				! $field->get_config( 'repeatable' ) ||
				(
					! is_array( $field::DEFAULT_VALUE ) &&
					! ( $field::MULTIPLE_ABLE && (bool) $field->get_config( 'multiple' ) )
				)
			)
		) {
			$value = $value[0];
		}

	}

}
