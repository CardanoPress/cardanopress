<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Helpers;

class HttpHelper
{
    public const HTTP_TIMEOUT_SECONDS = MINUTE_IN_SECONDS;
    public const HTTP_RESPONSE_LIMIT_BYTES = 262144;

    /** @return array{timeout: int, sslverify: bool, limit_response_size: int} */
    public static function getRequestArgs(string $url): array
    {
        return [
            'timeout' => self::getRequestTimeout($url),
            'sslverify' => self::getSslVerify($url),
            'limit_response_size' => self::getResponseSizeLimit($url),
        ];
    }

    public static function getRequestTimeout(string $url): int
    {
        $timeout = (int) apply_filters('http_request_timeout', self::HTTP_TIMEOUT_SECONDS, $url);

        if ($timeout < 1) {
            return 1;
        }

        return min($timeout, self::HTTP_TIMEOUT_SECONDS);
    }

    public static function getSslVerify(string $url): bool
    {
        // Keep WordPress-local SSL override compatibility but ignore non-bool values.
        $sslverify = apply_filters('https_local_ssl_verify', true, $url);

        return is_bool($sslverify) ? $sslverify : true;
    }

    public static function getResponseSizeLimit(string $url): int
    {
        $limit = (int) apply_filters('cardanopress_http_response_size_limit', self::HTTP_RESPONSE_LIMIT_BYTES, $url);

        if ($limit < 1) {
            return self::HTTP_RESPONSE_LIMIT_BYTES;
        }

        return $limit;
    }
}
