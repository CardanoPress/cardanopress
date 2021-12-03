<?php

/**
 * Setup a field type
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Field;

class Html {

	public static function render( $field ) {

		echo $field['default']; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped

	}

}
