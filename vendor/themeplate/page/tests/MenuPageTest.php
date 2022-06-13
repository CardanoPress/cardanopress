<?php

/**
 * @package ThemePlate
 */

namespace Tests;

use ThemePlate\Page\CommonInterface;
use ThemePlate\Page\MenuPage;

class MenuPageTest extends AbstractTest {
	protected function get_tested_instance( array $args ): CommonInterface {
		return new MenuPage( $args['page_title'], $args['config'] );
	}
}
