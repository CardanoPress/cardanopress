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

    protected function setAdmin(AdminInterface $admin): void
    {
        $this->admin = $admin;
    }

    protected function getAdmin(): AdminInterface
    {
        return $this->admin;
    }

    public function option(string $key)
    {
        return $this->admin->getOption($key);
    }
}
