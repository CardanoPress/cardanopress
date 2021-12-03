<?php

/**
 * Setup a field type
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Field;

use ThemePlate\Core\Helper\Main;

class Editor {

	public static function render( $field ) {

		$defaults = array(
			'editor_class'  => 'themeplate-wysiwyg',
			'textarea_rows' => 10,
		);
		$settings = Main::fool_proof( $defaults, $field['options'] );

		$settings['textarea_name'] = $field['name'];

		wp_editor( $field['value'], $field['id'], $settings );

	}

}
