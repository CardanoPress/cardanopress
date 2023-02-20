<?php declare(strict_types=1);

/*
 * This file is part of the CardanoPress\Dependencies\Monolog package.
 *
 * (c) Jordi Boggiano <j.boggiano@seld.be>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace CardanoPress\Dependencies\Monolog\Handler\FingersCrossed;

use CardanoPress\Dependencies\Monolog\Logger;
use CardanoPress\Dependencies\Psr\Log\LogLevel;

/**
 * Channel and Error level based monolog activation strategy. Allows to trigger activation
 * based on level per channel. e.g. trigger activation on level 'ERROR' by default, except
 * for records of the 'sql' channel; those should trigger activation on level 'WARN'.
 *
 * Example:
 *
 * <code>
 *   $activationStrategy = new ChannelLevelActivationStrategy(
 *       Logger::CRITICAL,
 *       array(
 *           'request' => Logger::ALERT,
 *           'sensitive' => Logger::ERROR,
 *       )
 *   );
 *   $handler = new FingersCrossedHandler(new StreamHandler('php://stderr'), $activationStrategy);
 * </code>
 *
 * @author Mike Meessen <netmikey@gmail.com>
 *
 * @phpstan-import-type Record from \CardanoPress\Dependencies\Monolog\Logger
 * @phpstan-import-type Level from \CardanoPress\Dependencies\Monolog\Logger
 * @phpstan-import-type LevelName from \CardanoPress\Dependencies\Monolog\Logger
 */
class ChannelLevelActivationStrategy implements ActivationStrategyInterface
{
    /**
     * @var Level
     */
    private $defaultActionLevel;

    /**
     * @var array<string, Level>
     */
    private $channelToActionLevel;

    /**
     * @param int|string         $defaultActionLevel   The default action level to be used if the record's category doesn't match any
     * @param array<string, int> $channelToActionLevel An array that maps channel names to action levels.
     *
     * @phpstan-param array<string, Level>        $channelToActionLevel
     * @phpstan-param Level|LevelName|LogLevel::* $defaultActionLevel
     */
    public function __construct($defaultActionLevel, array $channelToActionLevel = [])
    {
        $this->defaultActionLevel = Logger::toMonologLevel($defaultActionLevel);
        $this->channelToActionLevel = array_map('CardanoPress\Dependencies\Monolog\Logger::toMonologLevel', $channelToActionLevel);
    }

    /**
     * @phpstan-param Record $record
     */
    public function isHandlerActivated(array $record): bool
    {
        if (isset($this->channelToActionLevel[$record['channel']])) {
            return $record['level'] >= $this->channelToActionLevel[$record['channel']];
        }

        return $record['level'] >= $this->defaultActionLevel;
    }
}
