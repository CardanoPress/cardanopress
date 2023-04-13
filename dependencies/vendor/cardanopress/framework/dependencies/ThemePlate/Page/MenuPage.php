<?php

/**
 * Setup options page
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Page;

use CardanoPress\Dependencies\ThemePlate\Page\Interfaces\MenuPageInterface;

class MenuPage extends BasePage implements MenuPageInterface {

	public function __construct( string $title, array $config = array() ) {

		$this->defaults['icon_url'] = '';

		$this->initialize( $title, $config );

	}


	public function icon( string $icon ): self {

		$this->config['icon_url'] = $icon;

		return $this;

	}


	public function menu(): void {

		$config = $this->config;

		$this->hookname = add_menu_page(
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
			// Icon URL
			$config['icon_url'],
			// Menu Order
			$config['position']
		);

		add_action( 'load-' . $this->hookname, array( $this, 'load' ) );

	}

}
