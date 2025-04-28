<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress;

class Asset
{
    protected string $path;
    /** @var string[] */
    protected array $parts;

    public function __construct(string $path)
    {
        $this->path = $path;
        $this->parts = explode('.', $path);
    }

    public function isEntry(): bool
    {
        return 1 < count($this->parts) && in_array($this->parts[1], ['ts', 'js', 'css'], true);
    }

    public function name(): string
    {
        return $this->parts[0];
    }

    public function type(): string
    {
        return in_array($this->parts[1], ['ts', 'js'], true) ? 'script' : 'style';
    }
}
