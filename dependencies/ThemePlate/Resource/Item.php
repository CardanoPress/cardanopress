<?php

/**
 * Helper for resource hinting
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Resource;

class Item {

	private array $attributes;

	public const ATTRIBUTES = array(
		'rel',
		'href',
		'as',
		'type',
	);


	public function __construct( string $url, string $directive ) {

		$this->attributes = array(
			'rel'  => $directive,
			'href' => $url,
		);

	}


	public function extra( array $attributes = array() ): self {

		$this->attributes = array_merge(
			array_fill_keys( self::ATTRIBUTES, '' ),
			$attributes,
			$this->attributes
		);

		return $this;

	}


	public function tag(): void {

		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo "<link {$this->stringify( $this->attributes )} />" . PHP_EOL;

	}


	private function stringify( array $attributes ): string {

		$string = '';

		foreach ( array_filter( $attributes ) as $attr => $value ) {
			$value = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );

			if ( ! is_string( $attr ) ) {
				$string .= " $value";
			} else {
				$string .= " $attr='$value'";
			}
		}

		return trim( $string );

	}

}
