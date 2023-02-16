<?php

/**
 * @package ThemePlate
 * @since   2.0.0
 */

if (! interface_exists('Psr\Log\LoggerInterface')) {
    class_alias('CardanoPress\Dependencies\Psr\Log\LoggerInterface', 'Psr\Log\LoggerInterface');
}
