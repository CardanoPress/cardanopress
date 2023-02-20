<?php

/**
 * Setup a field type
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Field;

use CardanoPress\Dependencies\ThemePlate\Core\Field;

class ColorField extends Field {

	public function render( $value ): void {

		echo '<input
				type="text"
				name="' . esc_attr( $this->get_config( 'name' ) ) . '"
				id="' . esc_attr( $this->get_config( 'id' ) ) . '"
				class="themeplate-color-picker"
				value="' . esc_attr( $value ) . '"
				' . ( esc_attr( $this->get_config( 'default' ) ) ? ' data-default-color="' . esc_attr( $this->get_config( 'default' ) ) . '"' : '' );
		if ( ! empty( $this->get_config( 'options' ) ) ) {
			$values = wp_json_encode( $this->get_config( 'options' ) );

			echo ' data-palettes="' . esc_attr( $values ) . '"';
		}
		echo ' />';

	}

}
