<?php declare(strict_types=1);

/*
 * This file is part of the CardanoPress\Dependencies\Monolog package.
 *
 * (c) Jordi Boggiano <j.boggiano@seld.be>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace CardanoPress\Dependencies\Monolog\Processor;

/**
 * An optional interface to allow labelling CardanoPress\Dependencies\Monolog processors.
 *
 * @author Nicolas Grekas <p@tchwork.com>
 *
 * @phpstan-import-type Record from \CardanoPress\Dependencies\Monolog\Logger
 */
interface ProcessorInterface
{
    /**
     * @return array The processed record
     *
     * @phpstan-param  Record $record
     * @phpstan-return Record
     */
    public function __invoke(array $record);
}
