<?php

/**
 * @package ThemePlate
 */

namespace Tests\Integration;

use ThemePlate\Core\Helper\FormHelper;
use WP_UnitTestCase;

class FormHelperTest extends WP_UnitTestCase {
	public function test_enqueue_assets(): void {
		FormHelper::enqueue_assets( 'test' ); // custom hook suffix
		$this->assertTrue( wp_script_is( 'themeplate-script' ) );

		FormHelper::enqueue_assets( 'test' ); // firing again is short-circuited
		$this->assertTrue( wp_script_is( 'themeplate-script' ) );
		wp_dequeue_script( 'themeplate-script' ); // force dequeue

		FormHelper::enqueue_assets( 'post.php' ); // in a classic editing screen
		$this->assertTrue( wp_script_is( 'themeplate-show-hide-classic' ) );
		wp_dequeue_script( 'themeplate-script' ); // force dequeue

		// phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
		$GLOBALS['post'] = $this->factory()->post->create_and_get();

		FormHelper::enqueue_assets( 'post.php' ); // in a gutenberg editing screen
		$this->assertTrue( wp_script_is( 'themeplate-show-hide-gutenberg' ) );
		wp_dequeue_script( 'themeplate-script' ); // force dequeue
	}
}
