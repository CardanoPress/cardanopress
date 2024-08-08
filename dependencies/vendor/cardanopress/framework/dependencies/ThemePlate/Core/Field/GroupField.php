<?php

/**
 * Setup a field type
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Field;

use CardanoPress\Dependencies\ThemePlate\Core\Field;
use CardanoPress\Dependencies\ThemePlate\Core\Fields;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\FieldsHelper;

class GroupField extends Field {

	public const DEFAULT_VALUE = array();


	protected function initialize(): void {

		$clone = clone $this;

		$clone->config['repeatable'] = false;

		$default = FieldsHelper::get_default_value( $clone );

		$this->config['default'] = $default;
		$this->config['fields']  = FieldsHelper::group_fields( $this->config['fields'] ?? array() );

	}

	/**
	 * @param array $value
	 */
	public function render( $value ): void {

		/**
		 * @var Fields $fields
		 */
		$fields = $this->get_config( 'fields' );

		foreach ( $fields->get_collection() as $field ) {
			$field->set_id( $this->get_config( 'id' ) . '_' . $field->data_key() );
			$field->set_name( $this->get_config( 'name' ) . '[' . $field->data_key() . ']' );
			$fields->layout( $field, $value[ $field->data_key() ] ?? $field->get_config( 'default' ) );
		}

	}

}
