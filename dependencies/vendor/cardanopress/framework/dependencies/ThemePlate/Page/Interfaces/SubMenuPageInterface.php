<?php

/**
 * Setup options page
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Page\Interfaces;

interface SubMenuPageInterface {

	public function parent( string $parent ): self;

}
