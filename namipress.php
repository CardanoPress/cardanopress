<?php

/**
 * Plugin Name: NamiPress
 * Plugin URI:  https://github.com/pbwebdev/namipress
 * Author:      Gene Alyson Fortunado Torcende
 * Author URI:  mailto:genealyson.torcende@gmail.com
 * Description: A ThemePlate project for Nami Wallet integration
 * Version:     0.1.0
 * License:     GPL-2.0-only
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package ThemePlate
 * @since   0.1.0
 */

// Accessed directly
if (! defined('ABSPATH')) {
    exit;
}

use PBWebDev\NamiPress\Application;

/* ==================================================
Global constants
================================================== */

if (! defined('NAMIPRESS_FILE')) {
    define('NAMIPRESS_FILE', __FILE__);
}

// Load the main plugin class
require_once plugin_dir_path(NAMIPRESS_FILE) . 'vendor/autoload.php';

// Instantiate
Application::instance();

function namiPress(): Application
{
    return Application::instance();
}
