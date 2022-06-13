<?php

/**
 * Setup options meta boxes
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Settings;

use ThemePlate\Core\Config;
use ThemePlate\Core\Form;
use ThemePlate\Core\Handler;
use ThemePlate\Core\Helper\BoxHelper;
use ThemePlate\Core\Helper\FormHelper;

class OptionBox extends Form {

	protected string $option_name = '';
	protected array $menu_pages   = array();


	protected function get_handler(): Handler {

		return new OptionHandler();

	}


	protected function initialize( array &$config ): void {
	}


	protected function fields_group_key(): string {

		return $this->option_name;

	}


	protected function maybe_nonce_fields( string $current_id ): void {

		$this->option_name = $current_id;

	}


	public function create(): void {

		$priority = BoxHelper::get_priority( $this->config );

		foreach ( $this->menu_pages as $menu_page ) {
			$section = $menu_page . '_' . $this->config['context'];

			register_setting( $menu_page, $menu_page );
			add_filter( 'default_option_' . $menu_page, '__return_empty_array' );
			add_filter( 'sanitize_option_' . $menu_page, array( $this, 'sanitize_option' ) );
			add_action( 'themeplate_page_' . $menu_page . '_load', array( FormHelper::class, 'enqueue_assets' ) );
			add_action( 'themeplate_settings_' . $section, array( $this, 'layout_postbox' ), $priority );
		}

	}


	public function location( string $page ): self {

		$this->menu_pages[] = $page;

		return $this;

	}


	public function sanitize_option( ?array $value ): array {

		if ( null === $value ) {
			return array();
		}

		return BoxHelper::prepare_save( $value );

	}


	public function get_config(): Config {

		return new Config( $this->config['data_prefix'], $this->fields );

	}

}
