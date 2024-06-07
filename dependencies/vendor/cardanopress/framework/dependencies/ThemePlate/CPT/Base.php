<?php

/**
 * Setup custom posts and taxonomies
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\CPT;

abstract class Base implements CommonInterface {

	protected array $args;
	protected array $defaults = array(
		'labels'       => array(),
		'public'       => true,
		'show_in_rest' => true,
		'rewrite'      => array(
			'with_front' => false,
		),
	);


	public function defaults(): array {

		return $this->defaults;

	}


	protected function initialize( string $type, array $args ): void {

		$names = $this->parse( $type );

		$this->defaults['rewrite']['slug'] = $names['slug'];

		$this->args = array_replace_recursive( $this->defaults, $args );

		if ( isset( $args['public'] ) && ! $args['public'] ) {
			$this->args['rewrite'] = false;
		}

		$this->labels( $names['singular'], $names['plural'] );

	}


	protected function parse( string $name ): array {

		$names = array();

		$names['singular'] = ucwords( str_replace( array( '-', '_' ), ' ', $name ) );
		$names['plural']   = $this->pluralize( $names['singular'] );
		$names['slug']     = $this->slugify( $names['plural'] );

		return $names;

	}


	protected function pluralize( string $single ): string {

		$map = array(
			'/(x|ss|sh|ch)$/i' => '$1es',
			'/(a|u)s$/i'       => '$1ses',
			'/y$/i'            => 'ies',
			'/sis$/i'          => 'ses',
			'/s$/i'            => 's',
		);

		foreach ( $map as $pattern => $replacement ) {
			if ( preg_match( $pattern, $single ) ) {
				return preg_replace( $pattern, $replacement, $single );
			}
		}

		return $single . 's';

	}


	protected function slugify( string $name ): string {

		return strtolower( str_replace( array( ' ', '_' ), '-', $name ) );

	}


	protected function apply( array $labels, string $plural ): void {

		$this->args['labels'] = array_merge( $this->args['labels'], $labels );

		if ( false !== $this->args['rewrite'] && $this->defaults['rewrite']['slug'] === $this->args['rewrite']['slug'] ) {
			$this->args['rewrite']['slug'] = $this->slugify( $plural );
		}

	}


	public function register(): void {

		if ( did_action( 'init' ) ) {
			$this->hook();
		} else {
			// @codeCoverageIgnoreStart
			$priority = static::class === PostType::class ? 10 : 9;

			add_action( 'init', array( $this, 'hook' ), $priority );
			// @codeCoverageIgnoreEnd
		}

	}

}
