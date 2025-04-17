<?php

/**
 * Setup options page
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Page\Interfaces;

interface PageInterface {

	/** @param array<string, string|int> $config */
	public function config( array $config ): self;

	public function capability( string $capability ): self;

	public function title( string $title ): self;

	public function slug( string $slug ): self;

	public function position( int $position ): self;

	public function menu(): void;

}
