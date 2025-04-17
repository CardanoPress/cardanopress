<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Interfaces;

interface ProfileInterface
{
    public function setUserAuth(string $username): void;

    public function unsetUserAuth(): void;

    /** @return mixed */
    public function getData(?string $key = null);

    public function addRole(string $role): void;

    public function removeRole(string $role): void;

    public function hasRole(string $role): bool;

    public function isConnected(): bool;

    public function connectedNetwork(): string;

    public function saveNetwork(string $query_network): bool;

    public function connectedWallet(): string;

    public function saveWallet(string $walletAddress): bool;

    public function connectedStake(): string;

    public function saveStake(string $stakeAddress): bool;

    /** @return mixed[] */
    public function storedAssets(): array;

    /** @param mixed[] $data */
    public function saveAssets(array $data): bool;

    /** @return array{network: string, action: string, hash: string}[] */
    public function allTransactions(): array;

    public function saveTransaction(string $network, string $action, string $hash): bool;

    public function dismissNotice(string $type, bool $reset = false): bool;

    public function isDismissedNotice(string $type): bool;
}
