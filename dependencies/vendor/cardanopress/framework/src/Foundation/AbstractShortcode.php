<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\Interfaces\HookInterface;

abstract class AbstractShortcode implements HookInterface
{
    /**
     * @param  mixed   $value
     * @param  string  $sub
     *
     * @return mixed
     */
    protected function printOutput($value, string $sub = '')
    {
        if (is_array($value)) {
            $value = empty($sub) ? $value : $value[$sub] ?? '';

            return $this->getString($value);
        }

        return $value;
    }

    /**
     * @param array|string $value
     *
     * @return string
     */
    protected function getString($value): string
    {
        return is_array($value) ? json_encode($value) : $value;
    }
}
