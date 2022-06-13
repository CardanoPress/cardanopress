<?php

/**
 * Setup a field type
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Field;

use ThemePlate\Core\Field;
use ThemePlate\Core\Helper\MainHelper;

class EditorField extends Field {

	public function render( $value ): void {

		$defaults = array(
			'editor_class'  => 'themeplate-wysiwyg',
			'textarea_rows' => 10,
		);
		$settings = MainHelper::fool_proof( $defaults, $this->get_config( 'options' ) );

		$settings['textarea_name'] = $this->get_config( 'name' );

		wp_editor( $value, $this->get_config( 'id' ), $settings );

	}

}
