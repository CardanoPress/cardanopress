<?php

/**
 * Setup options page
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate\Page;

interface CommonInterface {

	public function setup(): void;

	public function maybe_init_option( array $options ): array;

	public function menu(): void;

	public function load(): void;

	public function notices(): void;

	public function create(): void;

	public function get_hookname(): string;

}
