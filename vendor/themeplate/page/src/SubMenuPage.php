<?php

/**
 * Setup options page
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Page;

class SubMenuPage extends BasePage {

	public function __construct( string $title, string $parent_slug, array $config = array() ) {

		$config['parent_slug'] = $parent_slug;

		$this->initialize( $title, $config );

	}


	public function menu(): void {

		$config = $this->config;

		$this->hookname = add_submenu_page(
			// Parent Slug
			$config['parent_slug'],
			// Page Title
			$this->title,
			// Menu Title
			$config['menu_title'],
			// Capability
			$config['capability'],
			// Menu Slug
			$config['menu_slug'],
			// Content Function
			array( $this, 'create' ),
			// Menu Order
			$config['position']
		);

		add_action( 'load-' . $this->hookname, array( $this, 'load' ) );

	}

}
