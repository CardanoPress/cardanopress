<?php

/**
 * @package ThemePlate
 */

namespace Tests;

use ThemePlate\Page\CommonInterface;
use ThemePlate\Page\SubMenuPage;

trait TestCommon {
	protected array $default = array(
		'page_title'  => 'Tester',
		'parent_slug' => 'options-general.php',
		'capability'  => 'moderate_comments',
		'menu_title'  => 'Test',
		'menu_slug'   => 'tester',
		'position'    => 2,
		'config'      => array(),
	);

	abstract protected function get_tested_instance( array $args ): CommonInterface;

	protected function generate_data_for_register_settings( string $page_title, string $menu_title, string $menu_slug, string $option_group_name ): array {
		$config = array();

		if ( '' !== $menu_title ) {
			$config['menu_title'] = $menu_title;
		}

		if ( '' !== $menu_slug ) {
			$config['menu_slug'] = $menu_slug;
		}

		$parent_slug = '';

		if ( $this->get_tested_instance( $this->default ) instanceof SubMenuPage ) {
			$parent_slug = $this->default['parent_slug'];
		}

		return array( compact( 'page_title', 'parent_slug', 'config' ), $option_group_name );
	}

	public function for_maybe_init_option(): array {
		// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
		return array(
			'with an empty list' => array(
				array(),
			),
			'with a list without our option name' => array(
				array(
					'default' => array(),
					'another' => array(),
				),
			),
			'with a list that already has our option name' => array(
				array(
					'random' => array(),
					$this->default['menu_slug'] => array(),
				),
			),
		);
		// phpcs:enable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
	}

	public function for_correctly_fired_hooks_and_assigned_variables(): array {
		// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
		return array(
			'with a space in page title' => $this->generate_data_for_register_settings(
				'Plugin Settings',
				'',
				'',
				'plugin-settings',
			),
			'with multiple space in page title' => $this->generate_data_for_register_settings(
				'Print or Download',
				'',
				'',
				'print-or-download',
			),
			'with custom menu title' => $this->generate_data_for_register_settings(
				'Print or Download',
				'Custom Menu',
				'',
				'custom-menu',
			),
			'with custom menu slug' => $this->generate_data_for_register_settings(
				'Print or Download',
				'Custom Menu',
				'my-custom_option',
				'my-custom_option',
			),
			'with crazy menu slug' => $this->generate_data_for_register_settings(
				'Print or Download',
				'Custom Menu',
				' e!xt@ a_1-2$ %',
				'ext-a_1-2',
			),
		);
		// phpcs:enable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
	}

	public function for_notices_method_echoing_a_message(): array {
		// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
		return array(
			'with nothing on request' => array(
				null,
				null,
			),
			'with a page only on request' => array(
				$this->default['menu_slug'],
				null,
			),
			'with updated only on request' => array(
				null,
				'true',
			),
			'with both on request' => array(
				$this->default['menu_slug'],
				'true',
			),
			'with page but not updated' => array(
				$this->default['menu_slug'],
				'false',
			),
		);
		// phpcs:enable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
	}
}
