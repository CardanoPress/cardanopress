<?php

/**
 * Autoloaded functions
 *
 * @package ThemePlate
 * @since 0.1.0
 */


if ( function_exists( 'add_action' ) && ! function_exists( 'themeplate_core_ajax_actions' ) ) {
	function themeplate_core_ajax_actions() {
		add_action( 'wp_ajax_themeplate_type_posts', array( ThemePlate\Core\Field\TypeField::class, 'get_posts' ) );
		add_action( 'wp_ajax_themeplate_type_users', array( ThemePlate\Core\Field\TypeField::class, 'get_users' ) );
		add_action( 'wp_ajax_themeplate_type_terms', array( ThemePlate\Core\Field\TypeField::class, 'get_terms' ) );
	}

	themeplate_core_ajax_actions();
}

if ( ! defined( 'TP_CORE_VERSION' ) ) {
	define( 'TP_CORE_VERSION', '2.0.0' );
}
