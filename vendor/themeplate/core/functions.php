<?php

/**
 * Autoloaded functions
 *
 * @package ThemePlate
 * @since 0.1.0
 */


if ( function_exists( 'add_action' ) && ! function_exists( 'themeplate_ajax_actions' ) ) {
	function themeplate_ajax_actions() {
		add_action( 'wp_ajax_tp_posts', array( ThemePlate\Core\Field\Type::class, 'get_posts' ) );
		add_action( 'wp_ajax_tp_users', array( ThemePlate\Core\Field\Type::class, 'get_users' ) );
		add_action( 'wp_ajax_tp_terms', array( ThemePlate\Core\Field\Type::class, 'get_terms' ) );
	}

	themeplate_ajax_actions();
}

if ( ! defined( 'TP_CORE_VERSION' ) ) {
	define( 'TP_CORE_VERSION', '1.0.0' );
}

if ( ! defined( 'TP_CORE_PATH' ) ) {
	define( 'TP_CORE_PATH', __DIR__ );
}
