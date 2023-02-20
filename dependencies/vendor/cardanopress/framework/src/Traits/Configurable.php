<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

use CardanoPress\Interfaces\AdminInterface;

trait Configurable
{
    protected AdminInterface $admin;

    public function option(string $key)
    {
        return $this->admin->getOption($key);
    }
}
