<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Interfaces;

use CardanoPress\Dependencies\Psr\Log\LoggerInterface;

interface AdminInterface
{
    public function __construct(LoggerInterface $logger);

    public function getOption(string $key);
}
