<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Foundation;

use CardanoPress\Clients\BlockfrostClient;
use CardanoPress\Interfaces\BlockfrostInterface;
use CardanoPress\SharedBase;
use CardanoPress\Traits\Loggable;
use Psr\Log\LoggerInterface;

abstract class AbstractBlockfrost extends SharedBase implements BlockfrostInterface
{
    use Loggable;

    protected BlockfrostClient $client;
    protected array $lastResponse = [];
    protected static array $projectIds = [
        'mainnet' => '',
        'testnet' => '',
    ];

    public function __construct(string $queryNetwork, LoggerInterface $logger = null)
    {
        $projectId = $this->getProjectId($queryNetwork);
        $this->client = new BlockfrostClient($projectId);

        if (null !== $logger) {
            $this->setLogger($logger);
        }

        $this->initialize(); // Set logger here
    }

    public static function useProjectIds(string $mainnet, string $testnet): void
    {
        self::$projectIds['mainnet'] = $mainnet;
        self::$projectIds['testnet'] = $testnet;
    }

    public static function getProjectId(string $network): string
    {
        return self::$projectIds[$network] ?? '';
    }

    public static function isReady(string $network): bool
    {
        return '' !== self::getProjectId($network);
    }

    public function setClient(BlockfrostClient $client): void
    {
        $this->client = $client;
    }

    public function getClient(): BlockfrostClient
    {
        return $this->client;
    }

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
