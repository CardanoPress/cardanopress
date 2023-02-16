<?php

/**
 * Setup options meta boxes
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Settings;

use CardanoPress\Dependencies\ThemePlate\Core\Config;
use CardanoPress\Dependencies\ThemePlate\Core\Form;
use CardanoPress\Dependencies\ThemePlate\Core\Handler;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\BoxHelper;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\FieldsHelper;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\FormHelper;

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

			add_filter( 'sanitize_option_' . $menu_page, array( $this, 'sanitize_option' ) );
			add_action( 'themeplate_page_' . $menu_page . '_load', array( FormHelper::class, 'enqueue_assets' ) );
			add_action( 'themeplate_settings_' . $section, array( $this, 'layout_postbox' ), $priority );
			add_filter( 'themeplate_setting_' . $menu_page . '_schema', array( $this, 'build_schema' ), $priority );
		}

		if ( did_action( 'init' ) ) {
			$this->register_setting();
		} else {
			add_action( 'init', array( $this, 'register_setting' ) ); // @codeCoverageIgnore
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


	public function build_schema( array $data ): array {

		if ( null === $this->fields ) {
			return $data;
		}

		$schema = FieldsHelper::build_schema( $this->fields, $this->config['data_prefix'] );

		return array_merge(
			$data,
			$schema,
		);

	}


	public function register_setting(): void {

		foreach ( $this->menu_pages as $menu_page ) {
			$schema = apply_filters( 'themeplate_setting_' . $menu_page . '_schema', array() );
			$args   = array(
				'default'      => array(),
				'type'         => 'object',
				'show_in_rest' => array(
					'schema' => array(
						'type'       => 'object',
						'properties' => $schema,
					),
				),
			);

			if ( ! empty( $schema ) ) {
				$args['default'] = array_map(
					function( $field ) {
						return $field['default'];
					},
					$schema
				);
			}

			register_setting( $menu_page, $menu_page, $args );
		}

	}

}
