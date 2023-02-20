<?php

/**
 * @package ThemePlate
 */

namespace ThemePlate\CLI;

use Symfony\Component\Console\Command\Command;

class CommandRegistry {

	protected static array $commands = array();


	public static function add( Command $command ): void {

		self::$commands[ $command->getName() ] = new CommandFactory( $command );

	}


	public static function dump(): array {

		return self::$commands;

	}

}
