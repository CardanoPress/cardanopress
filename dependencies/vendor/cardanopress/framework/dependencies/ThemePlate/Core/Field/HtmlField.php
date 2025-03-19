<?php

/**
 * Setup a field type
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Field;

use CardanoPress\Dependencies\ThemePlate\Core\Field;

class HtmlField extends Field {

	protected function initialize(): void {

		$options = $this->get_config( 'options' );

		if ( empty( $options ) ) {
			return;
		}

		if ( isset( $options[0] ) && is_callable( $options[0] ) ) {
			$this->config['options'] = $options[0];
		}

	}


	private function handle( $value ): string {

		if ( is_callable( $this->get_config( 'options' ) ) ) {
			return call_user_func( $this->get_config( 'options' ), $value, $this->get_config() );
		}

		if ( is_string( $value ) ) {
			return $value;
		}

		if ( is_scalar( $value ) || null === $value ) {
			return (string) $value;
		}

		return wp_json_encode( $value );

	}


	public function render( $value ): void {

		if ( $this->get_config( 'required' ) ) {
			$config = array(
				'type' => 'hidden',
				'id'   => $this->get_config( 'id' ),
				'name' => $this->get_config( 'name' ),
			);

			( new InputField( '', $config ) )->render( $value );
		}

		echo wp_kses_post( $this->handle( $value ) );

	}

}
