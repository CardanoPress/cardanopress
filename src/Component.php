<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Foundation\AbstractComponent;

class Component extends AbstractComponent
{
    protected Application $application;
    protected bool $echo;

    protected function initialize(): void
    {
        $this->application = Application::getInstance();
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
            'data-address' => $address ?? '',
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
}
