<?php

/**
 * Setup a field type
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Field;

class Link {

	public static function render( $field ) {

		echo '<div id="' . esc_attr( $field['id'] ) . '" class="themeplate-link">';
		echo '<input type="button" class="button link-select" value="Select" />';
		echo '<input type="button" class="button link-remove' . ( empty( $field['value'] ) ? ' hidden' : '' ) . '" value="Remove" />';

		foreach ( array( 'url', 'text', 'target' ) as $attr ) {
			$value = isset( $field['value'][ $attr ] ) ? $field['value'][ $attr ] : '';

			echo '<input type="hidden" class="input-' . $attr . '" name="' . esc_attr( $field['name'] ) . '[' . $attr . ']" value="' . esc_attr( $value ) . '">';
		}

		echo '<div class="link-holder">';

		if ( isset( $field['value']['text'] ) ) {
			echo '<span>' . esc_html( $field['value']['text'] ) . '</span>';
		}

		if ( isset( $field['value']['url'] ) ) {
			echo '<a href="' . esc_url( $field['value']['url'] ) . '" target="_blank">' . esc_html( $field['value']['url'] ) . '</a>';
		}

		echo '</div>';
		echo '</div>';

	}

}
