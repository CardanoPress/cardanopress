<?php

/**
 * @package ThemePlate
 */

namespace Tests\Integration;

use CardanoPress\Foundation\AbstractSanitizer;
use CardanoPress\Interfaces\TemplatesInterface;
use CardanoPress\TemplateLoader;
use CardanoPress\Traits\HasTemplateShortcodes;
use PBWebDev\CardanoPress\Application;
use PBWebDev\CardanoPress\Shortcode;
use PBWebDev\CardanoPress\TemplateLoader as PluginTemplateLoader;
use ReflectionClass;
use ReflectionMethod;
use ReflectionProperty;
use Tests\LoadDependencies;
use WP_UnitTestCase;

class ShortcodeSecurityTest extends WP_UnitTestCase
{
    use LoadDependencies;

    private string $dir;

    public function setUp(): void
    {
        parent::setUp();
        $this->loadDependencies();

        $this->dir = sys_get_temp_dir() . '/cp-tpl-' . uniqid();
        mkdir($this->dir . '/part', 0777, true);
        file_put_contents($this->dir . '/ok.php', '<?php echo "OK";');
        file_put_contents($this->dir . '/pwned.php', '<?php echo "PWNED";');
        file_put_contents($this->dir . '/vars.php', '<?php echo isset($foo) ? $foo : "none";');
        file_put_contents(dirname($this->dir) . '/cp-outside.php', '<?php echo "OUTSIDE";');
    }

    public function tearDown(): void
    {
        foreach (glob($this->dir . '/{,part/}*.php', GLOB_BRACE) as $file) {
            unlink($file);
        }

        rmdir($this->dir . '/part');
        rmdir($this->dir);
        @unlink(dirname($this->dir) . '/cp-outside.php');
        parent::tearDown();
    }

    private function templates(string $path): TemplatesInterface
    {
        return new class ($path) implements TemplatesInterface {
            private string $path;

            public function __construct(string $path)
            {
                $this->path = $path;
            }

            public function loadCustomTemplate(string $default): string
            {
                return $default;
            }

            public function getPath(): string
            {
                return $this->path;
            }

            public function getOverridesPrefix(): string
            {
                return 'cardanopress/';
            }
        };
    }

    /** @param array<string, mixed> $variables */
    private function load(string $name, array $variables = []): string
    {
        $loader = new TemplateLoader($this->templates($this->dir . '/'));

        ob_start();
        $loader->load($name, $variables);

        return (string) ob_get_clean();
    }

    private function shortcode(): object
    {
        $class = new class () {
            use HasTemplateShortcodes;

            public function __construct()
            {
            }

            public function useTemplates(TemplatesInterface $templates): void
            {
                $this->setTemplates($templates);
            }
        };

        $class->useTemplates($this->templates($this->dir . '/'));

        return $class;
    }

    public function test_file_variable_cannot_change_included_path(): void
    {
        $output = $this->load('ok', [
            'file' => $this->dir . '/pwned.php',
            '__file' => $this->dir . '/pwned.php',
            'name' => 'pwned',
            'this' => 'x',
        ]);

        $this->assertSame('OK', $output);
    }

    public function test_variables_with_valid_keys_are_available(): void
    {
        $this->assertSame('bar', $this->load('vars', ['foo' => 'bar', '1bad' => 'x', 'a-b' => 'y']));
    }

    /** @return array<string, array{string}> */
    public function unsafe_names(): array
    {
        return [
            'traversal' => ['part/../../../cp-outside'],
            'traversal simple' => ['../cp-outside'],
            'nul' => ["ok\0"],
            'colon' => ['php://filter/resource=ok'],
            'leading slash' => ['/etc/passwd'],
        ];
    }

    /** @dataProvider unsafe_names */
    public function test_loader_refuses_unsafe_names(string $name): void
    {
        $this->assertSame('', $this->load($name));
    }

    /** @dataProvider unsafe_names */
    public function test_do_template_refuses_unsafe_names(string $name): void
    {
        $this->assertSame('', $this->shortcode()->doTemplate(['name' => $name]));
    }

