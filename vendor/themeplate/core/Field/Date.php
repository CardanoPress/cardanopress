<?php

/**
 * Setup a field type
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Field;

class Date {

	public static function render( $field ) {

		echo '<div class="wrapper">';

		if ( $field['multiple'] ) {
			echo '<div id="' . esc_attr( $field['id'] ) . '" class="themeplate-date-picker multiple">';
			echo '<input type="hidden" name="' . esc_attr( $field['name'] ) . '" value="' . esc_attr( $field['value'] ) . '"' . ( $field['none'] ? ' data-none="true"' : '' );
			if ( ! empty( $field['options'] ) ) {
				foreach ( $field['options'] as $option => $value ) {
					echo 'data-date-' . esc_attr( $option ) . '="' . esc_attr( $value ) . '"';
				}
			}
			echo ' />';
			echo '</div>';
			echo '<ul class="ul-disc"></ul>';
		} else {
			echo '<input type="text" name="' . esc_attr( $field['name'] ) . '" id="' . esc_attr( $field['id'] ) . '" class="themeplate-date-picker single" value="' . esc_attr( $field['value'] ) . '"' . ( $field['none'] ? ' data-none="true"' : '' );
			if ( ! empty( $field['options'] ) ) {
				foreach ( $field['options'] as $option => $value ) {
					echo 'data-date-' . esc_attr( $option ) . '="' . esc_attr( $value ) . '"';
				}
			}
			echo ' />';
		}

		echo '</div>';

	}

}
