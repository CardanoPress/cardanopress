<?php

/**
 * Setup a field type
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Field;

use ThemePlate\Core\Helper\Main;

class Select {

	public static function render( $field ) {

		$seq = Main::is_sequential( $field['options'] );
		if ( 'select2' === $field['type'] ) {
			echo '<input type="hidden" name="' . esc_attr( $field['name'] ) . '" />';
		}
		echo '<select' . ( 'select2' === $field['type'] ? ' class="themeplate-select2"' : '' ) . ' name="' . esc_attr( $field['name'] ) . ( $field['multiple'] ? '[]' : '' ) . '" id="' . esc_attr( $field['id'] ) . '"' . ( $field['multiple'] ? ' multiple="multiple"' : '' ) . ( $field['none'] ? ' data-none="true"' : '' ) . ( $field['required'] ? ' required="required"' : '' ) . '>';
		if ( 'select2' === $field['type'] && ! $field['value'] ) {
			echo '<option hidden></option>';
		} elseif ( 'select2' !== $field['type'] && ( ! $field['value'] || $field['none'] ) ) {
			echo '<option value=""' . ( $field['none'] && $field['value'] ? '' : ' disabled hidden' ) . ( $field['value'] ? '>' . esc_attr( __( '&mdash; None &mdash;' ) ) : ' selected>' . esc_attr( __( '&mdash; Select &mdash;' ) ) ) . '</option>';
		}
		if ( 'select2' === $field['type'] && $field['multiple'] && $field['value'] ) {
			$ordered = array();
			$values  = array_keys( $field['options'] );
			foreach ( (array) $field['value'] as $value ) {
				$value = ( $seq ? (int) $value - 1 : $value );
				if ( ! in_array( (string) $value, array_map( 'strval', $values ), true ) ) {
					continue;
				}
				$ordered[ $value ] = $field['options'][ $value ];
				unset( $field['options'][ $value ] );
			}
			$field['options'] = $ordered + $field['options'];
		}
		foreach ( $field['options'] as $value => $option ) {
			$value = ( $seq ? $value + 1 : $value );
			echo '<option value="' . esc_attr( $value ) . '"';
			if ( in_array( (string) $value, (array) $field['value'], true ) ) {
				echo ' selected="selected"';
			}
			echo '>' . esc_html( $option ) . '</option>';
		}
		echo '</select>';

	}

}
