<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

use ThemePlate\Core\Repository;
use ThemePlate\Core\Config;

trait HasData
{
    protected ?Repository $data = null;

    protected function setData(Repository $data): void
    {
        $this->data = $data;
    }

    protected function getData(): Repository
    {
        return $this->data;
    }

    protected function storeConfig(Config $config): void
    {
        $this->getData()->store($config);
    }

    protected function retrieveValue(string $key, string $id)
    {
        return $this->getData()->retrieve($key, $id);
    }
}
