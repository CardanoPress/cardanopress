<?php

/**
 * @package ThemePlate
 */

namespace CardanoPress\Dependencies\CardanoPHP\Addresses;

use CardanoPress\Dependencies\CardanoPHP\HashType\Script;
use CardanoPress\Dependencies\CardanoPHP\Utilities\Credential;
use CardanoPress\Dependencies\CardanoPHP\Utilities\Network;

class EnterpriseAddress extends AbstractAddress
{
    protected Credential $paymentCredential;

    public const DATA = 'addr';

    public function __construct(Network $network, Credential $paymentCredential)
    {
        $this->paymentCredential = $paymentCredential;

        parent::__construct($network);
        $this->computeHex($paymentCredential->getHash());
    }

    protected function maskPayload(): int
    {
        $payload = 96;

        if ($this->paymentCredential->getType() instanceof Script) {
            $mask     = 1 << 4;
            $payload |= $mask;
        }

        return $payload;
    }
}
