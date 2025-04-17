<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Interfaces;

use CardanoPress\Clients\BlockfrostClient;
use CardanoPress\Dependencies\Psr\Log\LoggerInterface;

interface BlockfrostInterface
{
    public function __construct(string $queryNetwork, ?LoggerInterface $logger = null);

    public static function useProjectIds(string $mainnet, string $testnet): void;

    public static function getProjectId(string $network): string;

    public static function isReady(string $network): bool;

    public function setClient(BlockfrostClient $client): void;

    public function getClient(): BlockfrostClient;

    /**
     * @param  mixed[] $query
     *
     * @return array{
     *     status_code: int,
     *     data: mixed[],
     *     error?: string,
     * }
     */
    public function request(string $endpoint, array $query = []): array;

    /** @return mixed */
    public function getResponse(?string $key = null);
}
