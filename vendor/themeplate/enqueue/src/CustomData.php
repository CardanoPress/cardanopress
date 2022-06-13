<?php

/**
 * Helper for registered dependencies
 *
 * @package ThemePlate
 * @since   0.1.0
 */

namespace ThemePlate\Enqueue;

use WP_Dependencies;

class CustomData {

	public const ATTRIBUTES = array(
		'common'  => array(
			'crossorigin',
			'integrity',
			'referrerpolicy',
		),
		'scripts' => array(
			'async',
			'defer',
			'nomodule',
			'nonce',
			'type',
		),
		'styles'  => array(
			'disabled',
			'hreflang',
		),
	);

	private array $scripts = array();
	private array $styles  = array();


	public function action(): void {

		global $wp_scripts, $wp_styles;

		/** @var WP_Dependencies $dependencies */
		foreach ( array( $wp_scripts, $wp_styles ) as $dependencies ) {
			if ( empty( $dependencies->queue ) ) {
				continue;
			}

			$type = get_class( $dependencies );
			$type = strtolower( substr( $type, 3 ) );

			$attributes = array_merge( self::ATTRIBUTES['common'], self::ATTRIBUTES[ $type ] );

			foreach ( $dependencies->registered as $dependency ) {
				$specified = array_intersect( array_keys( $dependency->extra ), $attributes );

				if ( ! empty( $specified ) ) {
					foreach ( $specified as $attribute ) {
						$this->{$type}[ $dependency->handle ][ $attribute ] = $dependency->extra[ $attribute ];
					}
				}
			}
		}

		if ( ! empty( $this->scripts ) ) {
			add_filter( 'script_loader_tag', array( $this, 'script' ), 10, 2 );
		}

		if ( ! empty( $this->styles ) ) {
			add_filter( 'style_loader_tag', array( $this, 'style' ), 10, 2 );
		}

	}


	public function script( string $tag, string $handle ): string {

		if ( array_key_exists( $handle, $this->scripts ) ) {
			$string = $this->stringify( $this->scripts[ $handle ] );

			return str_replace( ' src', "$string src", $tag );
		}

		return $tag;

	}


	public function style( string $tag, string $handle ): string {

		if ( array_key_exists( $handle, $this->styles ) ) {
			$string = $this->stringify( $this->styles[ $handle ] );

			return str_replace( ' href=', "$string href=", $tag );
		}

		return $tag;

	}


	private function stringify( array $attributes ): string {

		$string = '';

		foreach ( array_filter( $attributes ) as $attr => $value ) {
			if ( is_array( $value ) ) {
				$value = $value[0];
			}

			if ( is_bool( $value ) ) {
				$string .= " $attr";
			} elseif ( ! is_array( $value ) ) {
				$value   = esc_attr( $value );
				$string .= " $attr='$value'";
			}
		}

		return $string;

	}

}
