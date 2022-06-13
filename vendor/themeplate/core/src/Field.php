<?php

/**
 * @package ThemePlate
 */

namespace ThemePlate\Core;

use ThemePlate\Core\Helper\MainHelper;
use ThemePlate\Core\Helper\MetaHelper;

abstract class Field {

	public const DEFAULTS = array(
		'type'       => 'text',
		'options'    => array(),
		'multiple'   => false,
		'none'       => false,
		'default'    => '',
		'style'      => '',
		'repeatable' => false,
		'required'   => false,
		'minimum'    => 0,
		'maximum'    => 0,
		'show_on'    => array(),
		'hide_on'    => array(),
		'count'      => 1,
	);


	protected array $config;
	protected string $data_key;


	public function __construct( string $data_key, array $config = array() ) {

		$this->data_key = $data_key;
		$this->config   = $this->check( $config );

	}


	abstract public function render( $value ): void;


	protected function check( array $config ): array {

		$config = MainHelper::fool_proof( self::DEFAULTS, $config );
		$config = MetaHelper::normalize_options( $config );

		if ( $config['minimum'] < 0 ) {
			$config['minimum'] = 0;
		}

		if ( $config['maximum'] < 0 ) {
			$config['maximum'] = 0;
		}

		if ( $config['maximum'] && $config['maximum'] < $config['minimum'] ) {
			$config['maximum'] = $config['minimum'];
		}

		if ( $config['required'] && ! $config['minimum'] ) {
			$config['minimum'] = 1;
		}

		return $config;

	}


	public function data_key( string $prefix = '' ): string {

		return $prefix . $this->data_key;

	}


	public function get_config( string $key = '' ) {

		if ( '' === $key ) {
			return $this->config;
		}

		return $this->config[ $key ] ?? '';

	}


	public function set_id( string $value ) {

		$this->config['id'] = $value;

	}


	public function set_name( string $value ) {

		$this->config['name'] = $value;

	}


	public function get_classname(): string {

		$classes = array(
			'type-' . $this->get_config( 'type' ),
			$this->get_config( 'style' ),
		);

		return esc_attr( implode( ' ', array_filter( $classes ) ) );

	}


	public function maybe_adjust( &$value ): void {

		$current = count( (array) $value );

		if ( $current < $this->get_config( 'minimum' ) ) {
			$balance = $this->get_config( 'minimum' ) - $current;
			$value   = array_merge( (array) $value, array_fill( $current, $balance, null ) );

			$this->config['count'] = count( (array) $value );
		}

	}

}
