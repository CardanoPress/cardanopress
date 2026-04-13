<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Interfaces;

interface FieldsInterface {

	/**
	 * @param array<Field|mixed> $collection
	 */
	public function fields( array $collection ): self;

}
