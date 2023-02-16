<?php

/**
 * Helper for registered dependencies
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Enqueue;

use WP_Dependencies;

class CustomData {

	public const ATTRIBUTES = array(
		'common'  => array(
			'blocking',
			'crossorigin',
			'integrity',
			'referrerpolicy',
			'type',
		),
		// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attributes
		'scripts' => array(
			'async',
			'defer',
			'nomodule',
			'nonce',
			'src',
		),
		// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/style#attributes
		'styles'  => array(
			'as',
			'href',
			'hreflang',
			'imagesizes',
			'imagesrcset',
			'media',
			'rel',
			'title',
		),
	);

	private array $scripts = array();
	private array $styles  = array();


	public function filter( array $data, string $type ): array {

		$attributes  = array_merge( self::ATTRIBUTES['common'], self::ATTRIBUTES[ $type ] );
		$intersected = array_intersect_key( $data, array_fill_keys( $attributes, '' ) );

		$custom = array_filter(
			$data,
			function( $key ) {
				return 'data-' === substr( $key, 0, 5 );
			},
			ARRAY_FILTER_USE_KEY
		);

		return array_merge( $intersected, $custom );

	}


	public function add( string $type, string $handle, array $data ): void {

		if ( ! in_array( $type, array( 'script', 'style' ), true ) ) {
			_doing_it_wrong( __METHOD__, esc_attr( 'Only "script" and "style" are known types' ), '2.2.0' );
			return;
		}

		$this->{$type . 's'}[ $handle ] = $data;

	}


	public function init(): void {

		global $wp_scripts, $wp_styles;

		/** @var WP_Dependencies $dependencies */
		foreach ( array( $wp_scripts, $wp_styles ) as $dependencies ) {
			if ( empty( $dependencies->queue ) ) {
				continue;
			}

			$type = get_class( $dependencies );
			$type = strtolower( substr( $type, 3 ) );

			foreach ( $dependencies->registered as $dependency ) {
				$specified = $this->filter( $dependency->extra, $type );

				if ( ! empty( $specified ) ) {
					$this->{$type}[ $dependency->handle ] = $specified;
				}
			}
		}

	}


	public function action(): void {

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
