<?php

/**
 * Helper for background process
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Process;

use Throwable;

class Async {

	private static array $storage = array();
	private string $identifier;
	/**
	 * @var callable
	 */
	private $callback_func;
	private array $callback_args;
	/**
	 * @var ?callable
	 */
	private $success_callback;
	/**
	 * @var ?callable
	 */
	private $error_callback;
	/**
	 * @var mixed
	 */
	private $success_output;
	private string $error_output = '';


	public function __construct( callable $callback_func, array $callback_args = array() ) {

		$this->callback_func = $callback_func;
		$this->callback_args = $callback_args;

		$this->generate_identifier();

		add_action( 'wp_ajax_' . $this->identifier, array( $this, 'handle' ) );
		add_action( 'wp_ajax_nopriv_' . $this->identifier, array( $this, 'handle' ) );

	}


	private function generate_identifier(): void {

		$cb_func = print_r( $this->callback_func, true ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions
		$cb_args = print_r( $this->callback_args, true ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions

		$this->identifier = 'tpa_' . md5( $cb_func . $cb_args );
		$base_identifier  = $this->identifier;

		if ( array_key_exists( $this->identifier, self::$storage ) ) {
			$count = self::$storage[ $this->identifier ] + 1;

			$this->identifier .= '_' . $count;

			self::$storage[ $base_identifier ] = $count;
		}

		self::$storage[ $this->identifier ] = 0;

	}


	public function get_identifier(): string {

		return $this->identifier;

	}


	public function handle(): void {

		session_write_close();

		if ( wp_verify_nonce( $_REQUEST['nonce'], $this->identifier ) ) {
			try {
				$this->success_output = call_user_func_array( $this->callback_func, $this->callback_args );
			} catch ( Throwable $e ) {
				$this->error_output = $e->getMessage();
			} finally {
				$this->trigger();
			}
		}

		wp_die();

	}


	public function dispatch( string $custom_url = null ): bool {

		$post_url  = $custom_url ?: admin_url( 'admin-ajax.php' );
		$post_args = array(
			'timeout'   => defined( 'PROCESS_ASYNC_TIMEOUT' ) ? PROCESS_ASYNC_TIMEOUT : 1,
			'blocking'  => false,
			'body'      => array(
				'action' => $this->identifier,
				'nonce'  => wp_create_nonce( $this->identifier ),
				'data'   => array(
					'callback_func' => $this->callback_func,
					'callback_args' => $this->callback_args,
				),
			),
			'cookies'   => $_COOKIE,
			'sslverify' => apply_filters( 'https_local_ssl_verify', false ),
		);

		$response = wp_remote_post( esc_url_raw( $post_url ), $post_args );

		return is_wp_error( $response );

	}


	public function then( callable $callback ): Async {

		$this->success_callback = $callback;

		return $this;

	}


	public function catch( callable $callback ): Async {

		$this->error_callback = $callback;

		return $this;

	}


	private function trigger(): void {

		if ( $this->error_callback && $this->error_output ) {
			call_user_func( $this->error_callback, $this->error_output );
		}

		if ( $this->success_callback && $this->success_output ) {
			call_user_func( $this->success_callback, $this->success_output );
		}

	}

}
