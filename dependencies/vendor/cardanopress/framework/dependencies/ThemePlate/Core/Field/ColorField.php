<?php

/**
 * Setup a field type
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Field;

use CardanoPress\Dependencies\ThemePlate\Core\Field;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\MainHelper;

class ColorField extends Field {

	public function render( $value ): void {

		$default = $this->get_config( 'default' );

		MainHelper::maybe_adjust( $this, $default );

		if ( is_array( $default ) ) {
			$default = $default[0];
		}

		echo '<input
				type="text"
				name="' . esc_attr( $this->get_config( 'name' ) ) . '"
				id="' . esc_attr( $this->get_config( 'id' ) ) . '"
				class="themeplate-color-picker"
				value="' . esc_attr( $value ) . '"
				' . ( $default ? ' data-default-color="' . esc_attr( $default ) . '"' : '' );
		if ( ! empty( $this->get_config( 'options' ) ) ) {
			$values = wp_json_encode( $this->get_config( 'options' ) );

			echo ' data-palettes="' . esc_attr( $values ) . '"';
		}
		echo ' />';

	}

}
