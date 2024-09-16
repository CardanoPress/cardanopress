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

    public static function verify(string $signature, string $key, string $message, string $address): bool
    {
        if ('' === $signature || '' === $key || '' === $message || '' === $address) {
            return false;
        }

        $verifier = new self($signature, $key);

        if (! $verifier->isAddress($address)) {
            return false;
        }

        if (! $verifier->hasExpected($message)) {
            return false;
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

        if (84 !== strlen($this->key)) {
            return false;
        }

        $last = substr($this->signature, $index);

        if (strlen($last) !== strlen($hexMessage) + 132) {
            return false;
        }

        return true;
    }

    protected function correctCBOR(string $message, string $providedAddress): bool
    {
        $cborSignature = hex2bin($this->signature);
        $signatureData = CBOREncoder::decode($cborSignature);

        if (! $this->isCoseSign1($signatureData)) {
            return false;
        }

        $protectedHeader        = $signatureData[0]->get_byte_string();
        $decodedProtectedHeader = CBOREncoder::decode($protectedHeader);

        if (! $this->handledHeader($decodedProtectedHeader)) {
            return false;
        }

        $payload = $signatureData[2]->get_byte_string();

        if ($payload !== $message) {
            return false;
        }

        $cborKey = hex2bin($this->key);
        $keyData = CBOREncoder::decode($cborKey);

        if (! $this->validKeyPair($keyData)) {
            return false;
        }

        $protectedAddress = $decodedProtectedHeader['address']->get_byte_string();
        $publicKey        = $keyData[-2]->get_byte_string();
        $credentialHash   = sodium_crypto_generichash($publicKey, '', 28);
        $hexAddress       = bin2hex($protectedAddress);

        if (false === strpos($hexAddress, bin2hex($credentialHash))) {
            return false;
        }

        $network    = false === strpos($providedAddress, 'test') ? new Mainnet() : new Testnet();
        $credential = new Credential(
            new Address(),
            substr($hexAddress, 2, 56)
        );

        if (0 === strpos($providedAddress, 'addr')) {
            $stakeCredentialHash = substr($hexAddress, 2 + 56);

            if ($stakeCredentialHash) {
                $decodedAddress = new ShelleyAddress(
                    $network,
                    $credential,
                    new Credential(
                        new Address(),
                        substr($hexAddress, 2 + 56)
                    ),
                );
            } else {
                $decodedAddress = new EnterpriseAddress(
                    $network,
                    $credential
                );
            }
        } elseif (0 === strpos($providedAddress, 'stake')) {
            $decodedAddress = new RewardAddress(
                $network,
                $credential
            );
        }

        if (empty($decodedAddress)) {
            return false;
        }

        if ($decodedAddress->getBech32() !== $providedAddress) {
            return false;
        }

        $sigStructure = array(
            'Signature1',
            $signatureData[0],
            new CBORByteString(''),
            $signatureData[2],
        );

        return sodium_crypto_sign_verify_detached(
            $signatureData[3]->get_byte_string(),
            CBOREncoder::encode($sigStructure),
            $publicKey
        );
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
        if (! is_array($value) || 2 !== count($value)) {
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
        if (! is_array($data) || 4 !== count($data)) {
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
