<?php

/**
 * Setup post meta boxes
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Meta;

use CardanoPress\Dependencies\ThemePlate\Core\Helper\BoxHelper;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\FormHelper;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\MetaHelper;

class MenuMeta extends BaseMeta {

	protected array $locations = array();


	protected function initialize( array &$config ): void {

		$config['object_type'] = 'post';

		$this->locations = array( 'nav_menu_item' );

	}


	protected function fields_group_key(): string {

		return parent::fields_group_key() . '_' . $this->current_id;

	}


	public function create(): void {

		$priority = BoxHelper::get_priority( $this->config );

		add_action( 'wp_nav_menu_item_custom_fields', array( $this, 'add_box' ), $priority );
		add_action( 'save_post_nav_menu_item', array( $this, 'save_data' ) );
		add_action( 'admin_footer', array( $this, 'maybe_wanted_page' ) );

		$this->register_meta();

	}


	public function add_box( string $item_id ) {

		$this->current_id = (int) $item_id;

		if ( ! MetaHelper::should_display( $this->config, $item_id ) ) {
			return;
		}

		$this->layout_postbox( $item_id );

	}


	public function save_data( int $object_id ): void {

		$this->current_id = $object_id;

		if ( ! $this->can_save( $object_id ) ) {
			return;
		}

		if ( ! current_user_can( 'edit_theme_options', $object_id ) ) {
			return;
		}

		$this->save( $object_id );

	}


	public function maybe_wanted_page(): void {

		$screen = get_current_screen();

		if ( null === $screen || 'nav-menus' !== $screen->base ) {
			return;
		}

		if ( ! MetaHelper::should_display( $this->config, (string) $this->current_id ) ) {
			return;
		}

		FormHelper::enqueue_assets( $screen->base . '.php' );

	}

}
