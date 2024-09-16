<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Dependencies\CardanoPHP\Utilities;

class Credential
{
    protected HashType $type;
    protected string $hash;

    public function __construct(HashType $type, string $hash)
    {
        $this->type = $type;
        $this->hash = $hash;
    }

    public function getType(): HashType
    {
        return $this->type;
    }

    public function getHash(): string
    {
        return $this->hash;
    }
}
