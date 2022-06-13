<?php

/**
 * @package ThemePlate
 */

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;
use ThemePlate\Core\Config;
use ThemePlate\Core\Field;
use ThemePlate\Core\Fields;
use ThemePlate\Core\Handler;
use ThemePlate\Core\Repository;

class ConfigRepositoryTest extends TestCase {
	private Repository $repository;

	public function setUp(): void {
		$handler = new class() extends Handler {
			public function get_value( Field $field, string $data_prefix, string $current_id ) {
				if ( '123' === $current_id ) {
					return 'hooray!';
				}

				return $field->get_config( 'default' );
			}
		};

		$this->repository = new Repository( $handler );
	}

	public function test_repository(): void {
		$this->assertInstanceOf( Field::class, $this->repository->search( 'test' ) );
		$this->assertIsArray( $this->repository->dump() );
	}

	public function test_with_config(): void {
		$config = new Config( '', null );

		$this->repository->store( $config );
		$this->test_repository();
	}

	public function test_with_fields(): void {
		$fields = new Fields(
			array(
				'test' => array(
					'type' => 'type',
				),
				'this' => array(
					'type' => 'date',
				),
				'that' => array(
					'type' => 'time',
				),
				'then' => array(
					'type'    => 'email',
					'default' => 'tester',
				),
			)
		);
		$config = new Config( 'prefix_', $fields );

		$this->repository->store( $config );
		$this->assertInstanceOf( Field\TypeField::class, $this->repository->search( 'prefix_test' ) );
		$this->assertInstanceOf( Field\DateField::class, $this->repository->search( 'prefix_this' ) );
		$this->assertInstanceOf( Field::class, $this->repository->search( 'prefix_unknown' ) );
		$this->assertSame( '', $this->repository->retrieve( 'prefix_that', 0 ) );
		$this->assertSame( 'hooray!', $this->repository->retrieve( 'prefix_that', 123 ) );
		$this->assertSame( 'tester', $this->repository->retrieve( 'prefix_then', 0 ) );
	}
}
