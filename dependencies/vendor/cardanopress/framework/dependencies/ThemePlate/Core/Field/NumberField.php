<?php

/**
 * Setup a field type
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Field;

use CardanoPress\Dependencies\ThemePlate\Core\Field;

class NumberField extends Field {

	public function render( $value ): void {

		echo '<input
				type="' . esc_attr( $this->get_config( 'type' ) ) . '"
				name="' . esc_attr( $this->get_config( 'name' ) ) . '"
				id="' . esc_attr( $this->get_config( 'id' ) ) . '"
				value="' . esc_attr( $value ) . '"';

		if ( ! empty( $this->get_config( 'options' ) ) ) {
			foreach ( $this->get_config( 'options' ) as $option_key => $option_value ) {
				echo esc_attr( $option_key ) . '="' . esc_attr( $option_value ) . '"';
			}
		}

		if ( 'range' === $this->get_config( 'type' ) ) {
			echo ' oninput="this.nextElementSibling.innerHTML=this.value" />';
			echo '<span>' . esc_html( $value ) . '</span>';
		} else {
			echo ( $this->get_config( 'required' ) ? ' required="required"' : '' ) . ' />';
		}

	}

}
