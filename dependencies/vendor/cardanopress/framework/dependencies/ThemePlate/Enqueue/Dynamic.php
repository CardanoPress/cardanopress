<?php

/**
 * Helper for registered dependencies
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Enqueue;

class Dynamic {

	/** @var array<string, string> */
	private array $scripts = array();

	/** @var array<string, string> */
	private array $styles = array();

	/** @var array<string, array<string, mixed>> */
	private array $data = array(
		'scripts' => array(),
		'styles'  => array(),
	);


	public function action(): void {

		foreach ( array( 'scripts', 'styles' ) as $type ) {
			foreach ( $this->{$type} as $handle => $src ) {
				/** @var non-falsy-string $function */
				$function = 'wp_enqueue_' . rtrim( $type, 's' );

				/** @var callable-string $function */
				$function( $handle, $src );
				$this->add( $type, $handle );
			}
		}

	}


	private function add( string $type, string $handle ): void {

		if ( ! empty( $this->data[ $type ][ $handle ] ) ) {
			foreach ( $this->data[ $type ][ $handle ] as $attribute => $value ) {
				/** @var non-falsy-string $function */
				$function = 'wp_' . rtrim( $type, 's' ) . '_add_data';

				/** @var callable-string $function */
				$function( $handle, $attribute, $value );
			}
		}

	}


	/** @param array<string, mixed> $data */
	public function script( string $handle, string $src = '', array $data = array() ): void {

		$this->scripts[ $handle ] = $src;

		$this->data['scripts'][ $handle ] = $data;

	}


	/** @param array<string, mixed> $data */
	public function style( string $handle, string $src = '', array $data = array() ): void {

		$this->styles[ $handle ] = $src;

		$this->data['styles'][ $handle ] = $data;

	}

}
