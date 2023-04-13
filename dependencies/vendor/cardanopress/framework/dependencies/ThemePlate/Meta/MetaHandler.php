<?php

/**
 * Setup meta boxes
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Meta;

use CardanoPress\Dependencies\ThemePlate\Core\Handler;
use CardanoPress\Dependencies\ThemePlate\Core\Field;

class MetaHandler extends Handler {

	protected string $data_type;


	public function __construct( string $data_type ) {

		$this->data_type = $data_type;

	}


	public function get_value( Field $field, string $data_prefix, string $current_id ) {

		$meta_key   = $field->data_key( $data_prefix );
		$repeatable = $field->get_config( 'repeatable' );

		$stored = get_metadata( $this->data_type, (int) $current_id, $meta_key, ! $repeatable ) ?? '';

		// phpcs:ignore WordPress.PHP.DisallowShortTernary.Found
		return $stored ?: $field->get_config( 'default' );

	}

}
