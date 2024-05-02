<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

trait HasPageTemplates
{
    protected string $pageTitlePrefix = '';
    protected array $pageTemplates = [];

    protected function setPageTitlePrefix(string $pageTitlePrefix): void
    {
        $this->pageTitlePrefix = $pageTitlePrefix;
    }

    protected function getPageTitlePrefix(): string
    {
        return $this->pageTitlePrefix;
    }

    protected function setPageTemplates(array $pageTemplates): void
    {
        $this->pageTemplates = $pageTemplates;
    }

    protected function getPageTemplates(): array
    {
        return $this->pageTemplates;
    }

    private function prettyName(string $string): string
    {
        return implode(' ', preg_split('/(?=[A-Z])/', $string));
    }

    protected function searchPageTemplates(string $pathPattern, string $metaPrefix): void
    {
        $pageTemplates = [];

        foreach (glob($pathPattern) as $file) {
            $basename = basename($file, '.php');
            $filename = implode('', [
                $metaPrefix,
                basename(dirname($file)),
                '/',
                $basename,
                '.php',
            ]);
            $pageTemplates[$filename] = $this->getPageTitlePrefix() . $this->prettyName($basename);
        }

        $this->setPageTemplates($pageTemplates);
    }

    public function mergePageTemplates(array $templates): array
    {
        return array_merge($templates, $this->getPageTemplates());
    }

    protected function getLoaderFile(): string
    {
        return get_page_template_slug();
    }
}
