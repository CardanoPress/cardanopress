<?php

/**
 * Setup a field type
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Field;

use ThemePlate\Core\Helper\Main;

class Radio {

	public static function render( $field, $list = false ) {

		$seq = Main::is_sequential( $field['options'] );
		$tag = $list ? 'p' : 'span';
		if ( ! empty( $field['options'] ) ) {
			echo '<fieldset id="' . esc_attr( $field['id'] ) . '">';
			foreach ( $field['options'] as $value => $option ) {
				$value = ( $seq ? $value + 1 : $value );
				echo '<' . $tag . '>';
				echo '<label><input type="radio" name="' . esc_attr( $field['name'] ) . '" value="' . esc_attr( $value ) . '"' . checked( $field['value'], $value, false ) . ( $field['required'] ? ' required="required"' : '' ) . ' />' . esc_html( $option ) . '</label>';
				echo '</' . $tag . '>';
			}
			echo '</fieldset>';
		}

	}

}
