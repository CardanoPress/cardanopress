<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use PBWebDev\CardanoPress\Foundation\AbstractTemplates;

class Templates extends AbstractTemplates
{
    public function getPathPrefix(): string
    {
        return 'cardanopress/';
    }

    public function getTitlePrefix(): string
    {
        return 'CardanoPress:';
    }

    public function createPages(): void
    {
        $optionsValue = get_option(Admin::OPTION_KEY, []);

        foreach ($this->storage as $template => $name) {
            $title = substr($name, strlen($this->getTitlePrefix()) + 1);
            $slug = 'member_' . sanitize_title($title);

            if (! empty($optionsValue[$slug])) {
                continue;
            }

            $postId = $this->createPage($title, $template);

            if ($postId) {
                $optionsValue[$slug] = $postId;
                $currentTemplate = get_post_meta($postId, '_wp_page_template', true);

                if ('default' === $currentTemplate) {
                    update_post_meta($postId, '_wp_page_template', $template);
                }
            }
        }

        update_option(Admin::OPTION_KEY, $optionsValue);
    }

    protected function createPage(string $title, string $template): int
    {
        $found = get_page_by_path(sanitize_title($title));

        if (
            null !== $found && in_array(
                get_post_meta($found->ID, '_wp_page_template', true),
                ['default', $template],
                true
            )
        ) {
            return $found->ID;
        }

        return wp_insert_post([
            'post_status' => 'publish',
            'post_type' => 'page',
            'post_title' => $title,
            'meta_input' => [
                '_wp_page_template' => $template,
            ],
        ]);
    }
}
