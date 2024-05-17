<?php

/**
 * Plugin Name: CardanoPress Framework
 * Plugin URI:  https://github.com/CardanoPress/framework
 * Author:      Gene Alyson Fortunado Torcende
 * Author URI:  https://cardanopress.io
 * Description: A ThemePlate project for Cardano WordPress integration
 * Version:     DEV-LATEST
 * License:     GPL-2.0-only
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * Text Domain: cardanopress
 *
 * Requires at least: 5.9
 * Requires PHP:      7.4
 *
 * @package ThemePlate
 * @since   0.1.0
 */

// Accessed directly
if (! defined('ABSPATH')) {
    exit;
}

/* ==================================================
Global constants
================================================== */

if (! defined('JETPACK_AUTOLOAD_DEV')) {
    define('JETPACK_AUTOLOAD_DEV', true);
}

if (! defined('CARDANOPRESS_FRAMEWORK_FILE')) {
    define('CARDANOPRESS_FRAMEWORK_FILE', __FILE__);
}

// Load the main plugin class
require_once plugin_dir_path(CARDANOPRESS_FRAMEWORK_FILE) . 'vendor/autoload_packages.php';
