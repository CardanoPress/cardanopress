<?php

/**
 * Setup post meta boxes
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Meta;

use CardanoPress\Dependencies\ThemePlate\Core\Helper\FormHelper;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\MetaHelper;
use CardanoPress\Dependencies\ThemePlate\Meta\Traits\HasLocation;
use WP_Post;

class PostMeta extends BaseMeta {

	use HasLocation;


	protected function initialize( array &$config ): void {

		$config['object_type'] = 'post';

	}


	public function create(): void {

		foreach ( $this->locations as $post_type ) {
			add_action( 'add_meta_boxes_' . $post_type, array( $this, 'add_box' ) );
			add_action( 'save_post_' . $post_type, array( $this, 'save_data' ), 10, 2 );
		}

		add_action( 'admin_footer', array( $this, 'maybe_wanted_page' ) );

		$this->register_meta();

	}


	public function add_box( WP_Post $post ): void {

		$this->current_id = $post->ID;

		if ( ! MetaHelper::should_display( $this->config, (string) $this->current_id ) ) {
			return;
		}

		$config = $this->config;

		add_meta_box(
			$this->fields_group_key() . '_' . $config['form_id'],
			$this->title,
			function( WP_Post $post ) {
				$this->layout_inside( (string) $post->ID );
			},
			null,
			$config['context'],
			$config['priority'],
		);

	}


	public function save_data( int $object_id, WP_Post $post ): void {

		if ( ! $this->can_save( $object_id ) ) {
			return;
		}

		if ( 'page' === $post->post_type && ! current_user_can( 'edit_page', $object_id ) ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $object_id ) ) {
			return;
		}

		$this->save( $object_id );

	}


	public function maybe_wanted_page(): void {

		$screen = get_current_screen();

		if ( null === $screen || 'post' !== $screen->base ) {
			return;
		}

		if ( ! in_array( $screen->post_type, $this->locations, true ) ) {
			return;
		}

		if ( ! MetaHelper::should_display( $this->config, (string) $this->current_id ) ) {
			return;
		}

		FormHelper::enqueue_assets( $screen->base . '.php' );

	}

}
