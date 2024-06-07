<?php

/**
 * Setup custom taxonomies
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\CPT;

class Taxonomy extends Base {

	protected string $taxonomy;
	protected array $object_type = array();


	public function __construct( string $taxonomy, array $args = array() ) {

		$this->taxonomy = $taxonomy;

		$this->defaults['hierarchical']      = true;
		$this->defaults['show_admin_column'] = true;

		$this->initialize( $taxonomy, $args );

	}


	public function labels( string $singular, string $plural ): self {

		// https://developer.wordpress.org/reference/functions/get_taxonomy_labels/
		$labels = array(
			'name'                       => $plural,
			'singular_name'              => $singular,
			'search_items'               => 'Search ' . $plural,
			'popular_items'              => 'Popular ' . $plural,
			'all_items'                  => 'All ' . $plural,
			'parent_item'                => 'Parent ' . $singular,
			'parent_item_colon'          => 'Parent ' . $singular . ':',
			'name_field_description'     => 'The name is how it appears on your site.',
			'slug_field_description'     => 'The &#8220;slug&#8221; is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.',
			'parent_field_description'   => 'Assign a parent term to create a hierarchy. The term Jazz, for example, would be the parent of Bebop and Big Band.',
			'desc_field_description'     => 'The description is not prominent by default; however, some themes may show it.',
			'edit_item'                  => 'Edit ' . $singular,
			'view_item'                  => 'View ' . $singular,
			'update_item'                => 'Update ' . $singular,
			'add_new_item'               => 'Add New ' . $singular,
			'new_item_name'              => 'New ' . $singular . ' Name',
			'separate_items_with_commas' => 'Separate ' . strtolower( $plural ) . ' with commas',
			'add_or_remove_items'        => 'Add or remove ' . strtolower( $plural ),
			'choose_from_most_used'      => 'Choose from the most used ' . strtolower( $singular ),
			'not_found'                  => 'No ' . strtolower( $plural ) . ' found.',
			'no_terms'                   => 'No ' . strtolower( $plural ),
			'filter_by_item'             => 'Filter by ' . strtolower( $singular ),
			'items_list_navigation'      => $plural . ' list navigation',
			'items_list'                 => $plural . ' list',
			'most_used'                  => 'Most Used ' . $plural,
			'back_to_items'              => '&larr; Back to ' . $plural,
			'item_link'                  => $singular . ' Link',
			'item_link_description'      => 'A link to a ' . strtolower( $singular ),
			'menu_name'                  => $plural,
			'name_admin_bar'             => $singular,
			'archives'                   => 'All ' . $plural,
		);

		$this->apply( $labels, $plural );

		return $this;

	}


	public function associate( string $identifier ): self {

		$this->object_type[] = $identifier;

		return $this;

	}


	public function hook(): void {

		register_taxonomy( $this->taxonomy, $this->object_type, $this->args );

		// https://core.trac.wordpress.org/browser/tags/6.0/src/wp-admin/includes/edit-tag-messages.php#L49
		add_filter( 'term_updated_messages', array( $this, 'custom_messages' ) );

	}


	public function custom_messages( array $messages ): array {

		$singular = $this->args['labels']['singular_name'];
		$plural   = $this->args['labels']['name'];

		$messages[ $this->taxonomy ] = array(
			0 => '',
			1 => $singular . ' added.',
			2 => $singular . ' deleted.',
			3 => $singular . ' updated.',
			4 => $singular . ' not added.',
			5 => $singular . ' not updated.',
			6 => $plural . ' deleted.',
		);

		return $messages;

	}

}
