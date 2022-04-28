<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Foundation;

use ThemePlate\Core\Data;

abstract class AbstractAdmin
{
    protected Data $data;

    public const OPTION_KEY = '';

    public function __construct()
    {
        $this->data = new Data();

        $this->setup();
    }

    abstract protected function setup(): void;

    public function getOption(string $key)
    {
        $options = get_option(static::OPTION_KEY, []);
        $value = $options[$key] ?? '';

        if ($value) {
            return $value;
        }

        return $this->data->get_default(static::OPTION_KEY, $key);
    }
}
