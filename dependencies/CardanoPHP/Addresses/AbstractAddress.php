<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Dependencies\CardanoPHP\Addresses;

use CardanoPress\Dependencies\CardanoPHP\Utilities\Bech32;
use CardanoPress\Dependencies\CardanoPHP\Utilities\Network;

abstract class AbstractAddress
{
    private string $addressHex    = '';
    private string $addressBytes  = '';
    private string $addressBech32 = '';
    protected Network $network;

    public const DATA = '';

    public function __construct(Network $network)
    {
        $this->network = $network;
    }

    protected function computeBech32($addressBytes): string
    {
        $unpack = unpack('C*', $addressBytes);
        $words  = Bech32::toWords(array_values($unpack));
        $data   = static::DATA . ( 0 === $this->network->id() ? '_test' : '' );

        return Bech32::encode($data, $words, 1000);
    }

    abstract protected function maskPayload(): int;

    protected function computeHex($hash): void
    {
        $payload = $this->maskPayload() | $this->network->id();
        $address = sprintf('%02x', $payload) . $hash;

        $this->addressHex    = $address;
        $this->addressBytes  = hex2bin($address);
        $this->addressBech32 = $this->computeBech32($this->addressBytes);
    }

    public function getHex(): string
    {
        return $this->addressHex;
    }

    public function getBytes(): string
    {
        return $this->addressBytes;
    }

    public function getBech32(): string
    {
        return $this->addressBech32;
    }
}
