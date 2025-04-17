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

	/** @param array<string, mixed>|array{} $config */
	public function __construct( string $title, array $config = array() ) {

		$this->config['icon_url'] = '';

		if ( array() !== $config ) {
			_deprecated_argument( __METHOD__, '2.5.0', 'Use the new ' . esc_html( self::class . '::config()' ) . ' instead.' );

			if ( isset( $config['capability'] ) ) {
				_deprecated_argument( __METHOD__, '2.5.0', 'Use the new ' . esc_html( self::class . '::capability()' ) . ' instead.' );
			}

			if ( isset( $config['menu_title'] ) ) {
				_deprecated_argument( __METHOD__, '2.5.0', 'Use the new ' . esc_html( self::class . '::title()' ) . ' instead.' );
			}

			if ( isset( $config['menu_slug'] ) ) {
				_deprecated_argument( __METHOD__, '2.5.0', 'Use the new ' . esc_html( self::class . '::slug()' ) . ' instead.' );
			}

			if ( isset( $config['position'] ) ) {
				_deprecated_argument( __METHOD__, '2.5.0', 'Use the new ' . esc_html( self::class . '::position()' ) . ' instead.' );
			}

			if ( isset( $config['icon_url'] ) ) {
				_deprecated_argument( __METHOD__, '2.5.0', 'Use the new ' . esc_html( self::class . '::icon()' ) . ' instead.' );
			}
		}

		$this->initialize( $title, $config );

	}


	public function icon( string $url ): self {

		$this->config['icon_url'] = $url;

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
