<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Cache\Storages;

interface StorageInterface {

	public const PREFIX = 'tcs_';

	/**
	 * @return mixed
	 */
	public function get( string $key, bool $data = false );


	public function set( string $key, $value, bool $data = false ): bool;


	public function delete( string $key, bool $data = false ): bool;


	public function point( int $id ): void;


	public function pointer(): int;

}