    public function test_do_template_ignores_file_variable(): void
    {
        $output = $this->shortcode()->doTemplate([
            'name' => 'ok',
            'variables' => 'file=' . rawurlencode($this->dir . '/pwned.php'),
        ]);

        $this->assertSame('OK', $output);
    }

    public function test_do_template_still_loads_subfolder(): void
    {
        file_put_contents($this->dir . '/part/item.php', '<?php echo "ITEM";');

        $this->assertSame('ITEM', $this->shortcode()->doTemplate(['name' => 'part/item']));
    }

    public function test_secret_options_return_empty(): void
    {
        add_filter('cardanopress_public_options', static function ($keys) {
            $keys[] = 'blockfrost_project_id';
            $keys[] = 'recaptcha_key';

            return $keys;
        });

        $shortcode = $this->pluginShortcode();

        $this->assertSame('', $shortcode->doOption(['key' => 'blockfrost_project_id']));
        $this->assertSame('', $shortcode->doOption(['key' => 'blockfrost_project_id', 'sub' => 'mainnet']));
        $this->assertSame('', $shortcode->doOption(['key' => 'recaptcha_key', 'sub' => 'secret']));
        $this->assertSame('', $shortcode->doOption(['key' => 'unknown_key']));
    }

    /** @return array<string, array{string, bool}> */
    public function conditions(): array
    {
        return [
            'identifier' => ['isConnected', true],
            'negated' => ['!isConnected', true],
            'and with negation' => ['!isConnected && hasHandle', true],
            'or' => ['a||b', true],
            'zero argument call' => ['hasHandle()', false],
            'call in a chain' => ['!isConnected && hasHandle()', false],
            'alert' => ['alert(1)', false],
            'call with args' => ['hasHandle(1)', false],
            'member access' => ['window.x', false],
            'quote break' => ['a" x-init="alert(1)', false],
            'fetch' => ['fetch("//e")', false],
            'assignment' => ['a = 1', false],
            'dangling operator' => ['a &&', false],
        ];
    }

    /** @dataProvider conditions */
    public function test_condition_validation(string $condition, bool $allowed): void
    {
        $output = $this->shortcode()->doTemplateIf(['condition' => $condition], '<b>x</b>');

        if ($allowed) {
            $this->assertStringContainsString('<template x-if="', $output);
            $this->assertStringContainsString('<b>x</b>', $output);
        } else {
            $this->assertSame('', $output);
        }
    }

    /** @dataProvider conditions */
    public function test_plugin_condition_validation(string $condition, bool $allowed): void
    {
        $output = $this->pluginShortcode()->doTemplateIf(['condition' => $condition], '<b>x</b>');

        if ($allowed) {
            $this->assertStringContainsString('<template x-if="', $output);
        } else {
            $this->assertSame('', $output);
        }
    }

    public function test_condition_allowed_for_unfiltered_html_author(): void
    {
        $admin = self::factory()->user->create(['role' => 'administrator']);
        $contributor = self::factory()->user->create(['role' => 'contributor']);

        foreach ([$this->shortcode(), $this->pluginShortcode()] as $shortcode) {
            $GLOBALS['post'] = get_post(self::factory()->post->create(['post_author' => $admin]));
            $this->assertStringContainsString('x-if', $shortcode->doTemplateIf(['condition' => 'a.b'], 'x'));

            $GLOBALS['post'] = get_post(self::factory()->post->create(['post_author' => $contributor]));
            $this->assertSame('', $shortcode->doTemplateIf(['condition' => 'a.b'], 'x'));
        }
    }

    private function pluginShortcode(?string $secret = null): Shortcode
    {
        $application = $this->getMockBuilder(Application::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['option'])
            ->getMock();
        $application->method('option')->willReturnCallback(
            static fn (string $key) => 'recaptcha_key' === $key ? ['secret' => (string) $secret] : ''
        );

        $shortcode = (new ReflectionClass(Shortcode::class))->newInstanceWithoutConstructor();

        (new ReflectionProperty(Shortcode::class, 'application'))->setValue($shortcode, $application);
        (new ReflectionProperty(Shortcode::class, 'templates'))->setValue(
            $shortcode,
            $this->templates($this->dir . '/')
        );

        return $shortcode;
    }

