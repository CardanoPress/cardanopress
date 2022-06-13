<?php

/**
 * Helper for registered dependencies
 *
 * @package ThemePlate
 * @since   0.1.0
 */

namespace ThemePlate;

use ThemePlate\Enqueue\CustomData;
use ThemePlate\Enqueue\Dynamic;

class Enqueue {

	private static Dynamic $dynamic;
	public static int $priority = 10;


	public static function init(): void {

		$custom_data   = new CustomData();
		self::$dynamic = new Dynamic();

		add_action( 'wp_enqueue_scripts', array( $custom_data, 'action' ), PHP_INT_MAX );
		add_action( 'wp_enqueue_scripts', array( self::$dynamic, 'action' ), self::$priority );

	}


	public static function asset( string $type, string $handle ): void {

		if ( ! in_array( $type, array( 'script', 'style' ), true ) ) {
			_doing_it_wrong( __METHOD__, esc_attr( 'Only "script" and "style" are known types' ), '2.0.0' );
			return;
		}

		_deprecated_function( __METHOD__, '2.0.0', esc_attr( __CLASS__ . '::' . $type ) );
		self::$dynamic->$type( $handle );

	}


	public static function script( string $handle, string $src = '', array $data = array() ): void {

		self::$dynamic->script( $handle, $src, $data );

	}


	public static function style( string $handle, string $src = '', array $data = array() ): void {

		self::$dynamic->style( $handle, $src, $data );

	}

}
