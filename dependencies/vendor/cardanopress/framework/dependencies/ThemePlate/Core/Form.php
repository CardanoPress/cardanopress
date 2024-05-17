<?php

/**
 * Setup custom forms
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core;

use CardanoPress\Dependencies\ThemePlate\Core\Helper\AssetsHelper;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\MainHelper;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\MetaHelper;

abstract class Form {

	public const DEFAULTS = array(
		'description' => '',
		'data_prefix' => '',
		'style'       => '',
		'show_on'     => array(),
		'hide_on'     => array(),
		'context'     => 'normal',
		'priority'    => 'default',
	);


	protected ?Fields $fields = null;
	protected Handler $handler;
	protected array $config;
	protected string $title;


	public function __construct( string $title, array $config = array() ) {

		$this->title  = $title;
		$this->config = $this->check( $config );

		$this->handler = $this->get_handler();

	}


	abstract protected function get_handler(): Handler;


	abstract protected function initialize( array &$config ): void;


	abstract protected function fields_group_key(): string;


	abstract protected function maybe_nonce_fields( string $current_id ): void;


	abstract public function get_config(): Config;


	protected function check( array $config ): array {

		$config = MainHelper::fool_proof( self::DEFAULTS, $config );
		$config = MetaHelper::normalize_options( $config );

		$config['form_id'] = sanitize_title( $this->title );

		$this->initialize( $config );
		AssetsHelper::setup_loader();

		return $config;

	}


	public function fields( array $list ): self {

		$this->fields = new Fields( $list );

		return $this;

	}


	/** @noinspection PhpUnused */
	public function layout_postbox( string $current_id ): void {

		global $wp_version;

		printf( '<div id="themeplate_%s" class="tpo postbox">', esc_attr( $this->config['form_id'] ) );

		if ( version_compare( $wp_version, '5.5', '<' ) ) {
			echo '<button type="button" class="handlediv button-link" aria-expanded="true">';
				/* translators: %s: metabox title */
				echo '<span class="screen-reader-text">' . esc_html( sprintf( __( 'Toggle panel: %s' ), $this->title ) ) . '</span>';
				echo '<span class="toggle-indicator" aria-hidden="true"></span>';
			echo '</button>';

			echo '<h2 class="hndle"><span>' . esc_html( $this->title ) . '</span></h2>';
		} else {
			echo '<div class="postbox-header">';
				echo '<h2 class="hndle"><span>' . esc_html( $this->title ) . '</span></h2>';

				echo '<div class="handle-actions hide-if-no-js">';
					echo '<button type="button" class="handlediv button-link" aria-expanded="true">';
						/* translators: %s: metabox title */
						echo '<span class="screen-reader-text">' . esc_html( sprintf( __( 'Toggle panel: %s' ), $this->title ) ) . '</span>';
						echo '<span class="toggle-indicator" aria-hidden="true"></span>';
					echo '</button>';
				echo '</div>';
			echo '</div>';
		}

			echo '<div class="inside">';
				$this->layout_inside( $current_id );
			echo '</div>';
		echo '</div>';

	}


	public function layout_inside( string $current_id ): void {

		$prefix = $this->config['data_prefix'];

		$this->maybe_nonce_fields( $current_id );
		MetaHelper::render_options( $this->config );

		if ( ! empty( $this->config['description'] ) ) {
			echo '<p class="description">' . $this->config['description'] . '</p>'; // phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
		}

		echo '<div class="fields-container ' . esc_attr( $this->config['style'] ) . '">';

		if ( null !== $this->fields ) {
			foreach ( $this->fields->get_collection() as $field ) {
				if ( ! MetaHelper::should_display( $field->get_config(), $current_id ) ) {
					continue;
				}

				$field->set_id( $this->fields_group_key() . '_' . $field->data_key( $prefix ) );
				$field->set_name( $this->fields_group_key() . '[' . $field->data_key( $prefix ) . ']' );

				$value = $this->handler->get_value( $field, $prefix, $current_id );

				MainHelper::maybe_adjust( $field,$value );
				$this->fields->layout( $field, $value );
			}
		}

		echo '</div>';

	}

}