    public function test_shortcode_uses_its_own_template_methods_and_loader(): void
    {
        foreach (['doTemplate', 'doTemplateIf'] as $method) {
            $declaring = (new ReflectionMethod(Shortcode::class, $method))->getDeclaringClass()->getName();

            $this->assertSame(Shortcode::class, $declaring);
        }

        $shortcode = $this->pluginShortcode();

        // Old framework behaviour: the "file" variable replaced the included path
        $pwned = rawurlencode($this->dir . '/pwned.php');
        $output = $shortcode->doTemplate(['name' => 'ok', 'variables' => 'file=' . $pwned . '&__file=' . $pwned]);

        $this->assertSame('OK', $output);
        $this->assertSame('bar', $shortcode->doTemplate(['name' => 'vars', 'variables' => 'foo=bar&1bad=x']));
        $this->assertSame('', $shortcode->doTemplate(['name' => '../cp-outside']));
        $this->assertSame('', $shortcode->doTemplate(['name' => 'php://filter/resource=ok']));
        $this->assertFalse(PluginTemplateLoader::isSafeName('part/../../x'));
        $this->assertTrue(PluginTemplateLoader::isSafeName('part/item'));
    }

    public function test_payment_address_is_public_only_without_recaptcha(): void
    {
        $this->assertSame('', $this->pluginShortcode('secret')->doOption(['key' => 'payment_address']));
        $this->assertSame('', $this->pluginShortcode()->doOption(['key' => 'recaptcha_key']));

        $method = new ReflectionMethod(Shortcode::class, 'publicOptions');
        $method->setAccessible(true);

        $onKeys = $method->invoke($this->pluginShortcode('secret'));
        $offKeys = $method->invoke($this->pluginShortcode());
        $expected = ['delegation_pool_id', 'payment_amount', 'payment_split', 'ua_required_epoch'];
        $expected[] = 'ua_required_amount';

        foreach ($expected as $key) {
            $this->assertContains($key, $onKeys);
            $this->assertContains($key, $offKeys);
        }

        $this->assertNotContains('payment_address', $onKeys);
        $this->assertContains('payment_address', $offKeys);
    }

    public function test_connect_wallet_type_cannot_break_out(): void
    {
        $loader = new TemplateLoader($this->templates(getcwd() . '/templates/'));

        ob_start();
        $loader->load('part/connect-wallet', ['type' => "x'+alert(1)+'"]);
        $html = (string) ob_get_clean();

        $this->assertSame(1, preg_match('/x-data="([^"]*)"/', $html, $matches));

        $decoded = html_entity_decode($matches[1]);
        $slash = chr(92);

        $this->assertStringNotContainsString("'", $decoded);
        $this->assertSame('{type:"x' . $slash . 'u0027+alert(1)+' . $slash . 'u0027"}', $decoded);

        ob_start();
        $loader->load('part/connect-wallet', ['type' => '"});alert(1);({"']);
        $html = (string) ob_get_clean();

        $this->assertSame(1, preg_match('/x-data="([^"]*)"/', $html, $matches));
        $expected = '{type:"' . $slash . 'u0022});alert(1);({' . $slash . 'u0022"}';
        $this->assertSame($expected, html_entity_decode($matches[1]));
    }

    public function test_array_post_value_does_not_fatal(): void
    {
        $sanitizer = new class () extends AbstractSanitizer {
            public static function customizableMessages(): array
            {
                return ['x' => 'Invalid x'];
            }

            public function x(string $value): string
            {
                return $value;
            }
        };

        $_POST['x'] = ['1'];

        add_filter('wp_die_ajax_handler', static function () {
            return static function () {
                throw new \RuntimeException('die');
            };
        });
        add_filter('wp_doing_ajax', '__return_true');

        ob_start();

        try {
            $sanitizer->sanitizePost('x');
            $this->fail('Expected an error response');
        } catch (\RuntimeException $exception) {
            $this->assertSame('die', $exception->getMessage());
        } finally {
            $output = (string) ob_get_clean();
            unset($_POST['x']);
        }

        $this->assertStringContainsString('Invalid x', $output);
    }
}
