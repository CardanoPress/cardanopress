<?php

/**
 * Setup a field type
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Field;

use ThemePlate\Core\Helper\Main;

class Checkbox {

	public static function render( $field, $list = false ) {

		$seq = Main::is_sequential( $field['options'] );
		$tag = $list ? 'p' : 'span';
		echo '<input type="hidden" name="' . esc_attr( $field['name'] ) . '" />';
		if ( ! empty( $field['options'] ) ) {
			echo '<fieldset id="' . esc_attr( $field['id'] ) . '">';
			foreach ( $field['options'] as $value => $option ) {
				$value = ( $seq ? $value + 1 : $value );
				echo '<' . $tag . '>';
				echo '<label><input type="checkbox" name="' . esc_attr( $field['name'] ) . '[]" value="' . esc_attr( $value ) . '"';
				if ( in_array( (string) $value, (array) $field['value'], true ) ) {
					echo ' checked="checked"';
				}
				echo ( $field['required'] ? ' required="required"' : '' ) . ' />' . esc_html( $option ) . '</label>';
				echo '</' . $tag . '>';
			}
			echo '</fieldset>';
		} else {
			echo '<input type="checkbox" id="' . esc_attr( $field['id'] ) . '" name="' . esc_attr( $field['name'] ) . '" value="1"' . checked( $field['value'], 1, false ) . ' />';
		}

	}

}
