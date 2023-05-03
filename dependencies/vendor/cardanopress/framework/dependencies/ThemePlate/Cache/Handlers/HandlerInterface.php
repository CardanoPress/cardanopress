<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Cache\Handlers;

use CardanoPress\Dependencies\ThemePlate\Cache\Storages\StorageInterface;
use CardanoPress\Dependencies\ThemePlate\Process\Tasks;

interface HandlerInterface {

	public function __construct( StorageInterface $storage, Tasks $tasks = null );


	/**
	 * @return mixed
	 */
	public function set( string $key, array $data );


	public static function update( string $storage, int $pointer, string $key, array $data );

}
