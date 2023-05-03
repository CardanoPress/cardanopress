<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Cache\Handlers;

class DataHandler extends AbstractHandler {

	public function get( string $key, array $data ) {

		if ( $this->forced_refresh( $key ) ) {
			return false;
		}

		$value = $this->storage->get( $key );

		if ( false !== $value && ! $this->background_update() && time() > $this->storage->get( $key, true ) ) {
			$action_update = $this->action_update( $key, $data );

			if ( $action_update ) {
				$value = $action_update;
			}
		}

		return $value;

	}


	public function set( string $key, array $data ) {

		$value = $data['callback']();

		if ( ! is_wp_error( $value ) ) {
			if ( ! is_object( $data['callback'] ) ) {
				$this->storage->set( $key, time() + $data['expiration'], true );
			}

			$this->storage->set( $key, $value );
		}

		return $value;

	}

}
