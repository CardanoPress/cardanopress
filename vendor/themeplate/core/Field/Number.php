<?php

/**
 * Setup a field type
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Field;

class Number {

	public static function render( $field ) {

		echo '<input type="' . esc_attr( $field['type'] ) . '" name="' . esc_attr( $field['name'] ) . '" id="' . esc_attr( $field['id'] ) . '" value="' . esc_attr( $field['value'] ) . '"';
		if ( ! empty( $field['options'] ) ) {
			foreach ( $field['options'] as $option => $value ) {
				echo esc_attr( $option ) . '="' . esc_attr( $value ) . '"';
			}
		}
		if ( 'range' === $field['type'] ) {
			echo ' oninput="this.nextElementSibling.innerHTML=this.value" />';
			echo '<span>' . esc_html( $field['value'] ) . '</span>';
		} else {
			echo ( $field['required'] ? ' required="required"' : '' ) . ' />';
		}

	}

}
