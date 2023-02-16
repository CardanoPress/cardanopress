<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Helpers;

class NumberHelper
{
    public static function lovelaceToAda(int $number): float
    {
        return $number / 1000000;
    }

    public static function adaPrecision(float $number): string
    {
        return number_format($number, 6);
    }

    public static function shortRounded(int $number): string
    {
        $units = ['', 'K', 'M', 'B', 'T'];

        for ($i = 0; $number >= 1000; $i++) {
            $number /= 1000;
        }

        return round($number, 2) . $units[$i];
    }

    public static function toUnixTimestamp(int $epoch): int
    {
        return $epoch * 432000 + 1506203091;
    }
}
