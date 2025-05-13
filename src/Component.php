<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

class Component
{
    protected Application $application;
    protected bool $echo;

    public function __construct(bool $echo)
    {
        $this->application = Application::getInstance();
        $this->echo = $echo;
    }

    public function cardanoPress(): string
    {
        $handle = '';

        if (is_user_logged_in()) {
            $handle = $this->application->userProfile()->getFavoriteHandle();
        }

        $wallets = (string) json_encode($this->application->getWallets());

        return $this->attributes([
            'x-data' => 'cardanoPress',
            'x-on:keydown.escape' => 'showModal = false',
            'data-handle' => $handle,
            'data-wallets' => $wallets,
        ]);
    }

    public function paymentForm(?float $amount = null, ?string $address = null): string
    {
        $this->application->enqueue('script', 'cardanopress-payment');

        if (null === $amount) {
            $amount = (float) $this->application->option('payment_amount');
        }

        $recaptchaKeys = $this->application->option('recaptcha_key');
        $recaptchaKey  = (string) ($recaptchaKeys['site'] ?? null);

        if (! empty($recaptchaKey)) {
            $this->application->enqueue('script', 'cardanopress-recaptcha');
        }

        return $this->attributes([
            'x-data' => 'paymentForm',
            'data-amount' => (string) $amount,
            'data-address' => $address,
            'data-recaptcha' => $recaptchaKey,
        ]);
    }

    public function poolDelegation(): string
    {
        $this->application->enqueue('script', 'cardanopress-delegation');

        return $this->attributes([
            'x-data' => 'poolDelegation',
        ]);
    }

    public function splitForm(): string
    {
        $this->application->enqueue('script', 'cardanopress-split');

        return $this->attributes([
            'x-data' => 'splitForm',
        ]);
    }

    protected function attributes(array $data): string
    {
        $attr = [];

        foreach (array_filter($data) as $key => $value) {
            $attr[] = sprintf('%s="%s"', $key, esc_attr($value));
        }

        $attr = implode(' ', $attr);

        return $this->printOrReturn($attr);
    }

    protected function printOrReturn(string $value): string
    {
        if (! $this->echo) {
            return $value;
        }

        echo $value;

        return '';
    }
}
