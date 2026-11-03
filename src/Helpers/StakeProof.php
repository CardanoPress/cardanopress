<?php

/**
 * @package ThemePlate
 * @since   1.36.3
 */

namespace PBWebDev\CardanoPress\Helpers;

use CardanoPress\Dependencies\CardanoPHP\Utilities\Bech32;
use CardanoPress\Dependencies\CardanoPHP\Verifier;
use CardanoPress\Dependencies\CBOR\CBOREncoder;
use CardanoPress\Dependencies\CBOR\Types\CBORByteString;
use Exception;
use Throwable;

class StakeProof
{
    private const HASH_LENGTH = 28;
    private const REWARD_KEY_HEADER = 0xE0;

    /**
     * Prove control of a stake key. A signature made with a payment key says
     * nothing about the stake credential in the same address, as anyone can
     * pair their own payment key with a victim's public stake credential. So
     * the signing key itself must hash to the stake credential.
     */
    public static function verify(
        string $signature,
        string $key,
        string $message,
        string $stakeAddress,
        string $walletAddress
    ): bool {
        try {
            if (Verifier::authenticate($signature, $key, $message, $stakeAddress) !== $stakeAddress) {
                return false;
            }

            $stake = self::decode($stakeAddress);

            if (null === $stake || ! self::isKeyRewardAddress($stake)) {
                return false;
            }

            return self::keyMatches($key, $stake) && self::walletMatches($walletAddress, $stake);
        } catch (Throwable $exception) {
            // Malformed CBOR or key material is a failed proof, not a server error.
            return false;
        }
    }

    /** @return string|null Raw address bytes, or null when the bech32 is invalid. */
    public static function decode(string $address): ?string
    {
        $position = strrpos($address, '1');

        if (false === $position) {
            return null;
        }

        $prefix = substr($address, 0, $position);
        $data = (string) substr($address, $position + 1, -6);

        if ('' === $data) {
            return null;
        }

        $words = [];

        foreach (str_split($data) as $character) {
            $word = strpos(Bech32::ALPHABET, $character);

            if (false === $word) {
                return null;
            }

            $words[] = $word;
        }

        try {
            if (Bech32::encode($prefix, $words, 1000) !== $address) {
                return null;
            }

            return pack('C*', ...Bech32::convert($words, 5, 8, false));
        } catch (Exception $exception) {
            return null;
        }
    }

    private static function isKeyRewardAddress(string $stake): bool
    {
        return 1 + self::HASH_LENGTH === strlen($stake) && self::REWARD_KEY_HEADER === (ord($stake[0]) & 0xF0);
    }

    private static function keyMatches(string $key, string $stake): bool
    {
        $keyBytes = hex2bin($key);

        if (false === $keyBytes) {
            return false;
        }

        $keyData = CBOREncoder::decode($keyBytes);

        if (! is_array($keyData) || ! isset($keyData[-2]) || ! $keyData[-2] instanceof CBORByteString) {
            return false;
        }

        $hash = sodium_crypto_generichash($keyData[-2]->get_byte_string(), '', self::HASH_LENGTH);

        return hash_equals(substr($stake, 1), $hash);
    }

    /** Only a base address carries a stake credential, which rules out enterprise wallets. */
    private static function walletMatches(string $walletAddress, string $stake): bool
    {
        $wallet = self::decode($walletAddress);

        if (null === $wallet || 1 + 2 * self::HASH_LENGTH !== strlen($wallet)) {
            return false;
        }

        $type = ord($wallet[0]) >> 4;
        $network = ord($wallet[0]) & 0x0F;

        if (! in_array($type, [0, 1], true) || (ord($stake[0]) & 0x0F) !== $network) {
            return false;
        }

        return hash_equals(substr($stake, 1), substr($wallet, 1 + self::HASH_LENGTH));
    }
}
