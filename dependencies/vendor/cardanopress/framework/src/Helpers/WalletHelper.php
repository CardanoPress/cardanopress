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

    public static function getCardanoscanLink(string $network, string $endpoint): string
    {
        $base = [
            'mainnet' => 'https://cardanoscan.io/',
            'testnet' => 'https://testnet.cardanoscan.io/',
            'preprod' => 'https://preprod.cardanoscan.io/',
            'preview' => 'https://preview.cardanoscan.io/',
        ];

        $network = strtolower($network);

        if (! in_array($network, array_keys($base), true)) {
            $network = 'mainnet';
        }

        return $base[$network] . $endpoint;
    }
}
