<?php

/**
 * @package ThemePlate
 */

namespace Tests\Integration;

use PBWebDev\CardanoPress\Helpers\OutputHelper;
use Tests\LoadDependencies;
use WP_UnitTestCase;

class OutputHelperTest extends WP_UnitTestCase
{
    use LoadDependencies;

    public function setUp(): void
    {
        parent::setUp();
        $this->loadDependencies();
    }

    /** @return array<string, array{string, string}> */
    public function for_escape_src(): array
    {
        return [
            'https url' => ['https://example.com/image.png', 'https://example.com/image.png'],
            'http url' => ['http://example.com/image.png', 'http://example.com/image.png'],
            'data png base64' => ['data:image/png;base64,iVBORw0KGgo=', 'data:image/png;base64,iVBORw0KGgo='],
            'data jpeg base64' => ['data:image/jpeg;base64,/9j/4AAQ', 'data:image/jpeg;base64,/9j/4AAQ'],
            'data gif base64' => ['data:image/gif;base64,R0lGODlh', 'data:image/gif;base64,R0lGODlh'],
            'data webp base64' => ['data:image/webp;base64,UklGR', 'data:image/webp;base64,UklGR'],
            'data png no base64' => ['data:image/png,rawbytes', 'data:image/png,rawbytes'],
            'data svg+xml rejected' => ['data:image/svg+xml,<svg onload=alert(1)>', ''],
            'data svg+xml base64 rejected' => ['data:image/svg+xml;base64,PHN2ZyBvbmxvYWQ9', ''],
            'data text/html rejected' => ['data:text/html,<script>alert(1)</script>', ''],
            'javascript rejected' => ['javascript:alert(1)', ''],
            'empty string' => ['', ''],
            'data pngx rejected' => ['data:image/pngx;base64,AAA', ''],
            'data PNG uppercase rejected' => ['data:image/PNG;base64,AAA', ''],
            'data no separator rejected' => ['data:image/pnggarbagenoseparator', ''],
        ];
    }

    /** @dataProvider for_escape_src */
    public function test_escape_src(string $input, string $expected): void
    {
        if ('' === $expected) {
            $this->assertSame('', OutputHelper::escapeSrc($input));

            return;
        }

        $result = OutputHelper::escapeSrc($input);
        $this->assertNotEmpty($result);
        $scheme = parse_url($input, PHP_URL_SCHEME);
        $this->assertStringContainsString(is_string($scheme) ? $scheme : 'data', $result);
    }

    public function test_https_url_uses_esc_url(): void
    {
        $input = 'https://example.com/image.png';

        $this->assertSame(esc_url($input), OutputHelper::escapeSrc($input));
    }

    public function test_data_png_uses_esc_attr(): void
    {
        $input = 'data:image/png;base64,iVBORw0KGgo=';

        $this->assertSame(esc_attr($input), OutputHelper::escapeSrc($input));
    }
}
