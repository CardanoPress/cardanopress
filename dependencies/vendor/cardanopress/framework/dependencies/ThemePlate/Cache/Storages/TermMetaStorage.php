<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Cache\Storages;

class TermMetaStorage extends MetadataStorage {

	public function __construct() {

		parent::__construct( 'term' );

	}

}
