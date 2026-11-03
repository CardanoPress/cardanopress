<?php

/**
 * @package ThemePlate
 */

namespace Tests\Integration;

use CardanoPress\Dependencies\CardanoPHP\Utilities\Bech32;
use CardanoPress\Dependencies\CBOR\CBOREncoder;
use CardanoPress\Dependencies\CBOR\Types\CBORByteString;
use PBWebDev\CardanoPress\Helpers\StakeProof;
use Tests\LoadDependencies;
use WP_UnitTestCase;

class StakeProofTest extends WP_UnitTestCase
{
    use LoadDependencies;

    private const MESSAGE = 'Login to example.org -- One-time nonce: 0123456789abcdef';

    private string $stakeSecret;
    private string $stakeHash;
    private string $stakeAddress;
    private string $paymentHash;

    public function setUp(): void
    {
        parent::setUp();
        $this->loadDependencies();

        $keypair = sodium_crypto_sign_keypair();
        $this->stakeSecret = sodium_crypto_sign_secretkey($keypair);
        $this->stakeHash = $this->keyHash(sodium_crypto_sign_publickey($keypair));
        $this->stakeAddress = $this->bech32('stake', "\xE1" . $this->stakeHash);
        $this->paymentHash = random_bytes(28);
    }

    private function keyHash(string $publicKey): string
    {
        return sodium_crypto_generichash($publicKey, '', 28);
    }

    private function bech32(string $prefix, string $bytes): string
    {
        return Bech32::encode($prefix, Bech32::toWords(array_values(unpack('C*', $bytes))), 1000);
    }

    /** @return array{string, string} Hex encoded COSE_Sign1 and COSE_Key. */
    private function sign(string $secretKey, string $protectedAddress, string $message = self::MESSAGE): array
    {
        $publicKey = sodium_crypto_sign_publickey_from_secretkey($secretKey);
        $protected = new CBORByteString(CBOREncoder::encode([
            1 => -8,
            'address' => new CBORByteString($protectedAddress),
        ]));
        $payload = new CBORByteString($message);
        $structure = CBOREncoder::encode(['Signature1', $protected, new CBORByteString(''), $payload]);
        $signature = sodium_crypto_sign_detached($structure, $secretKey);

        return [
            bin2hex(CBOREncoder::encode([$protected, ['hashed' => false], $payload, new CBORByteString($signature)])),
            bin2hex(CBOREncoder::encode([1 => 1, 3 => -8, -1 => 6, -2 => new CBORByteString($publicKey)])),
        ];
    }

    private function baseAddress(string $paymentHash, string $stakeHash, int $header = 0x01): string
    {
        return $this->bech32('addr', chr($header) . $paymentHash . $stakeHash);
    }

    public function test_stake_key_signature_passes(): void
    {
        [$signature, $key] = $this->sign($this->stakeSecret, "\xE1" . $this->stakeHash);
        $wallet = $this->baseAddress($this->paymentHash, $this->stakeHash);

        $this->assertTrue(StakeProof::verify($signature, $key, self::MESSAGE, $this->stakeAddress, $wallet));
    }

    public function test_payment_key_cannot_claim_a_copied_stake_credential(): void
    {
        $attacker = sodium_crypto_sign_keypair();
        $attackerSecret = sodium_crypto_sign_secretkey($attacker);
        $attackerHash = $this->keyHash(sodium_crypto_sign_publickey($attacker));
        $wallet = $this->baseAddress($attackerHash, $this->stakeHash);

        [$signature, $key] = $this->sign($attackerSecret, "\x01" . $attackerHash . $this->stakeHash);

        $this->assertFalse(StakeProof::verify($signature, $key, self::MESSAGE, $this->stakeAddress, $wallet));
    }

    public function test_key_hash_hidden_in_protected_address_is_rejected(): void
    {
        $attacker = sodium_crypto_sign_keypair();
        $attackerSecret = sodium_crypto_sign_secretkey($attacker);
        $attackerHash = $this->keyHash(sodium_crypto_sign_publickey($attacker));
        $wallet = $this->baseAddress($this->paymentHash, $this->stakeHash);

        [$signature, $key] = $this->sign($attackerSecret, "\xE1" . $this->stakeHash . $attackerHash);

        $this->assertFalse(StakeProof::verify($signature, $key, self::MESSAGE, $this->stakeAddress, $wallet));
    }

    public function test_enterprise_wallet_is_rejected(): void
    {
        [$signature, $key] = $this->sign($this->stakeSecret, "\xE1" . $this->stakeHash);
        $wallet = $this->bech32('addr', "\x61" . $this->paymentHash);

        $this->assertFalse(StakeProof::verify($signature, $key, self::MESSAGE, $this->stakeAddress, $wallet));
    }

