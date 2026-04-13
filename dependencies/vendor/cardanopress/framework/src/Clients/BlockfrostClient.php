<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace CardanoPress\Clients;

use CardanoPress\Dependencies\GuzzleHttp\HandlerStack;
use CardanoPress\Dependencies\GuzzleHttp\Middleware;
use CardanoPress\Dependencies\Psr\Http\Message\RequestInterface;

class BlockfrostClient extends BaseClient
{
    public const ENDPOINT = [
        'mainnet' => 'https://cardano-mainnet.blockfrost.io/api/v0/',
        'testnet' => 'https://cardano-testnet.blockfrost.io/api/v0/',
        'preprod' => 'https://cardano-preprod.blockfrost.io/api/v0/',
        'preview' => 'https://cardano-preview.blockfrost.io/api/v0/',
    ];

    /**
     * Create a new BlockfrostClient instance
     */
    public function __construct(string $project_id, ?HandlerStack $handler = null)
    {
        $network = substr($project_id, 0, 7);

        if (! array_key_exists($network, self::ENDPOINT)) {
            $network = 'mainnet';
        }

        $stacker = static function (HandlerStack $stack) use ($handler, $project_id) {
            if (null !== $handler) {
                // @phpstan-ignore-next-line
                $stack->setHandler($handler);
            }

            $stack->push(
                Middleware::mapRequest(
                    static fn (RequestInterface $request) => $request->withHeader('project_id', $project_id)
                ),
                'project_id'
            );
        };

        parent::__construct(self::ENDPOINT[$network], $stacker);
    }
}
