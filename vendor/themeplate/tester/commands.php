<?php

/**
 * @package ThemePlate
 */

namespace ThemePlate\Tester;

use ThemePlate\CLI\CommandRegistry;

foreach ( glob( __DIR__ . '/src/*Command.php' ) as $file ) {
	$class = __NAMESPACE__ . '\\' . basename( $file, '.php' );

	CommandRegistry::add( new $class() );
}
