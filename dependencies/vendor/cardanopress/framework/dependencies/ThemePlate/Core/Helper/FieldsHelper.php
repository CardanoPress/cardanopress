<?php

/**
 * Helper functions
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Helper;

use CardanoPress\Dependencies\ThemePlate\Core\Field;
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
		} elseif ( 'link' === $field->get_config( 'type' ) ) {
			$properties = array();

			foreach ( $schema['default'] as $key => $value ) {
				$properties[ $key ] = array(
					'type'    => 'string',
					'default' => $value,
				);
			};

			$schema['properties'] = $properties;
		}

		if ( $field::MULTIPLE_ABLE && !! $field->get_config( 'multiple' ) ) {
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
			if ( ! is_array( $default ) ) {
				$default = array();
			}

			$fields = static::group_fields( $field->get_config( 'fields' ) );

			foreach ( $fields->get_collection() as $sub_field ) {
				if ( isset( $default[ $sub_field->data_key() ] ) ) {
					continue;
				}

				$default[ $sub_field->data_key() ] = static::get_default_value( $sub_field );
			}
		}

		if ( is_array( $field::DEFAULT_VALUE ) && $field->get_config( 'repeatable' ) ) {
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
