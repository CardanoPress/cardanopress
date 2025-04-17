<?php

/**
 * Setup custom taxonomies
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\CPT\Interfaces;

interface TaxonomyInterface {

	public function hierarchical( bool $hierarchical ): self;

	public function column( bool $column ): self;

}
