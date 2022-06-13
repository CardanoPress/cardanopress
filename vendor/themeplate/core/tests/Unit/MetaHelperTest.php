<?php

/**
 * @package ThemePlate
 */

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use ThemePlate\Core\Helper\MetaHelper;

class MetaHelperTest extends TestCase {
	public function for_should_display(): array {
		// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
		return array(
			'with callback returning false' => array(
				array(
					'on_cb' => function () {
						return false;
					},
				),
				'',
				false,
			),
			'with callback returning true' => array(
				array(
					'on_cb' => function () {
						return true;
					},
				),
				'',
				true,
			),
			'with not wanted id' => array(
				array(
					'on_id' => array( 'test' ),
				),
				'tester',
				false,
			),
			'with the wanted id' => array(
				array(
					'on_id' => array( 'tester' ),
				),
				'tester',
				true,
			),
			'with the wanted id but falsy callback' => array(
				array(
					'on_cb' => function () {
						return false;
					},
					'on_id' => array( 'tester' ),
				),
				'tester',
				false,
			),
			'with not wanted id but truthy callback' => array(
				array(
					'on_cb' => function () {
						return true;
					},
					'on_id' => array( 'test' ),
				),
				'tester',
				true,
			),
		);
		// phpcs:enable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
	}

	protected function transform_should_display( string $type, array $config ) {
		return array_combine(
			array_map(
				function ( $key, $type ) {
					return $type . '_' . $key;
				},
				array_keys( $config ),
				array_fill( 0, count( $config ), $type )
			),
			array_values( $config )
		);
	}

	/**
	 * @dataProvider for_should_display
	 */
	public function test_should_display_show( array $config, string $current_id, bool $should_display ): void {
		if ( $should_display ) {
			$this->assertTrue( MetaHelper::should_display( $this->transform_should_display( 'show', $config ), $current_id ) );
		} else {
			$this->assertFalse( MetaHelper::should_display( $this->transform_should_display( 'show', $config ), $current_id ) );
		}
	}

	/**
	 * @dataProvider for_should_display
	 */
	public function test_should_display_hide( array $config, string $current_id, bool $should_display ): void {
		if ( ! $should_display ) {
			$this->assertTrue( MetaHelper::should_display( $this->transform_should_display( 'hide', $config ), $current_id ) );
		} else {
			$this->assertFalse( MetaHelper::should_display( $this->transform_should_display( 'hide', $config ), $current_id ) );
		}
	}

	public function for_normalize_options(): array {
		$callable = function () {
			return true;
		};

		// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
		return array(
			'with callable value' => array(
				array(
					'show_on' => array( $callable ),
				),
				array(
					'show_on_cb' => $callable,
				),
			),
			'with key-value pair for ID' => array(
				array(
					'show_on' => array(
						'key' => 'id',
						'value' => 911,
					),
				),
				array(
					'show_on_id' => array( 911 ),
				),
			),
			'with multiple value for ID' => array(
				array(
					'show_on' => array(
						'key' => 'id',
						'value' => array( 911, 4688 ),
					),
				),
				array(
					'show_on_id' => array( 911, 4688 ),
				),
			),
			'with key-value pair for JS' => array(
				array(
					'show_on' => array(
						'key' => '#field_id',
						'value' => 'test',
					),
				),
				array(
					'show_on' => array(
						array(
							'key' => '#field_id',
							'value' => 'test',
						),
					),
				),
			),
			'with multiple key-value pair' => array(
				array(
					'show_on' => array(
						$callable,
						array(
							'key' => 'id',
							'value' => array( 911, 4688 ),
						),
						array(
							'key' => '#field_id',
							'value' => 'test',
						),
					),
				),
				array(
					'show_on' => array(
						$callable,
						array(
							'key' => 'id',
							'value' => array( 911, 4688 ),
						),
						array(
							'key' => '#field_id',
							'value' => 'test',
						),
					),
				),
			),
		);
		// phpcs:enable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
	}

	/**
	 * @dataProvider for_normalize_options
	 */
	public function test_normalize_options( array $container, $expected ): void {
		$this->assertSame( $expected, MetaHelper::normalize_options( $container ) );
	}

	public function for_render_options(): array {
		// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
		return array(
			'with callable data' => array(
				array(
					'show_on_cb' => 'date',
					'hide_on_cb' => 'date',
				),
			),
			'with ID data' => array(
				array(
					'show_on_id' => array( 911 ),
					'hide_on_id' => array( 911 ),
				),
			),
			'with key-value pair for JS show' => array(
				array(
					'show_on' => array(
						array(
							'key' => '#field_id',
							'value' => 'test',
						),
					),
				),
			),
			'with key-value pair for JS hide' => array(
				array(
					'hide_on' => array(
						array(
							'key' => '#field_id',
							'value' => 'test',
						),
					),
				),
			),
			'with multiple key-value pair show' => array(
				array(
					'show_on' => array(
						array(
							'key' => 'id',
							'value' => array( 911, 4688 ),
						),
						array(
							'key' => '#field_id',
							'value' => 'test',
						),
					),
				),
			),
			'with multiple key-value pair hide' => array(
				array(
					'hide_on' => array(
						array(
							'key' => 'id',
							'value' => array( 911, 4688 ),
						),
						array(
							'key' => '#field_id',
							'value' => 'test',
						),
					),
				),
			),
		);
		// phpcs:enable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
	}

	/**
	 * @dataProvider for_render_options
	 */
	public function test_render_options( array $container ): void {
		ob_start();
		MetaHelper::render_options( $container );

		$output = ob_get_clean();

		$this->assertIsString( $output );

		if ( array_key_exists( 'show_on', $container ) ) {
			$this->assertStringContainsString( 'data-show', $output );
		} elseif ( array_key_exists( 'hide_on', $container ) ) {
			$this->assertStringContainsString( 'data-hide', $output );
		} else {
			$this->assertEmpty( $output );
		}
	}
}
