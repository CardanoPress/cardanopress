<?php

/**
 * @package ThemePlate
 */

namespace Tests;

use ThemePlate\Page\CommonInterface;
use ThemePlate\Page\SubMenuPage;

class SubMenuPageTest extends AbstractTest {
	protected function get_tested_instance( array $args ): CommonInterface {
		return new SubMenuPage( $args['page_title'], $args['parent_slug'], $args['config'] );
	}
}
