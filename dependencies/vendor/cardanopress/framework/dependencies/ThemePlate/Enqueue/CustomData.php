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

	private array $scripts = array();
	private array $styles  = array();


	public function filter( array $data, string $type ): array {

		if ( ! in_array( $type, array( 'scripts', 'styles' ), true ) ) {
			_doing_it_wrong( __METHOD__, esc_attr( 'Only "scripts" and "styles" are known types' ), '2.3.0' );
			return array();
		}

		_deprecated_function( __METHOD__, '2.4.0', esc_html( __NAMESPACE__ . '\\' . ucfirst( $type ) . 'Tag::filter_attributes' ) );

		return ( 'scripts' === $type ? ScriptsTag::filter_attributes( $data ) : StylesTag::filter_attributes( $data ) );

	}


	public function add( string $type, string $handle, array $data ): void {

		if ( ! in_array( $type, array( 'script', 'style' ), true ) ) {
			_doing_it_wrong( __METHOD__, esc_attr( 'Only "script" and "style" are known types' ), '2.2.0' );
			return;
		}

		_deprecated_function( __METHOD__, '2.4.0', esc_html( self::class . '::' . $type ) );

		$this->{$type . 's'}[ $handle ] = $data;

	}


	public function script( string $handle, array $data ): void {

		$this->scripts[ $handle ] = $data;

	}


	public function style( string $handle, array $data ): void {

		$this->styles[ $handle ] = $data;

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
				$specified = ( 'scripts' === $type ? ScriptsTag::filter_attributes( $dependency->extra ) : StylesTag::filter_attributes( $dependency->extra ) );

				if ( ! empty( $specified ) ) {
					$this->{$type}[ $dependency->handle ] = $specified;
				}
			}
		}

	}


	public function action(): void {

		if ( ! empty( $this->scripts ) ) {
			$script_tag = new ScriptsTag( $this->scripts );

			add_filter( 'script_loader_tag', array( $script_tag, 'filter' ), 10, 2 );
		}

		if ( ! empty( $this->styles ) ) {
			$style_tag = new StylesTag( $this->styles );

			add_filter( 'style_loader_tag', array( $style_tag, 'filter' ), 10, 2 );
		}

	}

}
