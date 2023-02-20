<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 */

namespace CardanoPress\Dependencies\ThemePlate\Core;

class Config {

	protected string $prefix;
	protected Fields $fields;


	public function __construct( string $prefix, ?Fields $fields ) {

		$this->prefix = $prefix;
		$this->fields = $this->process( $fields );

	}


	protected function process( ?Fields $fields ): Fields {

		$collection = array();

		if ( null !== $fields ) {
			foreach ( $fields->get_collection() as $field ) {
				$collection[ $field->data_key( $this->prefix ) ] = $field->get_config();
			}
		}

		return new Fields( $collection );

	}


	/**
	 * @return Field[]
	 */
	public function get_fields(): array {

		return $this->fields->get_collection();

	}

}
