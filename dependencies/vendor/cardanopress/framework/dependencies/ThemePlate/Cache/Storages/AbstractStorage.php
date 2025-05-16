<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Cache\Storages;

abstract class AbstractStorage implements StorageInterface {

	public const PREFIX = 'tcs_';


	/**
	 * @var array<int|string, mixed|array<string, mixed>> $collection
	 */
	protected array $collection = array();


	protected function transform( string $field_key, bool $is_data ): string {

		return ( $is_data ? static::PREFIX : '' ) . $field_key;

	}

}
