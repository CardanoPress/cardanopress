<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Traits;

use Psr\Log\LoggerInterface;

trait Loggable
{
    protected ?LoggerInterface $logger = null;

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
        if (null === $this->logger) {
            error_log(strtoupper($level) . ' > ' . print_r($message, true));
            return;
        }

        $this->getLogger()->log($level, $message);
    }
}
