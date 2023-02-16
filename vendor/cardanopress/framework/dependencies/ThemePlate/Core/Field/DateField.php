<?php

/**
 * Setup a field type
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Field;

use CardanoPress\Dependencies\ThemePlate\Core\Field;

class DateField extends Field {

	protected function can_have_multiple_value(): bool {

		return true;

	}


	public function render( $value ): void {

		echo '<div class="wrapper">';

		if ( $this->get_config( 'multiple' ) ) {
			echo '<div id="' . esc_attr( $this->get_config( 'id' ) ) . '" class="themeplate-date-picker multiple">';
			echo '<input
					type="hidden"
					name="' . esc_attr( $this->get_config( 'name' ) ) . '"
					value="' . esc_attr( $value ) . '"
					' . ( $this->get_config( 'none' ) ? ' data-none="true"' : '' );

			if ( ! empty( $this->get_config( 'options' ) ) ) {
				foreach ( $this->get_config( 'options' ) as $option_key => $option_value ) {
					echo 'data-date-' . esc_attr( $option_key ) . '="' . esc_attr( $option_value ) . '"';
				}
			}

			echo ' />';
			echo '</div>';
			echo '<ul class="ul-disc"></ul>';
		} else {
			echo '<input
					type="text"
					name="' . esc_attr( $this->get_config( 'name' ) ) . '"
					id="' . esc_attr( $this->get_config( 'id' ) ) . '"
					class="themeplate-date-picker single"
					value="' . esc_attr( $value ) . '"
					' . ( $this->get_config( 'none' ) ? ' data-none="true"' : '' );

			if ( ! empty( $this->get_config( 'options' ) ) ) {
				foreach ( $this->get_config( 'options' ) as $option_key => $option_value ) {
					echo 'data-date-' . esc_attr( $option_key ) . '="' . esc_attr( $option_value ) . '"';
				}
			}

			echo ' />';
		}

		echo '</div>';

	}

}
