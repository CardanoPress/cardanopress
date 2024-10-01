<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Dependencies\Psr\Log\LoggerInterface;
use CardanoPress\Dependencies\ThemePlate\Core\Repository;
use CardanoPress\Dependencies\ThemePlate\Page\BasePage;
use CardanoPress\Dependencies\ThemePlate\Page\MenuPage;
use CardanoPress\Dependencies\ThemePlate\Page\SubMenuPage;
use CardanoPress\Dependencies\ThemePlate\Settings\OptionBox;
use CardanoPress\Dependencies\ThemePlate\Settings\OptionHandler;
use CardanoPress\Interfaces\AdminInterface;
use CardanoPress\Interfaces\HookInterface;
use CardanoPress\Traits\HasData;
use CardanoPress\Traits\Loggable;
use CardanoPress\SharedBase;

abstract class AbstractAdmin extends SharedBase implements AdminInterface, HookInterface
{
    use HasData;
    use Loggable;

    public const OPTION_KEY = '';

    public function __construct(LoggerInterface $logger)
    {
        $repository = new Repository(new OptionHandler());

        $this->setData($repository);
        $this->setLogger($logger);
        $this->initialize();
    }

    protected function settingsPage(string $title, array $config = []): BasePage
    {
        $parent = $config['parent'] ?? '';
        $config = array_merge($config, [
            'menu_slug' => static::OPTION_KEY,
        ]);

        if ('' !== $parent) {
            unset($config['parent']);

            $page = new SubMenuPage($title, '', $config);

            $page->parent($parent);
        } else {
            $page = new MenuPage($title, $config);
        }

        $page->setup();

        return $page;
    }

    protected function optionFields(string $title, array $config): OptionBox
    {
        $fields = $config['fields'] ?? null;

        if (null !== $fields) {
            unset($config['fields']);
        }

        $settings = new OptionBox($title, $config);

        if (null !== $fields) {
            $settings->fields($fields);
        }

        $settings->location(static::OPTION_KEY)->create();

        $this->storeConfig($settings->get_config());

        return $settings;
    }

    public function getOption(string $key)
    {
        return $this->retrieveValue($key, static::OPTION_KEY);
    }
}
