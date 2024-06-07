<?php

/**
 * Setup custom post types
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\CPT;

class PostType extends Base {

	protected string $post_type;
	protected bool $classic_editor = false;


	public function __construct( string $post_type, array $args = array() ) {

		$this->post_type = $post_type;

		$this->defaults['menu_position'] = 6;
		$this->defaults['has_archive']   = true;

		if ( isset( $args['classic_editor'] ) ) {
			$this->classic_editor = $args['classic_editor'];

			unset( $args['classic_editor'] );
		}

		$this->initialize( $post_type, $args );

	}


	public function labels( string $singular, string $plural ): self {

		// https://developer.wordpress.org/reference/functions/get_post_type_labels/
		$labels = array(
			'name'                     => $plural,
			'singular_name'            => $singular,
			'add_new'                  => 'Add New ' . $singular,
			'add_new_item'             => 'Add New ' . $singular,
			'edit_item'                => 'Edit ' . $singular,
			'new_item'                 => 'New ' . $singular,
			'view_item'                => 'View ' . $singular,
			'view_items'               => 'View ' . $plural,
			'search_items'             => 'Search ' . $plural,
			'not_found'                => 'No ' . strtolower( $plural ) . ' found.',
			'not_found_in_trash'       => 'No ' . strtolower( $plural ) . ' found in Trash.',
			'parent_item_colon'        => 'Parent ' . $singular . ':',
			'all_items'                => 'All ' . $plural,
			'archives'                 => $singular . ' Archives',
			'attributes'               => $singular . ' Attributes',
			'insert_into_item'         => 'Insert into ' . strtolower( $singular ),
			'uploaded_to_this_item'    => 'Uploaded to this ' . strtolower( $singular ),
			'featured_image'           => $singular . ' Featured Image',
			'set_featured_image'       => 'Set ' . strtolower( $singular ) . ' featured image',
			'remove_featured_image'    => 'Remove ' . strtolower( $singular ) . ' featured image',
			'use_featured_image'       => 'Use as ' . strtolower( $singular ) . ' featured image',
			'filter_items_list'        => 'Filter ' . strtolower( $plural ) . ' list',
			'items_list_navigation'    => $plural . ' list navigation',
			'items_list'               => $plural . ' list',
			'item_published'           => $singular . ' published.',
			'item_published_privately' => $singular . ' published privately.',
			'item_reverted_to_draft'   => $singular . ' reverted to draft.',
			'item_scheduled'           => $singular . ' scheduled.',
			'item_updated'             => $singular . ' updated.',
			'item_link'                => $singular . ' Link',
			'item_link_description'    => 'A link to a ' . strtolower( $singular ),
			'menu_name'                => $plural,
			'name_admin_bar'           => $singular,
		);

		$this->apply( $labels, $plural );

		return $this;

	}


	public function associate( string $identifier ): self {

		if ( empty( $this->args['taxonomies'] ) ) {
			$this->args['taxonomies'] = array();
		}

		$this->args['taxonomies'][] = $identifier;

		return $this;

	}


	public function hook(): void {

		register_post_type( $this->post_type, $this->args );

		// https://core.trac.wordpress.org/browser/tags/6.1/src/wp-includes/post.php#L8127
		add_filter( 'use_block_editor_for_post_type', array( $this, 'use_editor' ), 10, 2 );
		// https://core.trac.wordpress.org/browser/tags/6.0/src/wp-admin/edit-form-advanced.php#L219
		add_filter( 'post_updated_messages', array( $this, 'custom_messages' ) );
		// https://core.trac.wordpress.org/browser/tags/6.0/src/wp-admin/edit.php#L394
		add_filter( 'bulk_post_updated_messages', array( $this, 'bulk_custom_messages' ), 10, 2 );

	}


	public function use_editor( bool $use_block_editor, string $post_type ): bool {

		if ( $this->post_type === $post_type ) {
			return ! $this->classic_editor;
		}

		return $use_block_editor;

	}


	public function custom_messages( array $messages ): array {

		global $post_type_object, $post;

		$name     = $this->post_type;
		$singular = $this->args['labels']['singular_name'];

		$permalink = get_permalink();

		if ( ! $permalink ) {
			$permalink = ''; // @codeCoverageIgnore
		}

		$preview_post_link_html   = '';
		$scheduled_post_link_html = '';
		$view_post_link_html      = '';
		$preview_url              = get_preview_post_link( $post );
		$viewable                 = is_post_type_viewable( $post_type_object );

		if ( $viewable ) {
			$preview_post_link_html = sprintf(
				' <a target="_blank" href="%1$s">%2$s</a>',
				esc_url( $preview_url ),
				'Preview ' . $singular
			);

			$scheduled_post_link_html = sprintf(
				' <a target="_blank" href="%1$s">%2$s</a>',
				esc_url( $permalink ),
				'Preview ' . $singular
			);

			$view_post_link_html = sprintf(
				' <a href="%1$s">%2$s</a>',
				esc_url( $permalink ),
				'View ' . $singular
			);
		}

		$scheduled_date = date_i18n( __( 'M j, Y @ H:i' ), strtotime( $post->post_date ) );

		$messages[ $name ] = array(
			0  => '', // Unused. Messages start at index 1.
			1  => $singular . ' updated.' . $view_post_link_html,
			2  => 'Custom field updated.',
			3  => 'Custom field deleted.',
			4  => $singular . ' updated.',
			5  => isset( $_GET['revision'] ) ? sprintf( $singular . ' restored to revision from %s.', wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,  // phpcs:ignore WordPress.Security.NonceVerification
			6  => $singular . ' published.' . $view_post_link_html,
			7  => $singular . ' saved.',
			8  => $singular . ' submitted.' . $preview_post_link_html,
			9  => sprintf( $singular . ' scheduled for: %s.', '<strong>' . $scheduled_date . '</strong>' ) . $scheduled_post_link_html,
			10 => $singular . ' draft updated.' . $preview_post_link_html,
		);

		return $messages;

	}


	public function bulk_custom_messages( array $messages, array $counts ): array {

		$name     = $this->post_type;
		$singular = strtolower( $this->args['labels']['singular_name'] );
		$plural   = strtolower( $this->args['labels']['name'] );

		$messages[ $name ] = array(
			'updated'   => $this->n( '%s ' . $singular . ' updated.', '%s ' . $plural . ' updated.', $counts['updated'] ),
			'locked'    => $this->n( '%s ' . $singular . ' not updated, somebody is editing it.', '%s ' . $plural . ' not updated, somebody is editing them.', $counts['locked'] ),
			'deleted'   => $this->n( '%s ' . $singular . ' permanently deleted.', '%s ' . $plural . ' permanently deleted.', $counts['deleted'] ),
			'trashed'   => $this->n( '%s ' . $singular . ' moved to the Trash.', '%s ' . $plural . ' moved to the Trash.', $counts['trashed'] ),
			'untrashed' => $this->n( '%s ' . $singular . ' restored from the Trash.', '%s ' . $plural . ' restored from the Trash.', $counts['untrashed'] ),
		);

		return $messages;

	}


	private function n( string $single, string $plural, int $number ): string {

		return 1 === $number ? $single : $plural;

	}

}
