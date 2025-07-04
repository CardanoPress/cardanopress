<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Cache;

use CardanoPress\Dependencies\ThemePlate\Cache\Handlers\DataHandler;
use CardanoPress\Dependencies\ThemePlate\Cache\Handlers\FileHandler;
use CardanoPress\Dependencies\ThemePlate\Process\Tasks;

class CacheManager {

	private StorageManager $storage;
	private ?Tasks $tasks;
	private string $last_field;


	public function __construct( ?Tasks $tasks = null ) {

		$this->storage = new StorageManager();
		$this->tasks   = $tasks;

	}


	/**
	 * @return mixed
	 */
	public function remember( string $key, callable $callback, int $expiration = 0 ) {

		$handler = new DataHandler( $this->storage->get(), $this->tasks );
		$data    = compact( 'expiration', 'callback' );
		$value   = $handler->get( $key, $data );

		if ( false === $value ) {
			return $handler->set( $key, $data );
		}

		return $value;

	}


	/**
	 * @param mixed $default_value
	 *
	 * @return mixed
	 */
	public function forget( string $key, $default_value = null ) {

		$value = ( $this->storage->get() )->get( $key );

		if ( false !== $value ) {
			( $this->storage->get() )->delete( $key );
			( $this->storage->get() )->delete( $key, true );

			return $value;
		}

		return $default_value;

	}


	/**
	 * @return false|string
	 */
	public function file( string $key, string $path ) {

		$handler = new FileHandler( $this->storage->get(), $this->tasks );
		$value   = $handler->get( $key, $path );

		if ( false === $value ) {
			$time  = (int) @filemtime( $path ); // phpcs:ignore WordPress.PHP.NoSilencedErrors
			$value = $handler->set( $key, compact( 'path', 'time' ) );
		}

		return $value;

	}


	/**
	 * @param int|string $field
	 */
	public function assign( $field ): CacheManager {

		$this->save_field();
		$this->storage->set( $field );

		return $this;

	}


	public function reset(): CacheManager {

		if ( isset( $this->last_field ) ) {
			$this->assign( $this->last_field );
		}

		return $this;

	}


	/**
	 * @return array{type: string, ID: int}
	 */
	public function assignment(): array {

		return array(
			'type' => $this->storage->current(),
			'ID'   => $this->storage->get()->pointer(),
		);

	}


	private function save_field(): void {

		$storage = $this->storage;
		$type    = $storage->current();

		if ( 'options' !== $type ) {
			$type = substr( $type, 0, -4 );
		}

		$this->last_field = $type . '_' . ( $storage->get() )->pointer();

	}

}
