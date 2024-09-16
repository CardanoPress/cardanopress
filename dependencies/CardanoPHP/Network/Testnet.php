<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Dependencies\CardanoPHP\Network;

use CardanoPress\Dependencies\CardanoPHP\Utilities\Network;

class Testnet extends Network
{
    public function id(): int
    {
        return 0;
    }
}
