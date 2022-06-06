<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Helpers;

class WalletHelper
{
    public static function getNetworkFromAddress(string $address): string
    {
        return 0 === strpos($address, 'addr1') ? 'mainnet' : 'testnet';
    }

    public static function getNetworkFromStake(string $address): string
    {
        return 0 === strpos($address, 'stake1') ? 'mainnet' : 'testnet';
    }
}
