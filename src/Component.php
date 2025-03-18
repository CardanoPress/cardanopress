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

        $wallets = json_encode($this->application->getWallets());

        return $this->attributes([
            'x-data' => 'cardanoPress',
            'x-on:keydown.escape' => 'showModal = false',
            'data-handle' => $handle,
            'data-wallets' => $wallets,
        ]);
    }

    public function paymentForm(float $amount = null, string $address = null): string
    {
        if (null === $amount) {
            $amount = $this->application->option('payment_amount');
        }

        $recaptchaKeys = $this->application->option('recaptcha_key');
        $recaptchaKey  = $recaptchaKeys['site'] ?? '';

        if (! empty($recaptchaKey)) {
            $this->application->enqueue('script', 'cardanopress-recaptcha');
        }

        return $this->attributes([
            'x-data' => 'paymentForm',
            'data-amount' => $amount,
            'data-address' => $address,
            'data-recaptcha' => $recaptchaKey,
        ]);
    }

    public function poolDelegation(): string
    {
        return $this->attributes([
            'x-data' => 'poolDelegation',
        ]);
    }

    public function splitForm(int $fee = null): string
    {
        if (null === $fee) {
            $fee = $this->application->option('payment_split');
        }

        return $this->attributes([
            'x-data' => 'splitForm',
            'data-fee' => $fee,
        ]);
    }

    protected function attributes(array $data): string
    {
        $attr = [];
        $data = array_filter($data, function ($value) {
            return null !== $value;
        });

        foreach ($data as $key => $value) {
            $attr[] = sprintf('%s="%s"', $key, esc_attr($value));
        }

        $attr = implode(' ', $attr);

        if (! $this->echo) {
            return $attr;
        }

        echo $attr;

        return '';
    }
}
