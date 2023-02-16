<?php

/**
 * Helper for registered dependencies
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Enqueue;

class Dynamic {

	private array $scripts;
	private array $styles;
	private array $data = array(
		'scripts' => array(),
		'styles'  => array(),
	);


	public function action(): void {

		foreach ( array( 'scripts', 'styles' ) as $type ) {
			if ( ! empty( $this->{$type} ) ) {
				foreach ( $this->{$type} as $handle => $src ) {
					$function = 'wp_enqueue_' . rtrim( $type, 's' );

					$function( $handle, $src );
					$this->add( $type, $handle );
				}
			}
		}

	}


	private function add( string $type, string $handle ): void {

		if ( ! empty( $this->data[ $type ][ $handle ] ) ) {
			foreach ( $this->data[ $type ][ $handle ] as $attribute => $value ) {
				$function = 'wp_' . rtrim( $type, 's' ) . '_add_data';

				$function( $handle, $attribute, $value );
			}
		}

	}


	public function script( string $handle, string $src = '', array $data = array() ): void {

		$this->scripts[ $handle ] = $src;

		$this->data['scripts'][ $handle ] = $data;

	}


	public function style( string $handle, string $src = '', array $data = array() ): void {

		$this->styles[ $handle ] = $src;

		$this->data['styles'][ $handle ] = $data;

	}

}
