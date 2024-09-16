<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Dependencies\CardanoPHP\Utilities;

use Exception;

class Bech32
{
    public const ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';

    public static function polymodStep(int $chk): int
    {
        $b = $chk >> 25;
        return (($chk & 0x1ffffff) << 5) ^
        (-($b >> 0 & 1) & 0x3b6a57b2) ^
        (-($b >> 1 & 1) & 0x26508e6d) ^
        (-($b >> 2 & 1) & 0x1ea119fa) ^
        (-($b >> 3 & 1) & 0x3d4233dd) ^
        (-($b >> 4 & 1) & 0x2a1462b3);
    }

    public static function prefixChk(string $prefix): int
    {
        $chk = 1;
        foreach (str_split($prefix) as $char) {
            $chk = self::polymodStep($chk) ^ (ord($char) >> 5);
        }
        $chk = self::polymodStep($chk);
        foreach (str_split($prefix) as $char) {
            $chk = self::polymodStep($chk) ^ (ord($char) & 0x1f);
        }
        return $chk;
    }

    public static function convert(array $data, int $inBits, int $outBits, bool $pad = true)
    {
        $value = 0;
        $bits = 0;
        $maxV = (1 << $outBits) - 1;
        $result = [];

        foreach ($data as $byte) {
            $value = ($value << $inBits) | $byte;
            $bits += $inBits;

            while ($bits >= $outBits) {
                $bits -= $outBits;
                $result[] = ($value >> $bits) & $maxV;
            }
        }

        if ($pad) {
            if ($bits > 0) {
                $result[] = ($value << ($outBits - $bits)) & $maxV;
            }
        } else {
            if ($bits >= $inBits) {
                throw new Exception('Excess padding');
            }
            if (($value << ($outBits - $bits)) & $maxV) {
                throw new Exception('Non-zero padding');
            }
        }

        return $result;
    }

    public static function toWords(array $bytes): array
    {
        return self::convert($bytes, 8, 5, true);
    }

    public static function encode(string $prefix, array $words, int $LIMIT = 90)
    {
        if (strlen($prefix) + 7 + count($words) > $LIMIT) {
            throw new Exception('Exceeds length limit');
        }

        $prefix = strtolower($prefix);

        $chk = self::prefixChk($prefix);
        $result = $prefix . '1';

        foreach ($words as $x) {
            if ($x >> 5 !== 0) {
                throw new Exception('Non 5-bit word');
            }
            $chk = self::polymodStep($chk) ^ $x;
            $result .= self::ALPHABET[$x];
        }

        for ($i = 0; $i < 6; ++$i) {
            $chk = self::polymodStep($chk);
        }
        $chk ^= 1;

        for ($i = 0; $i < 6; ++$i) {
            $v = ($chk >> (5 * (5 - $i))) & 0x1f;
            $result .= self::ALPHABET[$v];
        }

        return $result;
    }
}
