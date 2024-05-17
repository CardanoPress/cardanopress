<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate;

use CardanoPress\Dependencies\Monolog\Logger as BaseLogger;
use CardanoPress\Dependencies\Monolog\Formatter\LineFormatter;
use CardanoPress\Dependencies\Monolog\Handler\RotatingFileHandler;

class Logger {

	private string $path;
	/**
	 * @var array<string, BaseLogger>
	 */
	private static array $instances = array();


	public function __construct( string $folder_name = 'logs', string $base_path = WP_CONTENT_DIR ) {

		$this->path = $this->prepare_pathname( $base_path, false ) . $this->prepare_pathname( $folder_name );

	}


	protected function prepare_pathname( string $value, bool $both_sides = true ): string {

		static $characters = '/\\ ';

		$value = rtrim( $value, $characters );

		if ( $both_sides ) {
			$value = ltrim( $value, $characters );
		}

		return $value . DIRECTORY_SEPARATOR;

	}


	public function get_path(): string {

		return rtrim( $this->path, DIRECTORY_SEPARATOR );

	}


	public function channel( string $name, bool $context = false ): BaseLogger {

		if ( ! isset( self::$instances[ $name ] ) ) {
			self::$instances[ $name ] = new BaseLogger(
				$name,
				array( $this->handler( $name ) ),
				array( $this->processor( $context ) )
			);
		}

		return self::$instances[ $name ];

	}


	protected function handler( string $channel ): RotatingFileHandler {

		$filename = $this->path . $channel . '.log';
		$handler  = new RotatingFileHandler(
			$filename,
			0,
			BaseLogger::DEBUG,
			true,
			0664,
			false
		);

		$handler->setFilenameFormat( '{date}/{filename}', 'Y/m/d' );
		$handler->setFormatter( $this->formatter() );

		return $handler;

	}


	protected function formatter(): LineFormatter {

		$format = "[%datetime%] %level_name% > %message% %context% %extra%\n";

		return new LineFormatter( $format, 'Y-m-d H:i:s', true, true );

	}


	protected function processor( bool $context ): callable {

		return static function ( $record ) use ( $context ) {

			$forced = array_key_exists( 'wp', $record['context'] ) ? 'wp' : array_search( 'wp', $record['context'], true );

			if ( $context || false !== $forced ) {
				$record['extra'] = array_merge(
					$record['extra'],
					array(
						'doing_cron' => defined( 'DOING_CRON' ) && DOING_CRON,
						'doing_ajax' => defined( 'DOING_AJAX' ) && DOING_AJAX,
						'is_admin'   => defined( 'WP_ADMIN' ) && WP_ADMIN,
					)
				);

				unset( $record['context'][ $forced ] );
			}

			return $record;

		};

	}

}
