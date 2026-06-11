<?php

/**
 * @package ThemePlate
 */

namespace Tests\Integration;

use PBWebDev\CardanoPress\Collection;
use PHPUnit\Framework\TestCase;
use ReflectionMethod;
use Tests\LoadDependencies;

class CollectionTest extends TestCase
{
    use LoadDependencies;

    protected function setUp(): void
    {
        parent::setUp();
        $this->loadDependencies();
    }

    /** Invoke the private getImageSrc() helper. */
    private function getImageSrc(string $link, bool $base64 = false): string
    {
        $method = new ReflectionMethod(Collection::class, 'getImageSrc');
        $method->setAccessible(true);

        return $method->invoke(new Collection([]), $link, $base64);
    }

    /** @return array<string, array{string, string}> */
    public function for_image_src(): array
    {
        $cid_v0 = 'Qm' . str_repeat('a', 44); // 46 chars total
        $cid_v1 = 'baf' . str_repeat('b', 56); // 59 chars total

        return [
            'https passthrough' => ['https://example.com/a.png', 'https://example.com/a.png'],
            'ipfs scheme rewrite' => [
                'ipfs://QmHash',
                Collection::ASSETS_URL . '/QmHash',
            ],
            'bare CIDv0' => [$cid_v0, Collection::ASSETS_URL . $cid_v0],
            'bare CIDv1' => [$cid_v1, Collection::ASSETS_URL . $cid_v1],
            'data uri passthrough' => ['data:image/png;base64,AAAA', 'data:image/png;base64,AAAA'],
            'unknown returns empty' => ['ftp://nope', ''],
            'empty returns empty' => ['', ''],
        ];
    }

    /** @dataProvider for_image_src */
    public function test_get_image_src(string $link, string $expected): void
    {
        $this->assertSame($expected, $this->getImageSrc($link));
    }

    public function test_get_image_src_base64_flag(): void
    {
        $base64 = base64_encode('hello world');

        $this->assertSame(
            'data:image/png;base64,' . $base64,
            $this->getImageSrc($base64, true)
        );

        // Without the flag, a bare base64 string is not treated as an image.
        $this->assertSame('', $this->getImageSrc($base64, false));
    }

    public function test_grab_handle_returns_name_for_handle_policy(): void
    {
        $collection = new Collection([
            'policy_id' => Collection::ADA_HANDLE['mainnet'],
            'onchain_metadata' => ['name' => '$myhandle'],
        ]);

        $this->assertSame('$myhandle', $collection->grabHandle());
    }

    public function test_grab_handle_returns_empty_for_non_handle_policy(): void
    {
        $collection = new Collection([
            'policy_id' => 'someotherpolicyid',
            'onchain_metadata' => ['name' => '$myhandle'],
        ]);

        $this->assertSame('', $collection->grabHandle());
    }

    public function test_grab_handle_returns_empty_for_empty_data(): void
    {
        $this->assertSame('', (new Collection([]))->grabHandle());
    }

    public function test_filtered_asset_skips_empty_data(): void
    {
        $this->assertSame([], (new Collection([]))->filteredAsset());
    }

    public function test_filtered_asset_skips_metadata_only_policy_key(): void
    {
        // onchain_metadata with a single key equal to the policy_id is treated as skippable.
        $collection = new Collection([
            'policy_id' => 'abc123',
            'asset_name' => '74657374', // "test"
            'onchain_metadata' => ['abc123' => 'whatever'],
        ]);

        $this->assertSame([], $collection->filteredAsset());
    }

    public function test_filtered_asset_builds_expected_shape(): void
    {
        $collection = new Collection([
            'policy_id' => 'abc123',
            'asset_name' => '74657374', // hex for "test"
            'onchain_metadata' => [
                'name' => 'Test Asset',
                'image' => 'ipfs://QmHash',
            ],
        ]);

        $result = $collection->filteredAsset(5);

        $this->assertSame(5, $result['_quantity']);
        $this->assertSame('test', $result['packed_name']);
        $this->assertSame(Collection::ASSETS_URL . '/QmHash', $result['parsed_image']);
    }
}
