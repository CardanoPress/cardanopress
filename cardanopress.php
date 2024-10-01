<?php

/**
 * Plugin Name: CardanoPress
 * Plugin URI:  https://github.com/CardanoPress/cardanopress
 * Author:      CardanoPress
 * Author URI:  https://cardanopress.io
 * Description: Core plugin for the suite of CardanoPress plugins
 * Version:     1.22.0
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

use PBWebDev\CardanoPress\Application;
use PBWebDev\CardanoPress\Installer;

/* ==================================================
Global constants
================================================== */

if (! defined('CARDANOPRESS_FILE')) {
    define('CARDANOPRESS_FILE', __FILE__);
}

// Load the main plugin class
require_once plugin_dir_path(CARDANOPRESS_FILE) . 'dependencies/vendor/autoload_packages.php';

function cardanoPress(): Application
{
    static $application;

    if (null === $application) {
        $application = new Application(CARDANOPRESS_FILE);
    }

    return $application;
}

// Instantiate
cardanoPress()->setupHooks();
(new Installer(cardanoPress()))->setupHooks();
