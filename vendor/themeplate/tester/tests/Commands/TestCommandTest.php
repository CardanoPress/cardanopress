<?php

/**
 * @package ThemePlate
 */

namespace ThemePlate\Tester\Tests\Commands;

use Symfony\Component\Console\Application;
use Symfony\Component\Console\Tester\CommandTester;
use ThemePlate\Tester\TestCommand;
use PHPUnit\Framework\TestCase;

class TestCommandTest extends TestCase {
	public function testExecute(): void {
		$command = new TestCommand();
		$tester  = new CommandTester( $command );

		( new Application() )->add( $command );

		$types = array(
			'default',
			'unit',
			'integration',
		);

		foreach ( $types as $type ) {
			ob_start();
			$tester->execute( array( '--type' => $type ) );
			$this->assertIsString( ob_get_clean() );
			$tester->assertCommandIsSuccessful();
		}
	}
}
