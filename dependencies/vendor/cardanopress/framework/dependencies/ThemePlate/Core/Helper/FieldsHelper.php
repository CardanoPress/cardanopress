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
			$schema[ $field->data_key( $data_prefix ) ] = array(
				'type'    => static::get_schema_type( $field ),
				'default' => self::get_default_value( $field ),
			);

			if ( 'group' === $field->get_config( 'type' ) ) {
				$schema[ $field->data_key( $data_prefix ) ]['properties'] = self::build_schema( $field->get_config( 'fields' ) );
			} elseif ( 'link' === $field->get_config( 'type' ) ) {
				$properties = array();

				foreach ( array( 'url', 'text', 'target' ) as $key ) {
					$properties[ $key ] = array(
						'type'    => 'string',
						'default' => $schema[ $field->data_key( $data_prefix ) ]['default'][ $key ] ?? '',
					);
				};

				$schema[ $field->data_key( $data_prefix ) ]['properties'] = $properties;
			}
		}

		return $schema;

	}


	public static function get_schema_type( Field $field ): string {

		switch ( $field->get_config( 'type' ) ) {
			default:
				return 'string';

			case 'link':
			case 'group':
				return 'object';
		}

	}


	/**
	 * @return mixed
	 */
	public static function get_default_value( Field $field ) {

		$default = $field->get_config( 'default' );

		if ( 'group' === $field->get_config( 'type' ) ) {
			if ( empty( $field->get_config( 'fields' ) ) ) {
				return $default;
			}

			$fields = self::group_fields( $field->get_config( 'fields' ) );

			foreach ( $fields->get_collection() as $sub_field ) {
				if ( isset( $default[ $sub_field->data_key() ] ) ) {
					continue;
				}

				if ( ! is_array( $default ) ) {
					$default = array();
				}

				$default[ $sub_field->data_key() ] = self::get_default_value( $sub_field );
			}
		}

		return $default;

	}


	/**
	 * @param array|Fields $group_fields
	 */
	public static function group_fields( $group_fields ): Fields {

		return $group_fields instanceof Fields ? $group_fields : new Fields( (array) $group_fields );

	}

}
