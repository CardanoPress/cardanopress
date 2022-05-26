<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

use Psr\Log\LoggerInterface;

trait Loggable
{
    private ?LoggerInterface $logger = null;

    protected function setLogger(LoggerInterface $logger): void
    {
        $this->logger = $logger;
    }

    protected function getLogger(): LoggerInterface
    {
        return $this->logger;
    }

    protected function log(string $message, string $level = 'info'): void
    {
        $this->getLogger()->log($level, $message);
    }
}
