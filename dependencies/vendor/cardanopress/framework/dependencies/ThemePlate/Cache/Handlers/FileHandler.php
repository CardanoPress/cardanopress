<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Cache\Handlers;

class FileHandler extends AbstractHandler {

	/**
	 * @return false|string
	 */
	public function get( string $key, string $path ) {

		if ( $this->forced_refresh( $key ) ) {
			return false;
		}

		$value = $this->storage->get( $key );

		if ( false !== $value && ! $this->background_update() ) {
			$time = @filemtime( $path ); // phpcs:ignore WordPress.PHP.NoSilencedErrors

			if ( $this->storage->get( $key, true ) < $time ) {
				$action_update = $this->action_update( $key, compact( 'path', 'time' ) );

				if ( $action_update ) {
					$value = $action_update;
				}
			}
		}

		return $value;

	}

	/**
	 * @return false|string
	 */
	public function set( string $key, array $data ) {

		// phpcs:ignore WordPress.PHP.NoSilencedErrors
		// phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
		$value = @file_get_contents( $data['path'] ); // phpcs:ignore

		if ( false !== $value ) {
			$this->storage->set( $key, $data['time'], true );
			$this->storage->set( $key, $value );
		}

		return $value;

	}

}
