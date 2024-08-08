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

class LinkField extends Field {

	public const DEFAULT_VALUE = array(
		'url'    => '',
		'text'   => '',
		'target' => '',
	);


	protected function initialize(): void {

		$this->config['default'] = $this->values_structure( $this->config['default'] );

	}


	private function values_structure( array $default_value ): array {

		if ( MainHelper::is_sequential( $default_value ) ) {
			return array_map( array( $this, 'values_structure' ), $default_value );
		}

		return array_intersect_key(
			MainHelper::fool_proof(
				static::DEFAULT_VALUE,
				$default_value
			),
			static::DEFAULT_VALUE
		);

	}


	public function render( $value ): void {

		echo '<div id="' . esc_attr( $this->get_config( 'id' ) ) . '" class="themeplate-link">';
		echo '<input type="button" class="button link-select" value="Select" />';
		echo '<input type="button" class="button link-remove' . ( empty( array_filter( (array) $value ) ) ? ' hidden' : '' ) . '" value="Remove" />';

		foreach ( array_keys( self::DEFAULT_VALUE ) as $attr_key ) {
			$attr_value = $value[ $attr_key ] ?? '';

			echo '<input
				type="hidden"
				class="input-' . esc_attr( $attr_key ) . '"
				name="' . esc_attr( $this->get_config( 'name' ) ) . '[' . esc_attr( $attr_key ) . ']"
				value="' . esc_attr( $attr_value ) .
				'">';
		}

		echo '<div class="link-holder">';

		if ( isset( $value['text'] ) ) {
			echo '<span>' . esc_html( $value['text'] ) . '</span>';
		}

		if ( isset( $value['url'] ) ) {
			echo '<a href="' . esc_url( $value['url'] ) . '" target="_blank">' . esc_html( $value['url'] ) . '</a>';
		}

		echo '</div>';
		echo '</div>';

	}

}
