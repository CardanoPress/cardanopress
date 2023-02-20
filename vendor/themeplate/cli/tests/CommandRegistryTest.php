<?php

/**
 * @package ThemePlate
 */

namespace Tests;

use PHPUnit\Framework\TestCase;
use Symfony\Component\Console\Command\Command;
use ThemePlate\CLI\CommandRegistry;

class CommandRegistryTest extends TestCase {
	public function test_add_and_dump(): void {
		for ( $i = 1; $i <= 2; $i++ ) {
			CommandRegistry::add( new Command( 'test' . $i ) );
			$this->assertArrayHasKey( 'test' . $i, CommandRegistry::dump() );
		}
	}
}