    public function test_wallet_from_another_stake_key_is_rejected(): void
    {
        [$signature, $key] = $this->sign($this->stakeSecret, "\xE1" . $this->stakeHash);
        $wallet = $this->baseAddress($this->paymentHash, random_bytes(28));

        $this->assertFalse(StakeProof::verify($signature, $key, self::MESSAGE, $this->stakeAddress, $wallet));
    }

    public function test_wallet_on_another_network_is_rejected(): void
    {
        [$signature, $key] = $this->sign($this->stakeSecret, "\xE1" . $this->stakeHash);
        $wallet = $this->bech32('addr_test', "\x00" . $this->paymentHash . $this->stakeHash);

        $this->assertFalse(StakeProof::verify($signature, $key, self::MESSAGE, $this->stakeAddress, $wallet));
    }

    public function test_script_stake_wallet_is_rejected(): void
    {
        [$signature, $key] = $this->sign($this->stakeSecret, "\xE1" . $this->stakeHash);
        $wallet = $this->baseAddress($this->paymentHash, $this->stakeHash, 0x21);

        $this->assertFalse(StakeProof::verify($signature, $key, self::MESSAGE, $this->stakeAddress, $wallet));
    }

    public function test_signature_over_another_message_is_rejected(): void
    {
        [$signature, $key] = $this->sign($this->stakeSecret, "\xE1" . $this->stakeHash, 'something else');
        $wallet = $this->baseAddress($this->paymentHash, $this->stakeHash);

        $this->assertFalse(StakeProof::verify($signature, $key, self::MESSAGE, $this->stakeAddress, $wallet));
    }

    public function test_mainnet_address_containing_test_passes(): void
    {
        $seed = 0;

        do {
            $keypair = sodium_crypto_sign_seed_keypair(str_pad((string) ++$seed, SODIUM_CRYPTO_SIGN_SEEDBYTES, '0'));
            $stakeHash = $this->keyHash(sodium_crypto_sign_publickey($keypair));
            $stakeAddress = $this->bech32('stake', "\xE1" . $stakeHash);
        } while (false === strpos($stakeAddress, 'test'));

        [$signature, $key] = $this->sign(sodium_crypto_sign_secretkey($keypair), "\xE1" . $stakeHash);
        $wallet = $this->baseAddress($this->paymentHash, $stakeHash);

        $this->assertTrue(StakeProof::verify($signature, $key, self::MESSAGE, $stakeAddress, $wallet));
    }

    /** @return array<string, array{string}> */
    public function for_unterminated_cbor(): array
    {
        return [
            'open ended map' => ['bf'],
            'open ended array' => ['9f'],
            'map claiming a huge count' => ['bb7fffffffffffffff'],
            'array claiming a huge count' => ['9b7fffffffffffffff'],
        ];
    }

    /** @dataProvider for_unterminated_cbor */
    public function test_unterminated_cbor_fails_without_hanging(string $start): void
    {
        $text = '79' . sprintf('%04x', strlen(self::MESSAGE) + 66) . bin2hex(self::MESSAGE);
        $signature = $start . $text . '5840' . str_repeat('00', 64);
        $wallet = $this->baseAddress($this->paymentHash, $this->stakeHash);
        $key = str_repeat('00', 42);

        $this->assertFalse(StakeProof::verify($signature, $key, self::MESSAGE, $this->stakeAddress, $wallet));
    }

    public function test_malformed_key_material_fails_without_throwing(): void
    {
        [$signature] = $this->sign($this->stakeSecret, "\xE1" . $this->stakeHash);
        $wallet = $this->baseAddress($this->paymentHash, $this->stakeHash);
        $shortKey = bin2hex(CBOREncoder::encode([
            1 => 1,
            3 => -8,
            -1 => 6,
            -2 => new CBORByteString(str_repeat('a', 31)),
            4 => new CBORByteString(str_repeat('a', 32)),
        ]));

        $this->assertFalse(StakeProof::verify($signature, $shortKey, self::MESSAGE, $this->stakeAddress, $wallet));
    }

    public function test_decode_round_trips_and_rejects_bad_checksums(): void
    {
        $bytes = "\xE1" . $this->stakeHash;
        $address = $this->bech32('stake', $bytes);
        $last = substr($address, -1);

        $this->assertSame($bytes, StakeProof::decode($address));
        $this->assertNull(StakeProof::decode(substr($address, 0, -1) . ('q' === $last ? 'p' : 'q')));
        $this->assertNull(StakeProof::decode('no separator here'));
    }
}
