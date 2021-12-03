<?php

/**
 * Helper functions
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Core\Helper;

use ThemePlate\Core\Field\Checkbox;
use ThemePlate\Core\Field\Color;
use ThemePlate\Core\Field\Date;
use ThemePlate\Core\Field\Editor;
use ThemePlate\Core\Field\File;
use ThemePlate\Core\Field\Html;
use ThemePlate\Core\Field\Input;
use ThemePlate\Core\Field\Link;
use ThemePlate\Core\Field\Number;
use ThemePlate\Core\Field\Type;
use ThemePlate\Core\Field\Radio;
use ThemePlate\Core\Field\Select;
use ThemePlate\Core\Field\Textarea;

class Field {

	public static function filter( $field ) {

		$defaults = array(
			'type'       => 'text',
			'options'    => array(),
			'multiple'   => false,
			'none'       => false,
			'default'    => '',
			'style'      => '',
			'repeatable' => false,
			'required'   => false,
			'column'     => false,
			'minimum'    => 0,
			'maximum'    => 0,
		);
		$field    = Main::fool_proof( $defaults, $field );
		$field    = Meta::normalize_options( $field );
		$field    = self::deprecate_check( $field );

		if ( $field['minimum'] < 0 ) {
			$field['minimum'] = 0;
		}

		if ( $field['maximum'] < 0 ) {
			$field['maximum'] = 0;
		}

		if ( $field['maximum'] && $field['maximum'] < $field['minimum'] ) {
			$field['maximum'] = $field['minimum'];
		}

		if ( $field['required'] && ! $field['minimum'] ) {
			$field['minimum'] = 1;
		}

		return $field;

	}


	public static function render( $field ) {

		$list = false;

		switch ( $field['type'] ) {
			default:
			case 'text':
			case 'time':
			case 'email':
			case 'url':
				Input::render( $field );
				break;

			case 'textarea':
				Textarea::render( $field );
				break;

			case 'date':
				Date::render( $field );
				break;

			case 'select':
			case 'select2':
				Select::render( $field );
				break;

			case 'radiolist':
				$list = true;
				// intentional fall-through
			case 'radio':
				Radio::render( $field, $list );
				break;

			case 'checklist':
				$list = true;
				// intentional fall-through
			case 'checkbox':
				Checkbox::render( $field, $list );
				break;

			case 'color':
				Color::render( $field );
				break;

			case 'file':
				File::render( $field );
				break;

			case 'number':
			case 'range':
				Number::render( $field );
				break;

			case 'editor':
				Editor::render( $field );
				break;

			case 'post':
			case 'page':
			case 'user':
			case 'term':
				Type::render( $field );
				break;

			case 'html':
				Html::render( $field );
				break;

			case 'link':
				Link::render( $field );
				break;
		}

	}


	public static function deprecate_check( $field ) {

		if ( ! empty( $field['name'] ) ) {
			$field['title'] = $field['name'];
		}

		if ( ! empty( $field['desc'] ) ) {
			$field['description'] = $field['desc'];
		}

		if ( ! empty( $field['std'] ) ) {
			$field['default'] = $field['std'];
		}

		return $field;

	}

}
