<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Dependencies\CardanoPHP\Network;

use CardanoPress\Dependencies\CardanoPHP\Utilities\Network;

class Mainnet extends Network
{
    public function id(): int
    {
        return 1;
    }
}
