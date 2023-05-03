<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Cache;

use CardanoPress\Dependencies\ThemePlate\Cache\Storages\OptionsStorage;
use CardanoPress\Dependencies\ThemePlate\Cache\Storages\PostMetaStorage;
use CardanoPress\Dependencies\ThemePlate\Cache\Storages\StorageInterface;
use CardanoPress\Dependencies\ThemePlate\Cache\Storages\TermMetaStorage;
use CardanoPress\Dependencies\ThemePlate\Cache\Storages\UserMetaStorage;

class StorageManager {

	private string $type;
	private StorageInterface $postmeta;
	private StorageInterface $termmeta;
	private StorageInterface $usermeta;
	private StorageInterface $options;


	public function __construct() {

		$this->postmeta = new PostMetaStorage();
		$this->termmeta = new TermMetaStorage();
		$this->usermeta = new UserMetaStorage();
		$this->options  = new OptionsStorage();

	}


	public function current(): string {

		return $this->type ?? 'options';

	}


	public function get(): StorageInterface {

		return $this->{$this->current()};

	}


	public function set( $field ): void {

		$decoded    = $this->decode( $field );
		$this->type = $decoded['type'];

		/** @var StorageInterface $storage */
		$storage = $this->{$decoded['type']};

		$storage->point( $decoded['id'] );

	}


	private function decode( $field ): array {

		$type = 'options';
		$id   = 0;

		if ( is_numeric( $field ) ) {
			$type = 'post';
			$id   = $field;
		} elseif ( is_string( $field ) ) {
			$i = strrpos( $field, '_' );

			if ( $i > 0 ) {
				$type = substr( $field, 0, $i );
				$id   = substr( $field, $i + 1 );
			}
		}

		if ( 'options' !== $type ) {
			$type .= 'meta';
		}

		if ( ! property_exists( $this, $type ) ) {
			$type = 'options';
		}

		$id = absint( $id );

		return compact( 'type', 'id' );

	}

}
