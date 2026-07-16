<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Dependencies\CardanoPHP;

use CardanoPress\Dependencies\CardanoPHP\Addresses\EnterpriseAddress;
use CardanoPress\Dependencies\CardanoPHP\Addresses\RewardAddress;
use CardanoPress\Dependencies\CardanoPHP\Addresses\ShelleyAddress;
use CardanoPress\Dependencies\CardanoPHP\HashType\Address;
use CardanoPress\Dependencies\CardanoPHP\Utilities\Credential;
use CardanoPress\Dependencies\CardanoPHP\Network\Mainnet;
use CardanoPress\Dependencies\CardanoPHP\Network\Testnet;
use CardanoPress\Dependencies\CBOR\CBOREncoder;
use CardanoPress\Dependencies\CBOR\Types\CBORByteString;

class Verifier
{
    protected string $signature;
    protected string $key;

    public function __construct(string $signature, string $key)
    {
        $this->signature = $signature;
        $this->key       = $key;
    }

    /**
     * Verify a wallet data-signature and, on success, return the stake (reward)
     * address DERIVED from the signed wallet address. Callers must use this
     * return value as the account identity: it is bound to the signed payload,
     * unlike any stake address posted alongside the signature (which an attacker
     * can set to a victim's public stake address to impersonate them).
     *
     * Returns null on any verification failure, and also for addresses that have
     * no stake credential (enterprise addresses) — those cannot key an account.
     */
    public static function verify(string $signature, string $key, string $message, string $address): ?string
    {
        if ('' === $signature || '' === $key || '' === $message || '' === $address) {
            return null;
        }

        $verifier = new self($signature, $key);

        if (! $verifier->isAddress($address)) {
            return null;
        }

        if (! $verifier->hasExpected($message)) {
            return null;
        }

        return $verifier->correctCBOR($message, $address);
    }

    protected function isAddress(string $value): bool
    {
        return (
            0 === strpos($value, 'addr1') ||
            0 === strpos($value, 'stake1') ||
            0 === strpos($value, 'addr_test1') ||
            0 === strpos($value, 'stake_test1')
        );
    }

    protected function hasExpected(string $message): bool
    {
        $hexMessage = bin2hex($message);
        $index      = strpos($this->signature, $hexMessage);

        if (false === $index) {
            return false;
        }

        if (84 > strlen($this->key)) {
            return false;
        }

        $last = substr($this->signature, $index);

        if (strlen($last) !== strlen($hexMessage) + 132) {
            return false;
        }

        return true;
    }

    protected function correctCBOR(string $message, string $providedAddress): ?string
    {
        $cborSignature = hex2bin($this->signature);
        $signatureData = CBOREncoder::decode($cborSignature);

        if (! $this->isCoseSign1($signatureData)) {
            return null;
        }

        $protectedHeader        = $signatureData[0]->get_byte_string();
        $decodedProtectedHeader = CBOREncoder::decode($protectedHeader);

        if (! $this->handledHeader($decodedProtectedHeader)) {
            return null;
        }

        $payload = $signatureData[2]->get_byte_string();

        if ($payload !== $message) {
            return null;
        }

        $cborKey = hex2bin($this->key);
        $keyData = CBOREncoder::decode($cborKey);

        if (! $this->validKeyPair($keyData)) {
            return null;
        }

        $protectedAddress = $decodedProtectedHeader['address']->get_byte_string();
        $publicKey        = $keyData[-2]->get_byte_string();
        $credentialHash   = sodium_crypto_generichash($publicKey, '', 28);
        $hexAddress       = bin2hex($protectedAddress);

        if (false === strpos($hexAddress, bin2hex($credentialHash))) {
            return null;
        }

        $network    = false === strpos($providedAddress, 'test') ? new Mainnet() : new Testnet();
        $credential = new Credential(
            new Address(),
            substr($hexAddress, 2, 56)
        );

        // The stake address is derived from the SIGNED wallet address only, so it
        // cannot be spoofed by a separately-posted value. Stays null for
        // enterprise addresses (no stake credential): they cannot key an account.
        $stakeAddress   = null;
        $decodedAddress = null;

        if (0 === strpos($providedAddress, 'addr')) {
            $stakeCredentialHash = substr($hexAddress, 2 + 56);

            if ($stakeCredentialHash) {
                $stakeCredential = new Credential(
                    new Address(),
                    $stakeCredentialHash
                );
                $decodedAddress  = new ShelleyAddress(
                    $network,
                    $credential,
                    $stakeCredential
                );
                $stakeAddress    = (new RewardAddress($network, $stakeCredential))->getBech32();
            } else {
                $decodedAddress = new EnterpriseAddress(
                    $network,
                    $credential
                );
            }
        } elseif (0 === strpos($providedAddress, 'stake')) {
            // The wallet signed with its reward address directly: it IS the stake address.
            $decodedAddress = new RewardAddress(
                $network,
                $credential
            );
            $stakeAddress = $decodedAddress->getBech32();
        }

        if (empty($decodedAddress)) {
            return null;
        }

        if ($decodedAddress->getBech32() !== $providedAddress) {
            return null;
        }

        $sigStructure = array(
            'Signature1',
            $signatureData[0],
            new CBORByteString(''),
            $signatureData[2],
        );

        $verified = sodium_crypto_sign_verify_detached(
            $signatureData[3]->get_byte_string(),
            CBOREncoder::encode($sigStructure),
            $publicKey
        );

        return $verified ? $stakeAddress : null;
    }

    protected function isCoseSign1($data): bool
    {
        if (! is_array($data) || 4 !== count($data)) {
            return false;
        }

        if (empty($data[0]) || empty($data[1]) || empty($data[2]) || empty($data[3])) {
            return false;
        }

        if (
            'object' !== gettype($data[0]) ||
            'array' !== gettype($data[1]) ||
            'object' !== gettype($data[2]) ||
            'object' !== gettype($data[3])
        ) {
            return false;
        }

        if (
            CBORByteString::class !== get_class($data[0]) ||
            ! isset($data[1]['hashed']) ||
            CBORByteString::class !== get_class($data[2]) ||
            CBORByteString::class !== get_class($data[3])
        ) {
            return false;
        }

        return true;
    }

    protected function handledHeader($value): bool
    {
        if (! is_array($value) || 2 > count($value)) {
            return false;
        }

        if (empty($value[1] || empty($value['address']))) {
            return false;
        }

        if (
            -8 !== $value[1] ||
            'object' !== gettype($value['address']) ||
            CBORByteString::class !== get_class($value['address'])
        ) {
            return false;
        }

        return true;
    }

    protected function validKeyPair($data): bool
    {
        if (! is_array($data) || 4 > count($data)) {
            return false;
        }

        if (empty($data[1]) || empty($data[3]) || empty($data[-1]) || empty($data[-2])) {
            return false;
        }

        if (
            1 !== $data[1] ||
            -8 !== $data[3] ||
            6 !== $data[-1] ||
            'object' !== gettype($data[-2]) ||
            CBORByteString::class !== get_class($data[-2])
        ) {
            return false;
        }

        return true;
    }
}
