<?php

/**
 * Helper functions
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Helper;

use CardanoPress\Dependencies\ThemePlate\Core\Field;
use CardanoPress\Dependencies\ThemePlate\Core\Field\LinkField;
use CardanoPress\Dependencies\ThemePlate\Core\Fields;

class FieldsHelper {

	public static function build_schema( Fields $fields, string $data_prefix = '' ): array {

		$schema = array();

		foreach ( $fields->get_collection() as $field ) {
			$schema[ $field->data_key( $data_prefix ) ] = static::get_schema( $field );

			if ( $field->get_config( 'repeatable' ) ) {
				$base = $schema[ $field->data_key( $data_prefix ) ];

				unset( $base['default'] );
				unset( $schema[ $field->data_key( $data_prefix ) ]['properties'] );

				$schema[ $field->data_key( $data_prefix ) ]['type']  = 'array';
				$schema[ $field->data_key( $data_prefix ) ]['items'] = $base;
			}
		}

		return $schema;

	}


	public static function get_schema( Field $field ): array {

		$schema = array(
			'type'    => static::get_schema_type( $field ),
			'default' => static::get_default_value( $field ),
		);

		if ( 'group' === $field->get_config( 'type' ) ) {
			$schema['properties'] = static::build_schema( $field->get_config( 'fields' ) );

			$default = $schema['default'];

			if ( ! MainHelper::for_repeatable( $default ) ) {
				$default = array( $default );
			}

			foreach ( $schema['properties'] as $key => &$value ) {
				if ( ! empty( $value['default'] ) ) {
					continue;
				}

				$value['default'] = $default[0][ $key ];
			}
		} elseif ( 'link' === $field->get_config( 'type' ) ) {
			$schema['properties'] = LinkField::DEFAULT_VALUE;

			$default = $schema['default'];

			if ( MainHelper::for_repeatable( $default ) ) {
				$default = $default[0];
			}

			foreach ( $schema['properties'] as $key => &$value ) {
				$value = array(
					'type'    => 'string',
					'default' => $default[ $key ],
				);
			}
		}

		if ( $field::MULTIPLE_ABLE && (bool) $field->get_config( 'multiple' ) ) {
			$base = $schema;

			unset( $base['default'] );

			$schema['type']  = 'array';
			$schema['items'] = $base;
		}

		return $schema;

	}


	public static function get_schema_type( Field $field ): string {

		switch ( $field->get_config( 'type' ) ) {
			case 'link':
			case 'group':
				return 'object';

			default:
				return 'string';
		}

	}


	/**
	 * @return mixed
	 */
	public static function get_default_value( Field $field ) {

		$default = $field->get_config( 'default' );

		if ( 'group' === $field->get_config( 'type' ) ) {
			$default = (array) $default;

			if ( ! MainHelper::for_repeatable( $default ) ) {
				$default = array( $default );
			}

			foreach ( $default as &$def ) {
				$fields = static::group_fields( $field->get_config( 'fields' ) );

				foreach ( $fields->get_collection() as $sub_field ) {
					if ( isset( $def[ $sub_field->data_key() ] ) ) {
						continue;
					}

					$def[ $sub_field->data_key() ] = static::get_default_value( $sub_field );
				}
			}

			if ( ! $field->get_config( 'repeatable' ) ) {
				$default = $default[0];
			}

			return MainHelper::values_to_string( $default );
		}

		if ( $field->get_config( 'repeatable' ) && ! MainHelper::for_repeatable( $default ) ) {
			$default = array( $default );
		}

		MainHelper::maybe_adjust( $field, $default );

		return is_array( $default ) ? MainHelper::values_to_string( $default ) : (string) $default;

	}


	/**
	 * @param array|Fields $group_fields
	 */
	public static function group_fields( $group_fields ): Fields {

		return $group_fields instanceof Fields ? $group_fields : new Fields( (array) $group_fields );

	}

}
