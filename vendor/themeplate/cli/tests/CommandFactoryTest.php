<?php

/**
 * @package ThemePlate
 */

namespace Tests;

use PHPUnit\Framework\TestCase;
use Symfony\Component\Console\Command\Command;
use ThemePlate\CLI\CommandFactory;

class CommandFactoryTest extends TestCase {
	public function test_construct_and_invoke(): void {
		$command = new Command( 'test' );
		$factory = new CommandFactory( $command );

		$this->assertInstanceOf( Command::class, $factory() );
		$this->assertSame( $command, $factory() );
	}
}
