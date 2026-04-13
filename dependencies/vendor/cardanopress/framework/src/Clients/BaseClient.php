<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Clients;

use CardanoPress\Dependencies\GuzzleHttp\Client as GuzzleClient;
use CardanoPress\Dependencies\GuzzleHttp\Exception\ConnectException;
use CardanoPress\Dependencies\GuzzleHttp\Exception\GuzzleException;
use CardanoPress\Dependencies\GuzzleHttp\Exception\RequestException;
use CardanoPress\Dependencies\GuzzleHttp\HandlerStack;
use CardanoPress\Dependencies\GuzzleHttp\Middleware;
use CardanoPress\Dependencies\GuzzleHttp\Psr7\Request;
use CardanoPress\Dependencies\GuzzleHttp\Psr7\Response as BaseResponse;
use CardanoPress\Dependencies\GuzzleHttp\RetryMiddleware;
use CardanoPress\Dependencies\Psr\Http\Message\ResponseInterface;
use DateTime;
use Exception;
use JsonException;

/**
 * @phpstan-type Response array{
 *     status_code: int,
 *     data: mixed,
 *     error?: string,
 * }
 */
class BaseClient
{
    private GuzzleClient $client;

    /** @var Response */
    protected array $lastResponse = [
        'status_code' => 0,
        'data' => [],
    ];

    public const RETRY_CODES = [429, 503];
    public const MAX_RETRIES = 5;

    /**
     * @param string $baseUri
     * @param (callable(HandlerStack): void)|null $stacker
     */
    public function __construct(string $baseUri, ?callable $stacker = null)
    {
        $this->client = new GuzzleClient([
            'base_uri' => $baseUri,
            'timeout' => 10,
            'connect_timeout' => 10,
            'handler' => $this->createHandler($stacker),
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ],
        ]);
    }

    /**
     * @param (callable(HandlerStack): void)|null $stacker
     *
     * @return HandlerStack
     */
    private function createHandler(?callable $stacker = null): HandlerStack
    {
        $stack = HandlerStack::create();
        $stack->push(Middleware::retry([$this, 'retryDecider'], [$this, 'retryDelay']));

        if (null !== $stacker) {
            $stacker($stack);
        }

        return $stack;
    }

    public function retryDecider(
        int $retries,
        Request $request,
        ?BaseResponse $response = null,
        ?Exception $exception = null
    ): bool {
        if ($retries >= static::MAX_RETRIES) {
            return false;
        }

        if ($exception instanceof ConnectException) {
            return true;
        }

        if (null !== $response && in_array($response->getStatusCode(), static::RETRY_CODES, true)) {
            return true;
        }

        return false;
    }

    public function retryDelay(int $numberOfRetries, ?ResponseInterface $response = null): int
    {
        if (null === $response || ! $response->hasHeader('Retry-After')) {
            return RetryMiddleware::exponentialDelay($numberOfRetries);
        }

        $retryAfter = $response->getHeaderLine('Retry-After');

        if (! is_numeric($retryAfter)) {
            try {
                $retryAfter = (new DateTime($retryAfter))->getTimestamp() - time();
            } catch (Exception $e) {
                $retryAfter = 0;
            }
        }

        return (int) $retryAfter * 1000;
    }

    /**
     * Make a request to the API endpoint
     *
     * @param  string                $method
     * @param  string                $endpoint
     * @param  array<string, mixed>  $options
     *
     * @return Response
     */
    public function request(string $method, string $endpoint, array $options = []): array
    {
        $value = [
            'status_code' => 500,
            'data' => [],
        ];

        try {
            $response = $this->client->request($method, $endpoint, $options);
            $value['status_code'] = $response->getStatusCode();
            $value['data'] = json_decode($response->getBody(), true, 512, JSON_THROW_ON_ERROR);
        } catch (RequestException $error) {
            $response = $error->getResponse();

            if (null === $response) {
                $value['error'] = $error->getMessage();

                return $value;
            }

            try {
                $value['status_code'] = $response->getStatusCode();
                $value['error'] = json_decode($response->getBody(), true, 512, JSON_THROW_ON_ERROR);
            } catch (JsonException $e) {
                $value['error'] = $e->getMessage();
            }
        } catch (GuzzleException $e) {
            $value['error'] = $e->getMessage();
        } catch (JsonException $e) {
            $value['error'] = $e->getMessage();
        }

        $this->lastResponse = $value;

        return $value;
    }

    /**
     * @return Response
     */
    public function getLastResponse(): array
    {
        return $this->lastResponse;
    }
}
