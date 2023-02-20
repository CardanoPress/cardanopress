<?php

/**
 * @package ThemePlate
 */

namespace ThemePlate\Tester\Tests\Commands;

use Symfony\Component\Console\Application;
use Symfony\Component\Console\Tester\CommandTester;
use ThemePlate\Tester\AnalyseCommand;
use PHPUnit\Framework\TestCase;

class AnalyseCommandTest extends TestCase {
	public function testExecute(): void {
		$command = new AnalyseCommand();
		$tester  = new CommandTester( $command );

		( new Application() )->add( $command );
		ob_start();
		$tester->execute( array() );
		$this->assertIsString( ob_get_clean() );
		$tester->assertCommandIsSuccessful();
	}
}
