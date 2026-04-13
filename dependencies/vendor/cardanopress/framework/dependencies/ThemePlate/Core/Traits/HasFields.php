<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 */

namespace CardanoPress\Dependencies\ThemePlate\Core\Traits;

use CardanoPress\Dependencies\ThemePlate\Core\Fields;

trait HasFields {

	protected ?Fields $fields = null;


	/**
	 * @param array<Field|mixed> $collection
	 */
	public function fields( array $collection ): self {

		$this->fields = new Fields( $collection );

		return $this;

	}

}
