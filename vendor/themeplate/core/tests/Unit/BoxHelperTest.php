<?php

/**
 * @package ThemePlate
 */

namespace Tests\Unit;

use ThemePlate\Core\Helper\BoxHelper;
use PHPUnit\Framework\TestCase;

class BoxHelperTest extends TestCase {
	public function for_prepare_save(): array {
		$empty_like_values = array(
			'',
			false,
			null,
			0,
			array(),
		);

		// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
		return array(
			'with sequential empty-like' => array(
				$empty_like_values,
				$empty_like_values,
			),
			'with associative empty-like' => array(
				array(
					'test0' => $empty_like_values[0],
					'test1' => $empty_like_values[1],
					'test2' => $empty_like_values[2],
					'test3' => $empty_like_values[3],
					'test4' => $empty_like_values[4],
				),
				array(
					'test0' => $empty_like_values[0],
					'test1' => $empty_like_values[1],
					'test2' => $empty_like_values[2],
					'test3' => $empty_like_values[3],
					'test4' => $empty_like_values[4],
				),
			),
			'with empty-like 2nd level' => array(
				array(
					'test1' => 'test',
					'test2' => $empty_like_values,
					'test3' => array(
						'test4' => 'test0',
						'test5' => $empty_like_values,
						'i-x'   => 'important!',
					),
				),
				array(
					'test1' => 'test',
					'test2' => array(),
					'test3' => array(
						'test4' => 'test0',
					),
				),
			),
			'with empty-like deep level' => array(
				array(
					'test1' => 'test',
					'test2' => $empty_like_values,
					'test3' => array(
						'test4' => 'test0',
						'test5' => $empty_like_values,
						'test6' => array(
							'test7' => 'test8',
							'test9' => $empty_like_values,
							'i-x'   => 'important!',
						),
					),
				),
				array(
					'test1' => 'test',
					'test2' => array(),
					'test3' => array(
						'test4' => 'test0',
						'test6' => array(
							'test7' => 'test8',
						),
					),
				),
			),
		);
		// phpcs:enable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
	}

	/**
	 * @dataProvider for_prepare_save
	 */
	public function test_prepare_save( array $data, array $expected ): void {
		$this->assertSame( $expected, BoxHelper::prepare_save( $data ) );
	}

	public function for_get_priority(): array {
		// phpcs:disable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
		return array(
			'test with default' => array(
				array( 'priority' => 'default' ),
				10,
			),
			'test with high' => array(
				array( 'priority' => 'high' ),
				5,
			),
			'test with low' => array(
				array( 'priority' => 'low' ),
				15,
			),
			'test with unknown' => array(
				array( 'priority' => 'unknown' ),
				10,
			),
		);
		// phpcs:enable WordPress.Arrays.MultipleStatementAlignment.DoubleArrowNotAligned
	}

	/**
	 * @dataProvider for_get_priority
	 */
	public function test_get_priority( array $config, int $priority ) {
		$this->assertSame( $priority, BoxHelper::get_priority( $config ) );
	}
}
