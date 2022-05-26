<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

trait Instantiable
{
    protected static self $instance;

    public static function getInstance(): self
    {
        return self::$instance;
    }

    protected function setInstance(self $instance): void
    {
        self::$instance = $instance;
    }
}
