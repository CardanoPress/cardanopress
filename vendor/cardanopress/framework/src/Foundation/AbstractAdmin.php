<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Interfaces\AdminInterface;
use CardanoPress\Interfaces\HookInterface;
use CardanoPress\SharedBase;
use CardanoPress\Traits\HasData;
use CardanoPress\Traits\Loggable;
use Psr\Log\LoggerInterface;
use ThemePlate\Core\Repository;
use ThemePlate\Page\MenuPage;
use ThemePlate\Page\SubMenuPage;
use ThemePlate\Settings\OptionBox;
use ThemePlate\Settings\OptionHandler;

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

    /**
     * @return MenuPage|SubMenuPage
     */
    protected function settingsPage(string $title, array $config = [])
    {
        $parent = $config['parent'] ?? '';
        $config = array_merge($config, [
            'menu_slug' => static::OPTION_KEY,
        ]);

        if ('' !== $parent) {
            unset($config['parent']);

            $page = new SubMenuPage($title, $parent, $config);
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
