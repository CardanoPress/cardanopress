<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Foundation;

abstract class AbstractTemplates
{
    protected array $storage;
    protected string $load_path;

    public function __construct(string $load_path)
    {
        $this->load_path = trailingslashit($load_path);
        $this->storage = $this->getCustomTemplates($this->load_path);

        add_filter('theme_page_templates', [$this, 'setCustomTemplates']);
        add_filter('template_include', [$this, 'loadCustomTemplate']);
    }

    abstract protected function getPathPrefix(): string;

    abstract protected function getTitlePrefix(): string;

    protected function getCustomTemplates(string $path): array
    {
        $templates = [];

        foreach (glob($path . 'page/*.php') as $file) {
            $basename = basename($file, '.php');
            $filename = implode('', [
                $this->getPathPrefix(),
                'page/',
                $basename,
                '.php',
            ]);
            $templates[$filename] = $this->getTitlePrefix() . $this->prettyName($basename);
        }

        return $templates;
    }

    private function prettyName(string $string): string
    {
        return implode(' ', preg_split('/(?=[A-Z])/', $string));
    }

    public function setCustomTemplates(array $templates): array
    {
        return array_merge($templates, $this->storage);
    }

    public function loadCustomTemplate(string $default): string
    {
        if (is_search() || is_embed()) {
            return $default;
        }

        $page_template = $this->getLoaderFile();
        $template_file = locate_template($page_template);

        if (! $template_file && $this->isCustomPage($page_template)) {
            $template_file = $this->load_path . str_replace($this->getPathPrefix(), '', $page_template);
        }

        if (file_exists($template_file)) {
            return $template_file;
        }

        return $default;
    }

    protected function getLoaderFile(): string
    {
        return get_page_template_slug();
    }

    public function getPath(bool $default = false): string
    {
        if ($default) {
            return $this->load_path;
        }

        return $this->getPathPrefix();
    }

    public function isCustomPage(string $template): bool
    {
        return isset($this->storage[$template]);
    }
}
