<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Foundation;

use CardanoPress\Clients\BlockfrostClient;
use CardanoPress\SharedBase;
use CardanoPress\Traits\Loggable;

abstract class AbstractBlockfrost extends SharedBase
{
    use Loggable;

    protected BlockfrostClient $client;
    protected array $lastResponse = [];

    public function __construct(string $queryNetwork)
    {
        $projectId = $this->getProjectId($queryNetwork);
        $this->client = new BlockfrostClient($projectId);

        $this->initialize(); // Set logger here
    }

    abstract public static function getProjectId(string $network): string;

    public function request(string $endpoint, array $query = []): array
    {
        $response = $this->client->request($endpoint, $query);
        $this->lastResponse = $response;

        if (200 !== $response['status_code'] || ! empty($response['error'])) {
            $this->log($endpoint);
            $this->log(print_r($query, true));
            $this->log(print_r($response, true));
        }

        return $response;
    }

    public function getResponse(string $key = null)
    {
        if (null === $key) {
            return $this->lastResponse;
        }

        return $this->lastResponse[$key] ?? null;
    }
}
