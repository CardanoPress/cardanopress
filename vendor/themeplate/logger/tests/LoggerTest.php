<?php

/**
 * @package ThemePlate
 */

namespace Tests;

use Monolog\Logger as BaseLogger;
use ThemePlate\Logger;
use WP_UnitTestCase;

class LoggerTest extends WP_UnitTestCase {
	public function test_default_path_is_at_wp_content_dir_named_logs(): void {
		$logger = new Logger();

		$this->assertSame( WP_CONTENT_DIR . '/logs', $logger->get_path() );
	}

	public function for_path_is_correctly_slashed_even_if_wrongly_supplied(): array {
		return array(
			'with 1 slash prefixed on folder name'     => array( -1 ),
			'with 1 slash suffixed on folder name'     => array( 1 ),
			'with 1 slash on both ends of folder name' => array( 0 ),
			'with 1 slash prefixed on folder name and trailing slash in base_path' => array( -1, true ),
			'with 1 slash suffixed on folder name and trailing slash in base_path' => array( 1, true ),
			'with 1 slash on both ends of folder name and trailing slash in base_path' => array( 0, true ),
		);
	}

	/**
	 * @dataProvider for_path_is_correctly_slashed_even_if_wrongly_supplied
	 */
	public function test_path_is_correctly_slashed_even_if_wrongly_supplied( int $slashed_folder_name, bool $trailing_slashed_base_path = false ): void {
		$folder_name = 'mylogs';
		$base_path   = 'path/to/save';
		$expect      = $base_path . '/' . $folder_name;

		if ( 0 <= $slashed_folder_name ) {
			$folder_name .= '/';
		}

		if ( 0 >= $slashed_folder_name ) {
			$folder_name = '/' . $folder_name;
		}

		if ( $trailing_slashed_base_path ) {
			$base_path .= '/';
		}

		$logger = new Logger( $folder_name, $base_path );

		$this->assertSame( $expect, $logger->get_path() );
	}

	public function for_every_channel_instances_are_cached(): array {
		return array(
			array( 'api' ),
			array( 'app' ),
		);
	}

	/**
	 * @dataProvider for_every_channel_instances_are_cached
	 */
	public function test_every_channel_instances_are_cached( string $name ): void {
		$logger = new Logger();

		$channel = $logger->channel( $name );

		$this->assertInstanceOf( BaseLogger::class, $channel );
		$this->assertSame( $channel, $logger->channel( $name ) );
		$this->assertSame( $channel, $logger->channel( $name ) );
	}
}
