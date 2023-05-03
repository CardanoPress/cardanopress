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

    public function getData(string $key = null);

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

    public function storedAssets(): array;

    public function saveAssets(array $data): bool;

    public function allTransactions(): array;

    public function saveTransaction(string $network, string $action, string $hash): bool;

    public function dismissNotice(string $type, bool $reset = false): bool;

    public function isDismissedNotice(string $type): bool;
}
