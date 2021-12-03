<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

class Templates
{
    protected string $prefix = 'cardanopress/';
    protected string $title = 'CardanoPress:';
    private array $storage;
    private string $load_path;

    public function __construct(string $load_path)
    {
        $this->load_path = trailingslashit($load_path);
        $this->storage = $this->getCustomTemplates($this->load_path);

        add_filter('theme_page_templates', [$this, 'setCustomTemplates']);
        add_filter('template_include', [$this, 'loadCustomTemplate']);
    }

    private function getCustomTemplates(string $path): array
    {
        $templates = [];

        foreach (glob($path . 'page/*.php') as $file) {
            $basename = basename($file, '.php');
            $filename = implode('', [
                $this->prefix,
                'page/',
                $basename,
                '.php',
            ]);
            $templates[$filename] = $this->title . ' ' . $this->prettyName($basename);
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
            $template_file = $this->load_path . str_replace($this->prefix, '', $page_template);
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

        return $this->prefix;
    }

    public function isCustomPage(string $template): bool
    {
        return isset($this->storage[$template]);
    }
}
