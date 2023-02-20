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

class RadioField extends Field {

	public function render( $value ): void {

		$seq = MainHelper::is_sequential( $this->get_config( 'options' ) );
		$tag = 'radiolist' === $this->get_config( 'type' ) ? 'p' : 'span';

		if ( ! empty( $this->get_config( 'options' ) ) ) {
			echo '<fieldset id="' . esc_attr( $this->get_config( 'id' ) ) . '">';

			foreach ( $this->get_config( 'options' ) as $option_value => $option_label ) {
				$option_value = ( $seq ? $option_value + 1 : $option_value );

				echo '<' . esc_attr( $tag ) . '>';
				echo '<label><input
						type="radio"
						name="' . esc_attr( $this->get_config( 'name' ) ) . '"
						value="' . esc_attr( $option_value ) . '"
						' . checked( $value, $option_value, false ) .
						( $this->get_config( 'required' ) ? ' required="required"' : '' ) .
						' />' . esc_html( $option_label ) . '</label>';
				echo '</' . esc_attr( $tag ) . '>';
			}

			echo '</fieldset>';
		}

	}

}
