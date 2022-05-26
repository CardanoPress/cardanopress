<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

use ThemePlate\Core\Data;

trait HasData
{
    protected ?Data $data = null;

    protected function setData(Data $data): void
    {
        $this->data = $data;
    }

    protected function getData(): Data
    {
        return $this->data;
    }

    protected function storeConfig(array $config): void
    {
        $this->getData()->store($config);
    }

    protected function getDefault(string $key, string $id)
    {
        return $this->getData()->get_default($key, $id);
    }
}
