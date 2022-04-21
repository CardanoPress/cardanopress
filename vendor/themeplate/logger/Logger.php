<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace ThemePlate;

use Monolog\Logger as BaseLogger;
use Monolog\Formatter\LineFormatter;
use Monolog\Handler\RotatingFileHandler;

class Logger {

	private string $path;


	public function __construct( string $path = '' ) {

		if ( '' === $path ) {
			$path = trailingslashit( WP_CONTENT_DIR ) . 'logs';
		}

		$this->path = $path;

	}


	public function channel( string $name ): BaseLogger {

		return new BaseLogger( $name, array( $this->handler( $name ) ) );

	}


	protected function handler( string $channel ): RotatingFileHandler {

		$filename = trailingslashit( $this->path ) . $channel . '.log';
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

}
