<?php

/**
 * Helper functions
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Helper;

class MetaHelper {

	public static function should_display( array $meta_box, string $current_id ): bool {

		$check = true;

		foreach ( array( 'show', 'hide' ) as $type ) {
			if ( ! empty( $meta_box[ $type . '_on_cb' ] ) ) {
				$check = self::cb_check( $type, $current_id, $meta_box[ $type . '_on_cb' ] );
			} elseif ( ! empty( $meta_box[ $type . '_on_id' ] ) ) {
				$check = self::id_check( $type, $current_id, $meta_box[ $type . '_on_id' ] );
			}
		}

		return $check;

	}


	private static function cb_check( string $type, string $current_id, callable $callback ): bool {

		$result = (bool) ( $callback( $current_id ) );

		if ( 'hide' === $type ) {
			$result = ! $result;
		}

		return $result;

	}


	private static function id_check( string $type, string $current_id, array $wanted_ids ): bool {

		$result = in_array( $current_id, array_map( 'strval', $wanted_ids ), true );

		if ( 'hide' === $type ) {
			$result = ! $result;
		}

		return $result;

	}


	public static function normalize_options( array $container ): array {

		foreach ( array( 'show', 'hide' ) as $key ) {
			if ( ! empty( $container[ $key . '_on' ] ) ) {
				$container = self::option_check( $key . '_on', $container );
			}
		}

		return $container;

	}


	private static function option_check( string $type, array $container ): array {

		$value = $container[ $type ];

		if ( ! MainHelper::is_sequential( $value ) ) {
			$container[ $type ] = array( $value );
			$value              = array( $value );
		}

		if ( 1 === count( $value ) ) {
			if ( is_callable( $value[0] ) ) {
				$container[ $type . '_cb' ] = $value[0];
				unset( $container[ $type ] );
			} elseif ( isset( $value[0]['key'] ) && 'id' === $value[0]['key'] ) {
				$container[ $type . '_id' ] = (array) $value[0]['value'];
				unset( $container[ $type ] );
			}
		}

		return $container;

	}


	public static function render_options( array $container ): void {

		if ( ! empty( $container['show_on'] ) || ! empty( $container['hide_on'] ) ) {
			echo '<div class="themeplate-options"';

			foreach ( array( 'show', 'hide' ) as $key ) {
				if ( ! empty( $container[ $key . '_on' ] ) ) {
					$value = wp_json_encode( $container[ $key . '_on' ], JSON_NUMERIC_CHECK );
					echo ' data-' . $key . '="' . esc_attr( $value ) . '"'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				}
			}

			echo '></div>';
		}

	}

}
