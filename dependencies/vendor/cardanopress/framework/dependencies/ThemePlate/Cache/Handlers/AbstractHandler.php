<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Cache\Handlers;

use CardanoPress\Dependencies\ThemePlate\Cache\Storages\AbstractStorage;
use CardanoPress\Dependencies\ThemePlate\Process\Tasks;

abstract class AbstractHandler implements HandlerInterface {

	protected AbstractStorage $storage;
	protected ?Tasks $tasks;


	public function __construct( AbstractStorage $storage, ?Tasks $tasks = null ) {

		$this->storage = $storage;
		$this->tasks   = $tasks;

	}


	protected function forced_refresh( string $key ): bool {

		if ( function_exists( 'is_user_logged_in' ) && ! is_user_logged_in() ) {
			return false;
		}

		// phpcs:ignore WordPress.Security.NonceVerification
		if ( empty( $_REQUEST[ $this->storage::PREFIX . 'refresh' ] ) ) {
			return false;
		}

		// phpcs:ignore WordPress.Security.NonceVerification
		return in_array( $key, (array) $_REQUEST[ $this->storage::PREFIX . 'refresh' ], true );

	}


	protected function background_update(): bool {

		if ( ! $this->tasks instanceof Tasks ) {
			return false;
		}

		// phpcs:ignore WordPress.Security.NonceVerification
		return isset( $_REQUEST['action'] ) && ( $this->tasks->get_identifier() === $_REQUEST['action'] );

	}


	/**
	 * @param array<string, mixed> $data
	 *
	 * @return false|mixed
	 */
	protected function action_update( string $key, array $data ) {

		if ( ! $this->tasks instanceof Tasks ) {
			return $this->set( $key, $data );
		}

		$storage = get_class( $this->storage );
		$pointer = $this->storage->pointer();

		$this->storage->set( $key, time() + ( $data['expiration'] ?? MINUTE_IN_SECONDS ), true );
		$this->tasks->add( array( static::class, 'update' ), array( $storage, $pointer, $key, $data ) );

		return false;

	}


	public static function update( string $storage, int $pointer, string $key, array $data ) {

		$handler = static::class;
		/** @var AbstractStorage $storage */
		$storage = new $storage();

		$storage->point( $pointer );

		return ( new $handler( $storage ) )->set( $key, $data );

	}

}
