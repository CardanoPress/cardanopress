<?php

/**
 * Setup a field type
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Field;

use CardanoPress\Dependencies\ThemePlate\Core\Field;

class InputField extends Field {

	/**
	 * @param string $value
	 */
	public function render( $value ): void {

		echo '<input
				type="' . esc_attr( $this->get_config( 'type' ) ) . '"
				name="' . esc_attr( $this->get_config( 'name' ) ) . '"
				id="' . esc_attr( $this->get_config( 'id' ) ) . '"
				value="' . esc_attr( $value ) . '"
				' . ( $this->get_config( 'required' ) ? ' required="required"' : '' ) .
				' />';

	}

}
