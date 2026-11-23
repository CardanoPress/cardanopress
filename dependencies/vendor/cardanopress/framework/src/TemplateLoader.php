<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress;

use CardanoPress\Interfaces\TemplatesInterface;

class TemplateLoader
{
    protected TemplatesInterface $templates;

    public function __construct(TemplatesInterface $templates)
    {
        $this->templates = $templates;
    }

    public static function isSafeName(string $name): bool
    {
        return '' !== $name
            && false === strpos($name, '..')
            && false === strpos($name, "\0")
            && false === strpos($name, ':')
            && false === strpos($name, '\\')
            && '/' !== $name[0];
    }

    /** @param array<string, mixed> $variables */
    public function load(string $name, array $variables = []): void
    {
        if (! self::isSafeName($name)) {
            return;
        }

        $name .= '.php';
        $prefix = $this->templates->getOverridesPrefix();
        $file = locate_template($prefix . $name);

        if (! $file) {
            $file = $this->templates->getPath() . $name;
        }

        $file = $this->resolve($file);

        if (null === $file) {
            return;
        }

        $safe = [];

        foreach ($variables as $key => $value) {
            if (is_string($key) && 1 === preg_match('/^[a-zA-Z_][a-zA-Z0-9_]*$/', $key)) {
                $safe[$key] = $value;
            }
        }

        // Static closure: variables can't touch $file, $this or the loader scope
        (static function (array $__variables, string $__file): void {
            unset($__variables['__variables'], $__variables['__file'], $__variables['this']);
            extract($__variables, EXTR_SKIP);
            include $__file;
        })($safe, $file);
    }

    private function resolve(string $file): ?string
    {
        $real = realpath($file);

        if (false === $real || ! is_file($real)) {
            return null;
        }

        $prefix = trim($this->templates->getOverridesPrefix(), '/\\');
        $roots = [$this->templates->getPath()];

        foreach ([get_stylesheet_directory(), get_template_directory()] as $theme) {
            $roots[] = rtrim($theme, '/\\') . ('' !== $prefix ? '/' . $prefix : '');
        }

        foreach ($roots as $root) {
            $root = realpath($root);

            if (false === $root) {
                continue;
            }

            $root = rtrim($root, '/\\') . DIRECTORY_SEPARATOR;

            if (0 === strpos($real, $root)) {
                return $real;
            }
        }

        return null;
    }
}
