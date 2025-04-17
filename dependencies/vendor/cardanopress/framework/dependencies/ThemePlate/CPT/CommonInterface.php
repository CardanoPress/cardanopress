<?php

/**
 * @package CardanoPress\Dependencies\ThemePlate
 */

namespace CardanoPress\Dependencies\ThemePlate\CPT;

interface CommonInterface {

	/** @return array<string, mixed> */
	public function defaults(): array;

	/** @param array<string, mixed> $config */
	public function config( array $config ): self;

	public function description( string $description ): self;

	public function hierarchical( bool $hierarchical ): self;

	public function public( bool $is_public ): self;

	public function labels( string $singular, string $plural ): self;

	public function associate( string $identifier ): self;

	public function register(): void;

	public function hook(): void;

	/**
	 * @param array<string, string[]> $messages
	 * @return array<string, string[]>
	 */
	public function custom_messages( array $messages ): array;

}
