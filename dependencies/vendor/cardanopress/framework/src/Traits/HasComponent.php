<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

use CardanoPress\Foundation\AbstractComponent;

trait HasComponent
{
    public function component(bool $echo = true): AbstractComponent
    {
        return new AbstractComponent($echo);
    }
}
