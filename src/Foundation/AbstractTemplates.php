<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Foundation;

abstract class AbstractTemplates
{
    protected array $pageTemplates;
    protected string $load_path;

    public function __construct(string $load_path)
    {
        $this->load_path = trailingslashit($load_path);
        $this->pageTemplates = $this->getPageTemplates($this->load_path);

        add_filter('theme_page_templates', [$this, 'setPageTemplates']);
        add_filter('template_include', [$this, 'loadCustomTemplate'], -1);
    }

    abstract protected function getPathPrefix(): string;

    abstract protected function getTitlePrefix(): string;

    abstract protected function getLoaderFile(): string;

    protected function getPageTemplates(string $path): array
    {
        $templates = [];

        foreach (glob($path . 'page/*.php') as $file) {
            $basename = basename($file, '.php');
            $filename = implode('', [
                trailingslashit($this->getPathPrefix()),
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

    public function setPageTemplates(array $templates): array
    {
        return array_merge($templates, $this->pageTemplates);
    }

    public function loadCustomTemplate(string $default): string
    {
        if (is_embed()) {
            return $default;
        }

        $loaderFile = $this->getLoaderFile();

        if (empty($loaderFile)) {
            return $default;
        }

        $template_file = locate_template($loaderFile);

        if (! $template_file) {
            $pathPrefix = trailingslashit($this->getPathPrefix());
            $template_file = $this->load_path . str_replace($pathPrefix, '', $loaderFile);
        }

        if (file_exists($template_file)) {
            return $template_file;
        }

        return $default;
    }

    public function getPath(bool $default = false): string
    {
        if ($default) {
            return $this->load_path;
        }

        return trailingslashit($this->getPathPrefix());
    }
}
