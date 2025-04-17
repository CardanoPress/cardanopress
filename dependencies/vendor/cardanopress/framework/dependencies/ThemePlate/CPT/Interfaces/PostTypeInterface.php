<?php

/**
 * Setup custom post types
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\CPT\Interfaces;

interface PostTypeInterface {

	public function icon( string $icon ): self;

	public function supports( string ...$supports ): self;

	public function capabilities( string ...$capabilities ): self;

	public function position( int $position ): self;

	public function archive( bool $archive ): self;

	public function classic( bool $classic ): self;

}
