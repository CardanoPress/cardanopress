<?php

/**
 * @package ThemePlate
 */

namespace Tests;

trait LoadDependencies
{
    public function loadDependencies(): void
    {
        require_once getcwd() . '/dependencies/vendor/autoload_packages.php';
    }
}
