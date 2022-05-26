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
use Exception;
use Psr\Log\LoggerInterface;
use ThemePlate\Core\Data;
use ThemePlate\Page;
use ThemePlate\Settings;

abstract class AbstractAdmin extends SharedBase implements AdminInterface, HookInterface
{
    use HasData;
    use Loggable;

    public const OPTION_KEY = '';

    public function __construct(LoggerInterface $logger)
    {
        $this->setData(new Data());
        $this->setLogger($logger);
        $this->initialize();
    }

    protected function settingsPage(string $title, array $config = []): void
    {
        try {
            new Page(array_merge($config, [
                'id' => static::OPTION_KEY,
                'title' => $title,
            ]));
        } catch (Exception $exception) {
            $this->log($exception->getMessage(), 'error');
        }
    }

    protected function optionFields(array $config): void
    {
        try {
            $settings = new Settings(array_merge($config, ['page' => static::OPTION_KEY]));

            $this->storeConfig($settings->get_config());
        } catch (Exception $exception) {
            $this->log($exception->getMessage(), 'error');
        }
    }

    public function getOption(string $key)
    {
        $options = get_option(static::OPTION_KEY, []);
        $value = $options[$key] ?? '';

        if ($value) {
            return $value;
        }

        return $this->getDefault(static::OPTION_KEY, $key);
    }
}
