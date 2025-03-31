<?php

/**
 * Helper functions
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Helper;

use _WP_Editors;
use CardanoPress\Dependencies\ThemePlate\Core\Field;

class FormHelper {


	public static function enqueue_assets( string $hook_suffix ): void {

		if ( wp_script_is( 'themeplate-script' ) ) {
			return;
		}

		$version = AssetsHelper::LOADER_VERSION;

		wp_enqueue_media();
		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'wp-color-picker' );
		wp_enqueue_style( 'editor-buttons' );
		wp_enqueue_script( 'wplink' );
		wp_enqueue_script( 'jquery-ui-sortable' );
		wp_enqueue_style( 'themeplate-select2-style', AssetsHelper::get_url( 'select2.min.css' ), array(), '4.0.13' );
		wp_enqueue_script( 'themeplate-select2-script', AssetsHelper::get_url( 'select2.full.min.js' ), array(), '4.0.13', true );
		wp_enqueue_style( 'themeplate-datepicker-style', AssetsHelper::get_url( 'datepicker.min.css' ), array(), '1.10.0' );
		wp_enqueue_script( 'themeplate-datepicker-script', AssetsHelper::get_url( 'datepicker.min.js' ), array(), '1.10.0', true );
		wp_add_inline_script( 'themeplate-datepicker-script', 'if ( ! jQuery.fn.bootstrapDP && jQuery.fn.datepicker && jQuery.fn.datepicker.noConflict ) jQuery.fn.bootstrapDP = jQuery.fn.datepicker.noConflict();' );
		wp_enqueue_style( 'themeplate-style', AssetsHelper::get_url( 'themeplate.css' ), array(), $version );
		wp_enqueue_script( 'themeplate-script', AssetsHelper::get_url( 'themeplate.js' ), array( 'wp-dom-ready' ), $version, true );
		wp_enqueue_script( 'themeplate-wysiwyg', AssetsHelper::get_url( 'wysiwyg.js' ), array( 'editor' ), $version, true );
		wp_enqueue_script( 'themeplate-show-hide', AssetsHelper::get_url( 'show-hide.js' ), array(), $version, true );
		wp_enqueue_script( 'themeplate-repeater', AssetsHelper::get_url( 'repeater.js' ), array(), $version, true );

		wp_localize_script(
			'themeplate-script',
			'ThemePlate',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce'    => wp_create_nonce( AssetsHelper::LOADER_ACTION ),
			)
		);

		if ( 'post.php' !== $hook_suffix ) {
			require_once ABSPATH . 'wp-includes/class-wp-editor.php';

			_WP_Editors::wp_link_dialog();

			return;
		}

		if ( function_exists( 'use_block_editor_for_post' ) && use_block_editor_for_post( get_the_ID() ) ) {
			wp_enqueue_script( 'themeplate-show-hide-gutenberg', AssetsHelper::get_url( 'show-hide-gutenberg.js' ), array(), $version, true );
		} else {
			wp_enqueue_script( 'themeplate-show-hide-classic', AssetsHelper::get_url( 'show-hide-classic.js' ), array(), $version, true );
		}

	}


	public static function get_field_class( string $type ): string {

		switch ( $type ) {
			default:
			case 'text':
			case 'time':
			case 'email':
			case 'url':
				return Field\InputField::class;

			case 'textarea':
				return Field\TextareaField::class;

			case 'date':
				return Field\DateField::class;

			case 'select':
			case 'select2':
				return Field\SelectField::class;

			case 'radiolist':
			case 'radio':
				return Field\RadioField::class;

			case 'checklist':
			case 'checkbox':
				return Field\CheckboxField::class;

			case 'color':
				return Field\ColorField::class;

			case 'file':
				return Field\FileField::class;

			case 'number':
			case 'range':
				return Field\NumberField::class;

			case 'editor':
				return Field\EditorField::class;

			case 'type':
			case 'post':
			case 'page':
			case 'user':
			case 'term':
				return Field\TypeField::class;

			case 'html':
				return Field\HtmlField::class;

			case 'link':
				return Field\LinkField::class;

			case 'group':
				return Field\GroupField::class;
		}

	}


	public static function make_field( string $data_key, array $config ): Field {

		$type = self::get_field_class( $config['type'] ?? '' );

		return new $type( $data_key, $config );

	}

}
