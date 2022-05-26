<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

trait HasSettingsLink
{
    protected string $settingsLinkUrl = '#';

    public function setSettingsLinkUrl(string $settingsLinkUrl): void
    {
        $this->settingsLinkUrl = $settingsLinkUrl;
    }

    public function getSettingsLinkUrl(): string
    {
        return $this->settingsLinkUrl;
    }

    public function getSettingsLink(string $text = 'Settings', string $target = '_self'): string
    {
        return sprintf(
            '<a href="%1$s" target="%2$s">%3$s</a>',
            $this->getSettingsLinkUrl(),
            $target,
            $text,
        );
    }

    public function mergeSettingsLink(array $links): array
    {
        $settings = $this->getSettingsLink();

        return array_merge(compact('settings'), $links);
    }
}
