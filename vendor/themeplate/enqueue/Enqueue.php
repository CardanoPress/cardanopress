<?php

/**
 * Helper for registered dependencies
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate;

class Enqueue {

	private static $storage    = array();
	private static $dynamics   = array();
	private static $attributes = array(
		'common' => array(
			'crossorigin',
			'integrity',
			'referrerpolicy',
		),
		'script' => array(
			'async',
			'defer',
			'nomodule',
			'nonce',
			'type',
		),
		'style'  => array(
			'disabled',
			'hreflang',
		),
	);


	public static function init() {

		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'action' ), PHP_INT_MAX );
		add_action( 'wp_enqueue_scripts', array( __CLASS__, 'dynamics' ) );

	}


	public static function asset( $type, $handle ) {

		self::$dynamics[ $type ][] = $handle;

	}


	public static function action() {

		global $wp_scripts, $wp_styles;

		foreach ( array( $wp_scripts, $wp_styles ) as $dependencies ) {
			if ( empty( $dependencies->queue ) || empty( $dependencies->registered ) ) {
				continue;
			}

			$type = get_class( $dependencies );
			$type = strtolower( substr( $type, 3, -1 ) );

			$attributes = array_merge( self::$attributes['common'], self::$attributes[ $type ] );

			foreach ( $dependencies->registered as $dependency ) {
				$specified = array_intersect( array_keys( $dependency->extra ), $attributes );

				if ( ! empty( $specified ) ) {
					foreach ( $specified as $attribute ) {
						self::$storage[ $type ][ $dependency->handle ][ $attribute ] = $dependency->extra[ $attribute ];
					}
				}
			}
		}

		if ( ! empty( self::$storage['script'] ) ) {
			add_filter( 'script_loader_tag', array( __CLASS__, 'hooker_script' ), 10, 2 );
		}

		if ( ! empty( self::$storage['style'] ) ) {
			add_filter( 'style_loader_tag', array( __CLASS__, 'hooker_style' ), 10, 2 );
		}

	}


	public static function hooker_script( $tag, $handle ) {

		if ( array_key_exists( $handle, self::$storage['script'] ) ) {
			$string = self::stringify( self::$storage['script'][ $handle ] );

			return str_replace( ' src', "$string src", $tag );
		}

		return $tag;

	}


	public static function hooker_style( $tag, $handle ) {

		if ( array_key_exists( $handle, self::$storage['style'] ) ) {
			$string = self::stringify( self::$storage['style'][ $handle ] );

			return str_replace( ' href=', "$string href=", $tag );
		}

		return $tag;

	}


	private static function stringify( $attributes ) {

		$string = '';

		foreach ( $attributes as $attr => $value ) {
			if ( is_bool( $value ) ) {
				$string .= " $attr";
			} else {
				$value   = esc_attr( $value );
				$string .= " $attr='$value'";
			}
		}

		return $string;

	}


	public static function dynamics() {

		foreach ( array( 'script', 'style' ) as $type ) {
			if ( ! empty( self::$dynamics[ $type ] ) ) {
				foreach ( self::$dynamics[ $type ] as $tag ) {
					$func = 'wp_enqueue_' . $type;

					$func( $tag );
				}
			}
		}

	}

}
