<?php

/**
 * Setup options meta boxes
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Settings;

use CardanoPress\Dependencies\ThemePlate\Core\Helper\BoxHelper;

class OptionHelpers {

	public static function schema_default( string $menu_page ): array {

		$default = array();
		$schema  = apply_filters( 'themeplate_setting_' . $menu_page . '_schema', $default );

		if ( ! empty( $schema ) ) {
			$default = array_map(
				function ( $field ) {
					return $field['default'];
				},
				$schema
			);
		}

		return compact( 'schema', 'default' );

	}


	public static function sanitize( ?array $value, string $menu_page ): array {

		if ( null === $value ) {
			return array();
		}

		$saved  = BoxHelper::prepare_save( $value );
		$option = self::schema_default( $menu_page );

		array_walk(
			$saved,
			function ( &$value, $key, $default ) {
				if ( empty( $value ) ) {
					$value = $default[ $key ];
				}
			},
			$option['default']
		);

		return $saved;

	}

}
