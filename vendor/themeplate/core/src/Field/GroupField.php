<?php

/**
 * Setup a field type
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Field;

use ThemePlate\Core\Field;
use ThemePlate\Core\Fields;

class GroupField extends Field {

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
