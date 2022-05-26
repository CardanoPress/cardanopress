<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Clients;

use Closure;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ConnectException;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Middleware;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7\Response;
use JsonException;

class BlockfrostClient
{
    private Client $client;

    public const DELAY = 1000;
    public const MAX_RETRIES = 5;
    public const ENDPOINT = [
        'mainnet' => 'https://cardano-mainnet.blockfrost.io/api/v0/',
        'testnet' => 'https://cardano-testnet.blockfrost.io/api/v0/',
    ];

    /**
     * Create a new BlockfrostClient instance
     */
    public function __construct(string $project_id, string $network = 'mainnet')
    {
        if (! array_key_exists($network, self::ENDPOINT)) {
            $network = 'mainnet';
        }

        $Accept = 'application/json';
        $this->client = new Client([
            'base_uri' => self::ENDPOINT[$network],
            'timeout' => 10,
            'connect_timeout' => 10,
            'handler' => $this->createHandlerStack(),
            'headers' => compact('Accept', 'project_id'),
        ]);
    }

    private function createHandlerStack(): HandlerStack
    {
        $stack = HandlerStack::create();
        $stack->push(Middleware::retry($this->retryDecider(), $this->retryDelay()));

        return $stack;
    }

    private function retryDecider(): Closure
    {
        return static function (
            $retries,
            Request $request,
            Response $response = null,
            RequestException $exception = null
        ) {
            if ($retries >= self::MAX_RETRIES) {
                return false;
            }

            if ($exception instanceof ConnectException) {
                return true;
            }

            if ($response && $response->getStatusCode() >= 500) {
                return true;
            }

            return false;
        };
    }

    private function retryDelay(): Closure
    {
        return static function ($numberOfRetries) {
            return self::DELAY * $numberOfRetries;
        };
    }

    /**
     * Make a GET request to the API endpoint
     *
     * @param  string  $endpoint
     * @param  array   $query
     *
     * @return array
     */
    public function request(string $endpoint, array $query = []): array
    {
        $value = [
            'status_code' => 500,
            'data' => [],
        ];

        try {
            $response = $this->client->request('GET', $endpoint, compact('query'));

            $value['status_code'] = $response->getStatusCode();
            $value['data'] = json_decode($response->getBody(), true, 512, JSON_THROW_ON_ERROR);
        } catch (RequestException $error) {
            $response = $error->getResponse();

            try {
                $value['status_code'] = $response->getStatusCode();
                $value['error'] = json_decode($response->getBody(), true, 512, JSON_THROW_ON_ERROR);
            } catch (JsonException $e) {
                $value['error'] = $e->getMessage();
            } finally {
                if (empty($value['error'])) {
                    $value['error'] = $error->getMessage();
                }
            }
        } catch (GuzzleException $e) {
            $value['error'] = $e->getMessage();
        } catch (JsonException $e) {
            $value['error'] = $e->getMessage();
        } finally {
            return $value;
        }
    }
}
