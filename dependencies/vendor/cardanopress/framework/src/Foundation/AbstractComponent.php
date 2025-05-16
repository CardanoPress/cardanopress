<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Foundation;

use CardanoPress\SharedBase;

abstract class AbstractComponent extends SharedBase
{
    protected bool $echo;

    public function __construct(bool $echo)
    {
        $this->echo = $echo;

        $this->initialize();
    }

    /** @param array<string, string> $data */
    protected function attributes(array $data): string
    {
        $attr = [];

        foreach (array_filter($data) as $key => $value) {
            $attr[] = sprintf('%s="%s"', $key, esc_attr($value));
        }

        $attr = implode(' ', $attr);

        return $this->printOrReturn($attr);
    }

    protected function printOrReturn(string $value): string
    {
        if (! $this->echo) {
            return $value;
        }

        echo $value;

        return '';
    }
}
