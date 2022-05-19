<?php

/**
 * Plugin Name: CardanoPress
 * Plugin URI:  https://github.com/pbwebdev/cardanopress
 * Author:      Gene Alyson Fortunado Torcende
 * Author URI:  https://pbwebdev.com
 * Description: A ThemePlate project for Cardano integration to WordPress
 * Version:     0.29.0
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

use PBWebDev\CardanoPress\Application;
use PBWebDev\CardanoPress\Installer;

/* ==================================================
Global constants
================================================== */

if (! defined('CARDANOPRESS_FILE')) {
    define('CARDANOPRESS_FILE', __FILE__);
}

// Load the main plugin class
require_once plugin_dir_path(CARDANOPRESS_FILE) . 'vendor/autoload.php';

// Instantiate the updater
EUM_Handler::run(CARDANOPRESS_FILE, 'https://raw.githubusercontent.com/pbwebdev/cardanopress/main/update-data.json');

// Instantiate
Application::instance();
register_activation_hook(CARDANOPRESS_FILE, [Installer::instance(), 'activate']);

function cardanoPress(): Application
{
    return Application::instance();
}
