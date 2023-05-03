<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Cache\Storages;

class OptionsStorage extends AbstractStorage {

	public function get( string $key, bool $data = false ) {

		$key = $this->transform( $key, $data );

		return $this->collection[ $key ] ?? get_option( $key, false );

	}


	public function set( string $key, $value, bool $data = false ): bool {

		$key = $this->transform( $key, $data );

		$this->collection[ $key ] = $value;

		return update_option( $key, $value, $data ? 'no' : 'yes' );

	}


	public function delete( string $key, bool $data = false ): bool {

		$key = $this->transform( $key, $data );

		if ( array_key_exists( $key, $this->collection ?? array() ) ) {
			unset( $this->collection[ $key ] );
		}

		return delete_option( $key );

	}


	public function point( int $id ): void {}


	public function pointer(): int {

		return 0;

	}

}
