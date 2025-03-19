<?php

/**
 * Setup meta boxes
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Meta;

class MetaHelpers {

	public static function default( $value, $object_id, $meta_key, $single, $meta_type ) {

		$schema = apply_filters( "themeplate_{$meta_type}_meta_{$meta_key}_schema", array() );

		if ( empty( $schema[ $meta_key ] ) ) {
			return $value;
		}

		return $schema[ $meta_key ]['default'];

	}

}
