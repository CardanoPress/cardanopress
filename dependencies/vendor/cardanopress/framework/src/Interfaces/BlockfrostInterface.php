<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Interfaces;

use CardanoPress\Clients\BlockfrostClient;
use Psr\Log\LoggerInterface;

interface BlockfrostInterface
{
    public function __construct(string $queryNetwork, LoggerInterface $logger = null);

    public static function useProjectIds(string $mainnet, string $testnet): void;

    public static function getProjectId(string $network): string;

    public static function isReady(string $network): bool;

    public function setClient(BlockfrostClient $client): void;

    public function getClient(): BlockfrostClient;

    public function request(string $endpoint, array $query = []): array;

    public function getResponse(string $key = null);
}
