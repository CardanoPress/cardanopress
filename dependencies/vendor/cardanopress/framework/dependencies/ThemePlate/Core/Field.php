<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 */

namespace CardanoPress\Dependencies\ThemePlate\Core;

use CardanoPress\Dependencies\ThemePlate\Core\Helper\MainHelper;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\MetaHelper;

abstract class Field {

	public const DEFAULTS = array(
		'type'       => 'text',
		'options'    => array(),
		'multiple'   => false,
		'none'       => false,
		'style'      => '',
		'repeatable' => false,
		'required'   => false,
		'minimum'    => 0,
		'maximum'    => 0,
		'show_on'    => array(),
		'hide_on'    => array(),
		'count'      => 1,
	);

	public const DEFAULT_VALUE = '';
	public const MULTIPLE_ABLE = false;


	/**
	 * @var array<string, mixed>
	 */
	protected array $config;
	protected string $data_key;
	/**
	 * @var mixed
	 */
	protected $user_passed_default = '';


	/**
	 * @param array<string, mixed> $config
	 */
	public function __construct( string $data_key, array $config = array() ) {

		$this->data_key = $data_key;
		$this->config   = $this->check( $config );

		if ( method_exists( $this, 'initialize' ) ) {
			$this->initialize();
		}

	}


	/**
	 * @param mixed $value
	 */
	abstract public function render( $value ): void;


	/**
	 * @param array<string, mixed> $config
	 * @return array<string, mixed>
	 */
	protected function check( array $config ): array {

		$config = MainHelper::fool_proof(
			array_merge(
				self::DEFAULTS,
				array( 'default' => static::DEFAULT_VALUE ),
			),
			$config
		);
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

		$this->user_passed_default = $config['default'];

		if ( is_array( static::DEFAULT_VALUE ) ) {
			return $config;
		}

		if ( ! $this->can_have_multiple_value( $config ) ) {
			return $config;
		}

		$result = json_decode( $config['default'], true );

		if ( JSON_ERROR_NONE === json_last_error() ) {
			$config['default'] = $result;
		}

		$this->user_passed_default = $config['default'];

		if (
			(
				empty( $config['default'] ) ||
				! is_array( $config['default'] )
			) &&
			static::MULTIPLE_ABLE
		) {
			$config['default'] = (array) $config['default'];
		}

		if (
			$config['repeatable'] &&
			(
				! is_array( $config['default'] ) ||
				(
					static::MULTIPLE_ABLE && $config['multiple'] &&
					(
						! is_array( $config['default'][0] )
					)
				)
			)
		) {
			$config['default'] = array( $config['default'] );
		}

		return $config;

	}


	/**
	 * @param array<string, mixed> $config
	 */
	public function can_have_multiple_value( array $config ): bool {

		return ( static::MULTIPLE_ABLE && (bool) $config['multiple'] ) || (bool) $config['repeatable'];

	}


	public function data_key( string $prefix = '' ): string {

		return $prefix . $this->data_key;

	}


	/**
	 * @return mixed
	 */
	public function get_config( string $key = '' ) {

		if ( '' === $key ) {
			return $this->config;
		}

		return $this->config[ $key ] ?? null;

	}


	public function set_id( string $value ): void {

		$this->config['id'] = $value;

	}


	public function set_name( string $value ): void {

		$this->config['name'] = $value;

	}


	public function get_classname(): string {

		$classes = array(
			'type-' . $this->get_config( 'type' ),
			trim( $this->get_config( 'style' ) ),
		);

		return esc_attr( implode( ' ', array_filter( $classes ) ) );

	}


	/**
	 * @return mixed
	 */
	public function clone_value() {

		$value = $this->user_passed_default;

		if ( is_array( static::DEFAULT_VALUE ) ) {
			return MainHelper::is_sequential( $value ) ? array() : $value;
		}

		if ( static::MULTIPLE_ABLE && $this->get_config( 'multiple' ) ) {
			if ( MainHelper::for_repeatable( $value ) ) {
				return array();
			}

			return $value;
		}

		return is_array( $value ) ? '' : $value;

	}


	/**
	 * @param mixed $value
	 */
	public function maybe_adjust( &$value ): void {

		if ( ! $this->get_config( 'repeatable' ) ) {
			return;
		}

		if ( ! is_array( $value ) ) {
			$value = (array) $value;
		}

		if ( is_array( static::DEFAULT_VALUE ) && ! MainHelper::is_sequential( $value ) ) {
			$value = array( $value );
		}

		$current = count( $value );

		if ( $current < $this->get_config( 'minimum' ) ) {
			$balance = max( 0, (int) ( $this->get_config( 'minimum' ) - $current ) );
			$value   = array_merge( $value, array_fill( $current, $balance, $this->clone_value() ) );
		}

		if ( $this->get_config( 'maximum' ) && ( $current > $this->get_config( 'maximum' ) ) ) {
			$value = array_slice( $value, 0, $this->get_config( 'maximum' ) );
		}

		$this->config['count'] = count( $value );

	}

}
