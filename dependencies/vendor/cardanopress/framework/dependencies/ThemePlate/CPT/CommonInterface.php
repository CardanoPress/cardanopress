<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 */

namespace CardanoPress\Dependencies\ThemePlate\CPT;

interface CommonInterface {

	public function defaults(): array;

	public function labels( string $singular, string $plural ): self;

	public function associate( string $identifier ): self;

	public function register(): void;

	public function hook(): void;

	public function custom_messages( array $messages ): array;

}
