<?php

/**
 * Helper for registered dependencies
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Enqueue;

abstract class LoaderTag {

	protected array $dependencies;

	public const MAIN_PROPERTY = '';

	public const ATTRIBUTES = array(
		'blocking',
		'crossorigin',
		'integrity',
		'referrerpolicy',
	);

	/**
	 * @param array $dependencies List of dependencies to be handled with their attributes
	 */
	public function __construct( array $dependencies ) {

		$this->dependencies = $dependencies;

	}


	public function filter( string $tag, string $handle ): string {

		if ( array_key_exists( $handle, $this->dependencies ) ) {
			$property   = static::MAIN_PROPERTY;
			$attributes = $this->dependencies[ $handle ];

			if ( in_array( 'noscript', array_keys( $attributes ), true ) ) {
				unset( $attributes['noscript'] );

				$tag = '<noscript>' . $tag . '</noscript>';
			}

			$this->clean( $tag, $attributes, $property );

			$attributes = $this->stringify( $attributes );

			return str_replace( " $property=", "$attributes $property=", $tag );
		}

		return $tag;

	}


	public static function filter_attributes( array $data ): array {

		$attributes  = array_merge( self::ATTRIBUTES, static::ATTRIBUTES );
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


	private function clean( string &$tag, array &$attributes, string $property ): void {

		$pattern     = array();
		$replacement = array();

		foreach ( $attributes as $key => $value ) {
			$pattern[]     = "/ $key=['\"][^'\"]*['\"]/";
			$replacement[] = $property === $key ? " $property='$value'" : '';
		}

		unset( $attributes[ $property ] );

		$tag = preg_replace( $pattern, $replacement, $tag );

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
