<?php

/**
 * @package ThemePlate
 */

namespace ThemePlate\Core;

class Repository {

	protected Handler $handler;
	protected array $items = array();


	public function __construct( Handler $handler ) {

		$this->handler = $handler;

	}


	public function store( Config $config ): void {

		$this->items += $config->get_fields();

	}


	public function search( string $key ): Field {

		return $this->items[ $key ] ?? $this->field( $key );

	}


	public function retrieve( string $key, string $current_id ) {

		$field = $this->search( $key );

		return $this->handler->get_value( $field, '', $current_id );

	}


	protected function field( $key ): Field {

		return new class( $key ) extends Field {
			public function render( $value ): void {}
		};

	}


	public function dump(): array {

		return $this->items;

	}

}
