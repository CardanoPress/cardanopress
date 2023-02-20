<?php

/**
 * Setup a field type
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Field;

use CardanoPress\Dependencies\ThemePlate\Core\Field;

class HtmlField extends Field {

	public function render( $value ): void {

		echo wp_kses_post( $this->get_config( 'default' ) );

	}

}
