<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress\Actions;

class Verification
{
    private array $data;
    private string $message;

    public function __construct(array $data, string $message)
    {
        $this->data = $data;
        $this->message = $message;
    }


    public function basic(): bool
    {
        if (count($this->data) !== 2) {
            return false;
        }

        $hexMessage = bin2hex($this->message);
        $index = strpos($this->data[0], $hexMessage);

        if (false === $index) {
            return false;
        }

        $last = substr($this->data[0], $index);

        if (strlen($last) !== strlen($hexMessage) + 132) {
            return false;
        }

        return true;
    }

    public function full(string $address): bool
    {
        if (!$this->basic()) {
            return false;
        }

        $system = php_uname('s');
        $binary = sprintf(
            './verifier_%2$s_%3$s%4$s',
            __DIR__,
            $system,
            php_uname('m'),
            'Windows' === $system ? '.exe' : ''
        );
        $output = null;
        $retval = null;
        $command = [
            $binary,
            $this->data[0],
            $this->data[1],
            sprintf('"%s"', $this->message),
            $address,
        ];

        chdir(realpath(__DIR__ . '/../../bin'));
        chmod($command[0], 0777);
        exec(join(' ', $command), $output, $retval);

        return $retval === 0;
    }
}
