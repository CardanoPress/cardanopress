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

class CheckboxField extends Field {

	public const MULTIPLE_ABLE = true;


	protected function initialize(): void {

		if ( ! empty( $this->get_config( 'options' ) ) ) {
			if ( ! is_array( $this->config['default'] ) ) {
				$result = json_decode( $this->config['default'], true );

				if ( JSON_ERROR_NONE === json_last_error() ) {
					$this->user_passed_default = $result;
					$this->config['default']   = $result;
				}
			}

			$this->config['multiple'] = true;
			$this->config['default']  = MainHelper::values_to_string( (array) $this->config['default'] );
		}

	}


	public function render( $value ): void {

		$seq = MainHelper::is_sequential( $this->get_config( 'options' ) );
		$tag = 'checklist' === $this->get_config( 'type' ) ? 'p' : 'span';

		echo '<input type="hidden" name="' . esc_attr( $this->get_config( 'name' ) ) . '" />';

		if ( ! empty( $this->get_config( 'options' ) ) ) {
			echo '<fieldset id="' . esc_attr( $this->get_config( 'id' ) ) . '">';

			foreach ( $this->get_config( 'options' ) as $option_value => $option_label ) {
				$option_value = ( $seq ? $option_value + 1 : $option_value );

				echo '<' . esc_attr( $tag ) . '>';
				echo '<label><input type="checkbox" name="' . esc_attr( $this->get_config( 'name' ) ) . '[]" value="' . esc_attr( $option_value ) . '"';

				if ( in_array( (string) $option_value, MainHelper::values_to_string( (array) $value ), true ) ) {
					echo ' checked="checked"';
				}

				echo ( $this->get_config( 'required' ) ? ' required="required"' : '' ) . ' />' . esc_html( $option_label ) . '</label>';
				echo '</' . esc_attr( $tag ) . '>';
			}

			echo '</fieldset>';
		} else {
			echo '<input
					type="checkbox"
					id="' . esc_attr( $this->get_config( 'id' ) ) . '"
					name="' . esc_attr( $this->get_config( 'name' ) ) . '"
					value="1"' . checked( $value, 1, false ) .
					' />';
		}

	}

}
