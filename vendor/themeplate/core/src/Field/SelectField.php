<?php

/**
 * Setup a field type
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Field;

use ThemePlate\Core\Field;
use ThemePlate\Core\Helper\MainHelper;

class SelectField extends Field {

	public function render( $value ): void {

		$config_options = $this->get_config( 'options' );
		$is_sequential  = MainHelper::is_sequential( $config_options );

		echo '<select' . ( 'select2' === $this->get_config( 'type' ) ? ' class="themeplate-select2"' : '' ) . '
				name="' . esc_attr( $this->get_config( 'name' ) ) . ( $this->get_config( 'multiple' ) ? '[]' : '' ) . '"
				id="' . esc_attr( $this->get_config( 'id' ) ) . '"
				' . ( $this->get_config( 'multiple' ) ? ' multiple="multiple"' : '' ) .
				( $this->get_config( 'none' ) ? ' data-none="true"' : '' ) .
				( $this->get_config( 'required' ) ? ' required="required"' : '' ) .
				'>';

		if ( 'select2' === $this->get_config( 'type' ) && ! $value ) {
			echo '<option></option>';
		} elseif (
			'select2' !== $this->get_config( 'type' ) &&
			(
				( $this->get_config( 'none' ) && $value ) ||
				( ! $this->get_config( 'multiple' ) && ! $value )
			)
		) {
			echo '<option value=""' .
				( $this->get_config( 'none' ) && $value ? '' : ' disabled hidden' ) .
				( esc_attr( $value ) ? '>' . esc_attr( __( '&mdash; None &mdash;' ) ) : ' selected>' .
				esc_attr( __( '&mdash; Select &mdash;' ) ) ) .
				'</option>';
		}

		if ( 'select2' === $this->get_config( 'type' ) && $this->get_config( 'multiple' ) && $value ) {
			$ordered = array();
			$values  = array_keys( $config_options );

			foreach ( (array) $value as $item ) {
				$item = ( $is_sequential ? (int) $item - 1 : $item );

				if ( ! in_array( (string) $item, array_map( 'strval', $values ), true ) ) {
					continue;
				}

				$ordered[ $item ] = $config_options[ $item ];

				unset( $config_options[ $item ] );
			}

			$config_options = $ordered + $config_options;
		}

		foreach ( $config_options as $option_value => $option_label ) {
			$option_value = ( $is_sequential ? $option_value + 1 : $option_value );

			echo '<option value="' . esc_attr( $option_value ) . '"';

			if ( in_array( (string) $option_value, (array) $value, true ) ) {
				echo ' selected="selected"';
			}

			echo '>' . esc_html( $option_label ) . '</option>';
		}

		echo '</select>';

	}

}
