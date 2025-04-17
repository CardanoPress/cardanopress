<?php

/**
 * Setup custom posts and taxonomies
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\CPT;

abstract class Base implements CommonInterface {

	/** @var array<string, mixed> */
	protected array $args = array();

	/** @var array<string, mixed> */
	protected array $defaults = array(
		'labels'       => array(),
		'public'       => true,
		'show_in_rest' => true,
		'rewrite'      => array(
			'with_front' => false,
		),
	);


	/** @return array<string, mixed> */
	public function defaults(): array {

		return $this->defaults;

	}


	public function description( string $description ): self {

		$this->args['description'] = $description;

		return $this;

	}


	public function hierarchical( bool $hierarchical ): self {

		$this->args['hierarchical'] = $hierarchical;

		return $this;

	}


	public function public( bool $is_public ): self {

		$this->args['public'] = $is_public;

		if ( ! $is_public ) {
			$this->args['rewrite'] = false;
		}

		return $this;

	}


	/** @param array<string, mixed> $args */
	protected function initialize( string $type, array $args ): void {

		$names = $this->parse( $type );

		$this->defaults['rewrite']['slug'] = $names['slug'];

		$this->config( $args );

		if ( isset( $args['public'] ) && ! $args['public'] ) {
			$this->args['rewrite'] = false;
		}

		$this->labels( $names['singular'], $names['plural'] );

	}


	/** @param array<string, mixed> $config */
	public function config( array $config ): self {

		$this->args = array_replace_recursive( $this->defaults, $this->args, $config );

		if ( isset( $config['public'] ) && ! $config['public'] ) {
			$this->args['rewrite'] = false;
		}

		return $this;

	}


	/** @return array<string, string> */
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
			if ( 1 === preg_match( $pattern, $single ) ) {
				$replaced = preg_replace( $pattern, $replacement, $single );

				if ( null !== $replaced ) {
					return $replaced;
				}
			}
		}

		return $single . 's';

	}


	protected function slugify( string $name ): string {

		return strtolower( str_replace( array( ' ', '_' ), '-', $name ) );

	}


	/** @param array<string, string> $labels */
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
