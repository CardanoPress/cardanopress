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

class TextareaField extends Field {

	public function render( $value ): void {

		$defaults = array( 'rows' => 4 );
		$attrs    = MainHelper::fool_proof( $defaults, $this->get_config( 'options' ) );

		echo '<textarea
			name="' . esc_attr( $this->get_config( 'name' ) ) . '"
			id="' . esc_attr( $this->get_config( 'id' ) ) . '" ';

		foreach ( $attrs as $attr_name => $attr_value ) {
			echo esc_attr( $attr_name ) . '="' . esc_attr( $attr_value ) . '"';
		}

		echo ( $this->get_config( 'required' ) ? ' required="required"' : '' ) . '>' .
			esc_textarea( $value ) .
			'</textarea>';

	}

}
