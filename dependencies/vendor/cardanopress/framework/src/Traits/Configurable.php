<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

use CardanoPress\Foundation\AbstractAdmin;

trait Configurable
{
    protected AbstractAdmin $admin;

    protected function setAdmin(AbstractAdmin $admin): void
    {
        $this->admin = $admin;
    }

    protected function getAdmin(): AbstractAdmin
    {
        return $this->admin;
    }

    public function option(string $key)
    {
        return $this->admin->getOption($key);
    }
}
