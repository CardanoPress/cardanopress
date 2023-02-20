<?php

/**
 * @package ThemePlate
 */

namespace ThemePlate\Tester;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Process\Process;

class FixCommand extends Command {

	// phpcs:disable WordPress.NamingConventions.ValidVariableName.PropertyNotSnakeCase
	protected static $defaultName        = 'fix';
	protected static $defaultDescription = 'Fix the codes';
	// phpcs:enable WordPress.NamingConventions.ValidVariableName.PropertyNotSnakeCase


	protected function configure(): void {

		$this->addArgument( 'path', InputArgument::OPTIONAL, 'Specify the fix path', './src' );
		$this->addArgument( 'extra', InputArgument::IS_ARRAY, 'To be passed to <info>phpcbf</info>', array() );

	}


	protected function execute( InputInterface $input, OutputInterface $output ): int {

		$base   = DIRECTORY_SEPARATOR . 'phpcs.xml';
		$config = dirname( __FILE__, 2 ) . $base;

		if ( file_exists( getcwd() . $base ) ) {
			$config = getcwd() . $base;
		}

		$args = array(
			'./vendor/bin/phpcbf',
			'--standard=' . $config,
			'--basepath=',
			$input->getArgument( 'path' ),
			...$input->getArgument( 'extra' ),
		);

		$process = new Process( $args );

		$process->run(
			function ( $type, $buffer ) {
				echo $buffer; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			}
		);

		return Command::SUCCESS;

	}

}
