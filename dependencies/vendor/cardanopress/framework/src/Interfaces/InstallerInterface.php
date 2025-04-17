<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Interfaces;

interface InstallerInterface
{
    public function __construct(ApplicationInterface $application);

    public function activate(): void;

    public function maybeDoUpgrades(?bool $isActivating = false): void;
}
