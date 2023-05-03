<?php

/**
 * Helper for background tasks
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Process;

use Throwable;

class Tasks {

	private string $identifier;
	private Async $async;

	/**
	 * @var callable[]
	 */
	private array $report_callback = array();

	private int $start   = 0;
	private int $end     = 0;
	private int $limit   = 0;
	private int $every   = 0;
	private array $tasks = array();


	public function __construct( string $identifier ) {

		$this->identifier = 'tpt_' . $identifier;
		$this->async      = new Async( array( $this, 'runner' ), array( $this->identifier ) );

		add_action( $this->identifier . '_event', array( $this, 'runner' ) );
		// phpcs:ignore WordPress.WP.CronInterval.ChangeDetected
		add_filter( 'cron_schedules', array( $this, 'maybe_schedule' ) );

		// phpcs:ignore WordPress.Security.NonceVerification
		if ( ! wp_doing_cron() && ( ! wp_doing_ajax() || $_REQUEST['action'] !== $this->get_identifier() ) ) {
			add_action( 'init', array( $this, 'maybe_run' ) );
			add_action( 'shutdown', array( $this, 'execute' ) );
		}

	}


	public function get_identifier(): string {

		return $this->async->get_identifier();

	}


	private function set_defaults(): void {

		if ( ! $this->limit && $this->every ) {
			$this->limit = 1;
		}

		if ( ! $this->every && $this->limit ) {
			$this->every = 60;
		}

	}


	public function runner( string $identifier ): void {

		$this->identifier = $identifier;

		if ( $this->is_running() || ! $this->has_queued() ) {
			return;
		}

		$queued = $this->get_queued();
		$total  = count( $queued['tasks'] );

		if ( ! $total ) {
			$this->delete( $queued['key'] );
			return;
		}

		$this->set_defaults();
		$this->lock();
		$this->schedule();

		$done  = array();
		$index = 0;

		if ( ! $this->limit || $this->limit > $total ) {
			$this->limit = $total;
		}

		while ( $index < $this->limit ) {
			$task = $queued['tasks'][ $index ];

			try {
				$output = call_user_func_array( $task['callback_func'], $task['callback_args'] );
			} catch ( Throwable $e ) {
				$output = $e->getMessage();
			}

			$done[ $index ] = compact( 'task', 'output' );

			unset( $queued['tasks'][ $index ] );
			$index ++;

			if ( empty( $queued['tasks'] ) ) {
				$this->delete( $queued['key'] );
			} else {
				$this->save( $queued['tasks'], $queued['key'] );
			}
		}

		$this->unlock();
		$this->reporter( $done );

		if ( ! $this->has_queued() ) {
			$this->unschedule();
		}

	}


	public function execute(): bool {

		if ( empty( $this->tasks ) ) {
			return false;
		}

		$this->save( $this->tasks );
		$this->clear();

		return ! $this->async->dispatch();

	}


	public function add( callable $callback_func, array $callback_args = array() ): Tasks {

		$this->tasks[] = compact( 'callback_func', 'callback_args' );

		return $this;

	}


	public function remove( callable $callback_func, array $callback_args = array() ): Tasks {

		$index = array_search( compact( 'callback_func', 'callback_args' ), $this->tasks, true );

		if ( false !== $index ) {
			unset( $this->tasks[ $index ] );
		}

		return $this;

	}


	public function clear(): Tasks {

		$this->tasks = array();

		return $this;

	}


	public function limit( int $number ): Tasks {

		$this->limit = $number;

		$this->set_defaults();

		return $this;

	}


	public function every( int $second ): Tasks {

		$this->every = $second;

		$this->set_defaults();

		return $this;

	}


	public function report( callable $callback ): Tasks {

		$this->report_callback[] = $callback;

		return $this;

	}


	public function dump(): array {

		$this->set_defaults();

		return array(
			'limit'  => $this->limit,
			'every'  => $this->every,
			'tasks'  => $this->tasks,
			'report' => $this->report_callback,
		);

	}


	public function maybe_schedule( $schedules ) {

		if ( $this->limit ) {
			$schedules[ $this->identifier . '_interval' ] = array(
				'interval' => $this->every,
				/* translators: %s: number of seconds */
				'display'  => sprintf( __( 'Every %d Seconds' ), $this->every ),
			);
		}

		return $schedules;

	}


	public function maybe_run(): void {

		if ( $this->has_queued() && ! $this->next_scheduled() && ! $this->is_running() ) {
			$this->runner( $this->identifier );
		}

	}


	private function save( array $tasks, string $key = null ): void {

		if ( null === $key ) {
			$key = $this->generate_key();
		}

		update_option( $key, array_values( $tasks ), false );

	}


	private function delete( string $key ): void {

		delete_option( $key );

	}


	public function is_running() {

		return get_transient( $this->identifier . '_lock' );

	}


	private function lock(): void {

		$this->start = time();

		if ( $this->every ) {
			$timeout = $this->every * 2;
		} else {
			$timeout = 2 * MINUTE_IN_SECONDS;
		}

		set_transient( $this->identifier . '_lock', $this->start, $timeout );

	}


	private function unlock(): void {

		$this->end = time();

		delete_transient( $this->identifier . '_lock' );

	}


	public function next_scheduled(): int {

		return wp_next_scheduled( $this->identifier . '_event', array( $this->identifier ) );

	}


	private function schedule(): void {

		if ( ! $this->next_scheduled() ) {
			wp_schedule_event(
				$this->start + $this->every,
				$this->identifier . '_interval',
				$this->identifier . '_event',
				array( $this->identifier )
			);
		}

	}


	private function unschedule(): void {

		$timestamp = $this->next_scheduled();

		if ( $timestamp ) {
			wp_unschedule_event( $timestamp, $this->identifier . '_event', array( $this->identifier ) );
		}

	}


	private function reporter( array $done ): void {

		if ( empty( $this->report_callback ) ) {
			return;
		}

		foreach ( $this->report_callback as $report_callback ) {
			$report_callback( new Report( $done, $this->start, $this->end ) );
		}

	}


	private function generate_key(): string {

		return $this->identifier . '_tasks_' . microtime( true );

	}


	public function has_queued(): bool {

		global $wpdb;

		$key = $wpdb->esc_like( $this->identifier . '_tasks_' ) . '%';
		$sql = "SELECT COUNT(*) FROM $wpdb->options WHERE `option_name` LIKE %s";

		return $wpdb->get_var( $wpdb->prepare( $sql, $key ) ) > 0; // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

	}


	public function get_queued(): array {

		global $wpdb;

		$key = $wpdb->esc_like( $this->identifier . '_tasks_' ) . '%';
		$sql = "SELECT * FROM $wpdb->options WHERE `option_name` LIKE %s ORDER BY `option_id` ASC LIMIT 1";
		$row = $wpdb->get_row( $wpdb->prepare( $sql, $key ) ); // phpcs:ignore WordPress.DB.PreparedSQL.NotPrepared

		return array(
			'key'   => $row->option_name,
			'tasks' => maybe_unserialize( $row->option_value ),
		);

	}

}
