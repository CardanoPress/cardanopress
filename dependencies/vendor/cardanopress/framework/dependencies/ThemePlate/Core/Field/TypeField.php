<?php

/**
 * Setup a field type
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Field;

use CardanoPress\Dependencies\ThemePlate\Core\Field;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\AssetsHelper;
use CardanoPress\Dependencies\ThemePlate\Core\Helper\MainHelper;
use WP_Error;
use WP_Post;
use WP_Query;
use WP_Term;
use WP_Term_Query;
use WP_User;
use WP_User_Query;

class TypeField extends Field {

	public const MULTIPLE_ABLE = true;

	public const ACTION_PREFIX = 'themeplate_type_';


	protected static function get_correct_type( string $type ): string {

		$type = strtolower( $type );

		if ( ! in_array( $type, array( 'post', 'user', 'term' ), true ) ) {
			$type = 'post';
		}

		return $type . 's';
	}


	protected static function get_action_name( string $type ): string {

		return self::ACTION_PREFIX . self::get_correct_type( $type );

	}


	protected static function get_callback( string $type ): callable {

		$type = self::get_correct_type( $type );

		switch ( $type ) {
			case 'users':
				return array( self::class, 'get_users' );
			case 'terms':
				return array( self::class, 'get_terms' );
			case 'posts':
			default:
				return array( self::class, 'get_posts' );
		}

	}


	protected function initialize(): void {

		$hook_name = 'wp_ajax_' . static::get_action_name( $this->get_config( 'type' ) );

		add_action( $hook_name, static::get_callback( $this->get_config( 'type' ) ) );

	}


	protected static function maybe_invalid( string $action ): void {

		check_ajax_referer( AssetsHelper::LOADER_ACTION );

		$hook_name = self::ACTION_PREFIX . 'field_capability_' . $action;

		if ( ! current_user_can( apply_filters( $hook_name, 'publish_posts' ) ) ) {
			wp_die();
		}

	}


	public function render( $value ): void {

		$config_options = $this->get_config( 'options' );

		switch ( $this->get_config( 'type' ) ) {
			case 'user':
				$type_key = 'role';
				$defaults = array( $type_key => null );

				if ( MainHelper::is_sequential( $config_options ) ) {
					$config_options = array( $type_key => $config_options );
				}

				break;
			case 'term':
				$type_key = 'taxonomy';
				$defaults = array( $type_key => null );

				if ( MainHelper::is_sequential( $config_options ) ) {
					$config_options = array( $type_key => $config_options );
				}

				break;
			case 'post':
			default:
				$type_key = 'post_type';
				$defaults = array( $type_key => array( $this->get_config( 'type' ) ) );

				if ( MainHelper::is_sequential( $config_options ) ) {
					$config_options = array( $type_key => $config_options );
				}

				break;
		}

		$args = MainHelper::fool_proof( $defaults, $config_options );

		if ( empty( $args[ $type_key ] ) ) {
			unset( $args[ $type_key ] );
		}

		echo '<select disabled><option>Loading values...</option></select>';
		echo '<select class="themeplate-select2 select2-hidden-accessible"
				name="' . esc_attr( $this->get_config( 'name' ) ) . ( $this->get_config( 'multiple' ) ? '[]' : '' ) . '"
				id="' . esc_attr( $this->get_config( 'id' ) ) . '"' .
				( $this->get_config( 'multiple' ) ? ' multiple="multiple"' : '' ) .
				( $this->get_config( 'none' ) ? ' data-none="true"' : '' ) .
				( $this->get_config( 'required' ) ? ' required="required"' : '' ) .
				'>';

		$value = array_filter( (array) $value );

		foreach ( $value as $item ) {
			echo '<option value="' . esc_attr( $item ) . '" selected="selected">' . esc_html( $item ) . '</option>';
		}

		echo '</select>';
		echo '<div class="select2-options"
				data-action="' . esc_attr( static::get_action_name( $this->get_config( 'type' ) ) ) . '"
				data-options="' . esc_attr( (string) wp_json_encode( $args, JSON_NUMERIC_CHECK ) ) . '"
				data-value="' . esc_attr( (string) wp_json_encode( array() === $value ? '' : $value, JSON_NUMERIC_CHECK ) ) . '"
				></div>';

	}


	private static int $count = 10;

	/**
	 * @var array<string, array<string, string>>
	 */
	private static array $prefixes = array(
		'post' => array(),
		'user' => array(),
		'term' => array(),
	);


	// phpcs:disable WordPress.Security.NonceVerification
	public static function get_posts(): void {

		self::maybe_invalid( __FUNCTION__ );

		$return   = array(
			'results'    => array(),
			'pagination' => array(
				'more' => false,
			),
		);
		$defaults = array(
			'post_status'    => 'publish',
			's'              => $_GET['search'] ?? '',
			'posts_per_page' => isset( $_GET['ids__in'] ) ? -1 : self::$count,
			'post__in'       => $_GET['ids__in'] ?? '',
		);
		$is_multi = is_array( $_GET['options']['post_type'] ) && 1 < count( $_GET['options']['post_type'] );

		if ( $is_multi ) {
			$defaults['orderby'] = array(
				'post_type' => 'ASC',
			);
		}

		$query = new WP_Query( array_merge( $defaults, $_GET['options'], $_GET['_page'] ) );

		if ( $_GET['_page']['paged'] < $query->max_num_pages ) {
			$return['pagination']['more'] = true;
		}

		foreach ( $query->posts as $post ) {
			/** @var WP_Post $post */
			$return['results'][] = array(
				'id'   => $post->ID,
				'text' => self::get_post_text( $post, $is_multi ),
			);
		}

		echo wp_json_encode( $return );

		wp_die();

	}


	private static function get_post_text( WP_Post $post, bool $is_multi ): string {

		if ( ! $is_multi ) {
			return $post->post_title;
		}

		$type = $post->post_type;

		if ( ! array_key_exists( $type, self::$prefixes['post'] ) ) {
			$object = get_post_type_object( $type );

			if ( null === $object ) {
				return $post->post_title;
			}

			self::$prefixes['post'][ $type ] = $object->labels->singular_name;
		}

		return self::$prefixes['post'][ $type ] . ' | ' . $post->post_title;

	}


	public static function get_users(): void {

		self::maybe_invalid( __FUNCTION__ );

		$return   = array(
			'results'    => array(),
			'pagination' => array(
				'more' => false,
			),
		);
		$defaults = array(
			'search'  => isset( $_GET['search'] ) ? '*' . $_GET['search'] . '*' : '',
			'number'  => isset( $_GET['ids__in'] ) ? -1 : self::$count,
			'include' => $_GET['ids__in'] ?? '',
		);
		$roles    = $_GET['options']['role'] ?? array();
		$is_multi = empty( $roles ) ? true : is_array( $roles ) && 1 < count( $roles );
		$query    = new WP_User_Query( array_merge( $defaults, $_GET['options'] ?? array(), $_GET['_page'] ) );

		if ( $_GET['_page']['paged'] < ceil( $query->get_total() / self::$count ) ) {
			$return['pagination']['more'] = true;
		}

		foreach ( $query->get_results() as $user ) {
			/** @var WP_User $user */
			$return['results'][] = array(
				'id'   => $user->ID,
				'text' => self::get_user_text( $user, $roles, $is_multi ),
			);
		}

		echo wp_json_encode( $return );

		wp_die();

	}


	/**
	 * @param string[] $roles
	 */
	private static function get_user_text( WP_User $user, array $roles, bool $is_multi ): string {

		if ( ! $is_multi ) {
			return $user->display_name;
		}

		if ( empty( self::$prefixes['user'] ) ) {
			self::$prefixes['user'] = wp_roles()->get_names();
		}

		if ( array() === $roles ) {
			$roles = $user->roles;
		}

		foreach ( $roles as $role ) {
			if ( array_key_exists( $role, self::$prefixes['user'] ) ) {
				return self::$prefixes['user'][ $role ] . ' | ' . $user->display_name;
			}
		}

		return $user->display_name;

	}


	public static function get_terms(): void {

		self::maybe_invalid( __FUNCTION__ );

		$return   = array(
			'results'    => array(),
			'pagination' => array(
				'more' => false,
			),
		);
		$offset   = ( $_GET['_page']['paged'] > 0 ) ? self::$count * ( $_GET['_page']['paged'] - 1 ) : 1;
		$defaults = array(
			'search'  => $_GET['search'] ?? '',
			'number'  => isset( $_GET['ids__in'] ) ? 0 : self::$count,
			'include' => $_GET['ids__in'] ?? '',
			'offset'  => $offset,
		);
		$total    = wp_count_terms( $_GET['options'] ?? array() );
		$taxonomy = $_GET['options']['taxonomy'] ?? array();
		$is_multi = empty( $taxonomy ) ? true : is_array( $taxonomy ) && 1 < count( $taxonomy );
		$query    = new WP_Term_Query( array_merge( $defaults, $_GET['options'] ?? array() ) );

		if ( ! $total instanceof WP_Error && $_GET['_page']['paged'] < ceil( (int) $total / self::$count ) ) {
			$return['pagination']['more'] = true;
		}

		foreach ( (array) $query->get_terms() as $term ) {
			/** @var WP_Term $term */
			$return['results'][] = array(
				'id'   => $term->term_id,
				'text' => self::get_term_text( $term, $is_multi ),
			);
		}

		echo wp_json_encode( $return );

		wp_die();

	}


	private static function get_term_text( WP_Term $term, bool $is_multi ): string {

		if ( ! $is_multi ) {
			return $term->name;
		}

		$tax = $term->taxonomy;

		if ( ! array_key_exists( $tax, self::$prefixes['term'] ) ) {
			$object = get_taxonomy( $tax );

			if ( false === $object ) {
				return $term->name;
			}

			self::$prefixes['term'][ $tax ] = $object->labels->singular_name;
		}

		return self::$prefixes['term'][ $tax ] . ' | ' . $term->name;

	}

}
