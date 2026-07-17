<?php

/**
 * @package ThemePlate
 */

namespace Tests\Integration;

use PBWebDev\CardanoPress\Shortcode;
use Tests\LoadDependencies;
use WP_UnitTestCase;

class ShortcodeTest extends WP_UnitTestCase
{
    use LoadDependencies;

    public function setUp(): void
    {
        parent::setUp();
        $this->loadDependencies();
    }

    /** @return array<string, array{string, bool}> */
    public function for_user_profile_method(): array
    {
        return [
            'allowed: connectedNetwork' => ['connectedNetwork', true],
            'allowed: connectedWallet' => ['connectedWallet', true],
            'allowed: connectedStake' => ['connectedStake', true],
            'allowed: isConnected' => ['isConnected', true],
            'allowed: storedHandles' => ['storedHandles', true],
            'allowed: getFavoriteHandle' => ['getFavoriteHandle', true],
            'allowed: getTrimmedAddress' => ['getTrimmedAddress', true],
            'allowed: getAccountInfo' => ['getAccountInfo', true],
            'allowed: storedAssets' => ['storedAssets', true],
            'allowed: allTransactions' => ['allTransactions', true],
            'blocked: addRole' => ['addRole', false],
            'blocked: removeRole' => ['removeRole', false],
            'blocked: saveHandles' => ['saveHandles', false],
            'blocked: saveNetwork' => ['saveNetwork', false],
            'blocked: saveWallet' => ['saveWallet', false],
            'blocked: dismissNotice' => ['dismissNotice', false],
            'blocked: setUserAuth' => ['setUserAuth', false],
            'blocked: unsetUserAuth' => ['unsetUserAuth', false],
            'blocked: __construct' => ['__construct', false],
            'blocked: nonexistent' => ['nonexistent', false],
        ];
    }

    /** @dataProvider for_user_profile_method */
    public function test_user_profile_method_dispatch(string $method, bool $allowed): void
    {
        if ($allowed) {
            return;
        }

        $shortcode = (new \ReflectionClass(Shortcode::class))->newInstanceWithoutConstructor();
        $output = $shortcode->doUserProfile(['method' => $method]);

        $this->assertSame('', $output);
    }
}
