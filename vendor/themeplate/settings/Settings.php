<?php

/**
 * Setup options meta boxes
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate;

use ThemePlate\Core\Form;
use ThemePlate\Core\Helper\Box;
use ThemePlate\Core\Helper\Main;
use ThemePlate\Core\Helper\Meta;

class Settings {

	private $config;
	private $form;
	private $page;


	public function __construct( $config ) {

		$expected = array(
			'id',
			'title',
			'page',
		);

		if ( ! Main::is_complete( $config, $expected ) ) {
			throw new \Exception();
		}

		$defaults = array(
			'show_on'  => array(),
			'hide_on'  => array(),
			'context'  => 'normal',
			'priority' => 'default',
		);
		$config   = Main::fool_proof( $defaults, $config );
		$config   = Meta::normalize_options( $config );

		$config['object_type'] = 'options';

		try {
			$this->form = new Form( $config );
		} catch ( \Exception $e ) {
			throw new \Exception( $e );
		}

		$config['fields'] = $this->form->get_fields();

		$this->config = $config;

		add_action( 'current_screen', array( $this, 'create' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'scripts_styles' ), 11 );

	}


	public function get_config() {

		return $this->config;

	}


	public function create() {

		if ( ! $this->is_valid_screen() ) {
			return;
		}

		$settings = $this->config;
		$section  = $this->page . '_' . $settings['context'];
		$priority = Box::get_priority( $settings );

		add_action( 'themeplate_settings_' . $section, array( $this, 'add' ), $priority );

	}


	public function add() {

		$this->form->layout_postbox( $this->page );

	}


	public function scripts_styles() {

		if ( ! $this->is_valid_screen() ) {
			return;
		}

		$this->form->enqueue( 'settings' );

	}


	private function is_valid_screen() {

		$screen = get_current_screen();

		if ( null === $screen || false === strpos( $screen->id, '_page_' ) ) {
			return false;
		}

		$page_s = (array) $this->config['page'];
		$sparts = explode( '_page_', $screen->id, 2 );

		foreach ( $page_s as $page ) {
			if ( $sparts[1] === $page ) {
				if ( ! Meta::should_display( $this->config, $page ) ) {
					return false;
				}

				$this->page = $page;

				return true;
			}
		}

		return false;

	}

}
