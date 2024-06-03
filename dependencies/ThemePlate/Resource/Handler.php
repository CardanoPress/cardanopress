<?php

/**
 * Helper for resource hinting
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Resource;

class Handler {

	private array $scripts = array();
	private array $styles  = array();


	public function script( string $handle, string $directive, array $extra = array() ): void {

		$this->scripts[ $handle ] = compact( 'directive', 'extra' );

	}


	public function style( string $handle, string $directive, array $extra = array() ): void {

		$this->styles[ $handle ] = compact( 'directive', 'extra' );

	}


	public function init(): void {

		_deprecated_function( __METHOD__, '2.1.0' );

	}


	public function action( string $status = 'enqueued' ): void {

		if ( '' === $status ) {
			$status = 'enqueued';
		}

		foreach ( array( 'script', 'style' ) as $type ) {
			foreach ( $this->{$type . 's'} as $handle => $attributes ) {
				$enqueued = 'script' === $type ? wp_script_is( $handle, $status ) : wp_style_is( $handle, $status );

				if ( ! $enqueued ) {
					continue;
				}

				$source = 'script' === $type ? Helper::get_script_src( $handle ) : Helper::get_style_src( $handle );

				if ( $source ) {
					( new Item( $source, $attributes['directive'] ) )
						->extra( array_merge(
							$attributes['extra'],
							array(
								'as' => in_array( $attributes['directive'], array( 'preload', 'prefetch' ), true ) ? $type : '',
							),
						) )
						->tag();
				}
			}
		}

	}

}
