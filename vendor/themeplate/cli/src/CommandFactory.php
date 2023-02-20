<?php

/**
 * @package ThemePlate
 */

namespace ThemePlate\CLI;

use Symfony\Component\Console\Command\Command;

class CommandFactory {

	protected Command $command;


	public function __construct( Command $command ) {

		$this->command = $command;

	}


	public function __invoke(): Command {

		return $this->command;

	}

}
