<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Process;

class Report {

	public array $data;
	public int $start;
	public int $end;

	public const DATE_FORMAT = 'Y-m-d H:i:s';


	public function __construct( array $data, int $start, int $end ) {

		$this->data  = $data;
		$this->start = $start;
		$this->end   = $end;

	}


	public function __toString(): string {

		$lines = array();

		// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_print_r
		$lines[] = 'Tasks: ' . print_r( $this->data, true );
		$lines[] = 'Start: ' . gmdate( self::DATE_FORMAT, $this->start );
		$lines[] = 'End: ' . gmdate( self::DATE_FORMAT, $this->end );

		return implode( "\n", $lines );

	}

}
