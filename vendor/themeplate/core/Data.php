<?php

/**
 * Setup config data
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core;

use ThemePlate\Core\Helper\Field;

class Data {

	private $items = array();


	public function store( $config ) {

		$keys = 'options' === $config['object_type'] ? $config['page'] : $config['object_type'];

		foreach ( $config['fields'] as $field ) {
			foreach ( (array) $keys as $key ) {
				$this->items[ strtolower( $key ) ][ $config['id'] . '_' . $field['id'] ] = $field;
			}
		}

	}


	public function retrieve( $key, $id ) {

		if ( isset( $this->items[ strtolower( $key ) ][ $id ] ) ) {
			return $this->items[ strtolower( $key ) ][ $id ];
		}

		return Field::filter( array() );

	}


	public function get_default( $key, $id ) {

		$config = $this->retrieve( $key, $id );

		return isset( $config['default'] ) ? $config['default'] : '';

	}

}
