<?php

/**
 * Setup options meta boxes
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Settings;

use CardanoPress\Dependencies\ThemePlate\Core\Handler;
use CardanoPress\Dependencies\ThemePlate\Core\Field;

class OptionHandler extends Handler {

	protected ?array $saved_values = null;


	public function get_value( Field $field, string $data_prefix, string $current_id ) {

		if ( null === $this->saved_values ) {
			$this->saved_values = get_option( $current_id );
		}

		$stored = $this->saved_values[ $field->data_key( $data_prefix ) ] ?? '';

		// phpcs:ignore WordPress.PHP.DisallowShortTernary.Found
		return $stored ?: $field->get_config( 'default' );

	}

}
