<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Dependencies\CardanoPHP\Addresses;

use CardanoPress\Dependencies\CardanoPHP\Utilities\Bech32;
use CardanoPress\Dependencies\CardanoPHP\Utilities\Network;
use ErrorException;
use Exception;

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

    /** @throws Exception */
    protected function computeBech32(string $addressBytes): string
    {
        $unpack = unpack('C*', $addressBytes);

        if (false === $unpack) {
            return '';
        }

        $words = Bech32::toWords(array_values($unpack));
        $data  = static::DATA . ( 0 === $this->network->id() ? '_test' : '' );

        return Bech32::encode($data, $words, 1000);
    }

    abstract protected function maskPayload(): int;

    /** @throws Exception */
    protected function computeHex(string $hash): void
    {
        $payload = $this->maskPayload() | $this->network->id();
        $address = sprintf('%02x', $payload) . $hash;
        $binary  = false;
        $message = '';

        set_error_handler(function ($errno, $errstr, $errfile, $errline) {
            throw new ErrorException($errstr, 0, $errno, $errfile, $errline);
        }, E_WARNING);

        try {
            $binary = hex2bin($address);
        } catch (Exception $e) {
            $message = $e->getMessage();
        }

        restore_error_handler();

        if (false === $binary) {
            throw new Exception($message);
        }

        $this->addressHex    = $address;
        $this->addressBytes  = $binary;
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
