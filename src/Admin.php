<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Foundation\AbstractAdmin;

class Admin extends AbstractAdmin
{
    public const OPTION_KEY = 'cardanopress';

    protected function initialize(): void
    {
    }

    public function setupHooks(): void
    {
        $this->settingsPage('CardanoPress');

        add_action('init', function () {
            $this->blockfrostFields();
            $this->googleRecaptchaFields();
            $this->poolDelegationFields();
            $this->paymentAddressFields();
            $this->assetsPolicyFields();
            $this->memberPagesFields();
            $this->userAccessFields();
            $this->assetAccessFields();
        });
        add_filter('pre_update_option_' . self::OPTION_KEY, [$this, 'getPoolDetails'], 10, 2);
    }

    private function blockfrostFields(): void
    {
        $this->optionFields([
            'id' => 'blockfrost',
            'title' => __('Blockfrost Project ID', 'cardanopress'),
            'context' => 'side',
            'fields' => [
                'project_id' => [
                    'type' => 'group',
                    'default' => [
                        'mainnet' => '',
                        'testnet' => '',
                    ],
                    'fields' => [
                        'mainnet' => [
                            'title' => __('Mainnet', 'cardanopress'),
                            'type' => 'text',
                            'required' => true,
                        ],
                        'testnet' => [
                            'title' => __('Testnet', 'cardanopress'),
                            'type' => 'text',
                        ],
                    ],
                ],
            ],
        ]);
    }

    private function googleRecaptchaFields(): void
    {
        $this->optionFields([
            'id' => 'recaptcha',
            'title' => __('Recaptcha Keys', 'cardanopress'),
            'context' => 'side',
            'fields' => [
                'key' => [
                    'type' => 'group',
                    'default' => [
                        'site' => '',
                        'secret' => '',
                    ],
                    'fields' => [
                        'site' => [
                            'title' => __('Site', 'cardanopress'),
                            'type' => 'text',
                        ],
                        'secret' => [
                            'title' => __('Secret', 'cardanopress'),
                            'type' => 'text',
                        ],
                    ],
                ],
            ],
        ]);
    }

    private function poolDelegationFields(): void
    {
        $this->optionFields([
            'id' => 'delegation',
            'title' => __('Delegation: Pool ID', 'cardanopress'),
            'fields' => [
                'pool_id' => [
                    'type' => 'group',
                    'default' => [
                        'mainnet' => '',
                        'testnet' => '',
                    ],
                    'fields' => [
                        'mainnet' => [
                            'title' => __('Mainnet', 'cardanopress'),
                            'type' => 'text',
                        ],
                        'testnet' => [
                            'title' => __('Testnet', 'cardanopress'),
                            'type' => 'text',
                        ],
                    ],
                ],
            ],
        ]);
    }

    private function paymentAddressFields(): void
    {
        $this->optionFields([
            'id' => 'payment',
            'title' => __('Payment Settings', 'cardanopress'),
            'fields' => [
                'amount' => [
                    'title' => __('Amount in ADA', 'cardanopress'),
                    'type' => 'number',
                    'default' => 1,
                    'options' => [
                        'min' => 0.1,
                        'step' => 0.1,
                    ],
                ],
                'address' => [
                    'title' => __('Wallet Address', 'cardanopress'),
                    'type' => 'group',
                    'default' => [
                        'mainnet' => '',
                        'testnet' => '',
                    ],
                    'fields' => [
                        'mainnet' => [
                            'title' => __('Mainnet', 'cardanopress'),
                            'type' => 'text',
                        ],
                        'testnet' => [
                            'title' => __('Testnet', 'cardanopress'),
                            'type' => 'text',
                        ],
                    ],
                ],
                'split' => [
                    'title' => __('Split Fee in ADA', 'cardanopress'),
                    'type' => 'number',
                    'default' => 1,
                    'options' => [
                        'min' => 0.1,
                        'step' => 0.1,
                    ],
                ],
            ],
        ]);
    }

    private function assetsPolicyFields(): void
    {
        $this->optionFields([
            'id' => 'policy',
            'title' => __('Policy IDs', 'cardanopress'),
            'fields' => [
                'ids' => [
                    'type' => 'group',
                    'default' => [
                        [
                            'label' => '',
                            'value' => '',
                        ],
                    ],
                    'repeatable' => true,
                    'fields' => [
                        'label' => [
                            'type' => 'text',
                            'title' => __('Label', 'cardanopress'),
                        ],
                        'value' => [
                            'title' => __('Value', 'cardanopress'),
                            'type' => 'text',
                        ],
                    ],
                ],
            ],
        ]);
    }

    private function memberPagesFields(): void
    {
        $this->optionFields([
            'id' => 'member',
            'title' => __('Member Pages', 'cardanopress'),
            'context' => 'side',
            'fields' => [
                'dashboard' => [
                    'type' => 'page',
                    'title' => __('Dashboard', 'cardanopress'),
                ],
                'collection' => [
                    'type' => 'page',
                    'title' => __('Collection', 'cardanopress'),
                ],
                'payment' => [
                    'type' => 'page',
                    'title' => __('Payment', 'cardanopress'),
                ],
                'delegation' => [
                    'type' => 'page',
                    'title' => __('Delegation', 'cardanopress'),
                ],
                'split' => [
                    'type' => 'page',
                    'title' => __('Split', 'cardanopress'),
                ],
            ],
        ]);
    }

    private function userAccessFields(): void
    {
        $this->optionFields([
            'id' => 'ua',
            'title' => __('User Access', 'cardanopress'),
            'context' => 'side',
            'fields' => [
                'required_epoch' => [
                    'type' => 'number',
                    'title' => __('Required Epoch', 'cardanopress'),
                    'default' => 1,
                    'options' => [
                        'min' => 1,
                        'step' => 1,
                    ],
                ],
                'additional_role' => [
                    'type' => 'select',
                    'title' => __('Additional Role', 'cardanopress'),
                    'options' => wp_roles()->role_names,
                ],
            ],
        ]);
    }

    private function assetAccessFields(): void
    {
        $this->optionFields([
            'id' => 'asset',
            'title' => __('Asset Access', 'cardanopress'),
            'fields' => [
                'access' => [
                    'type' => 'group',
                    'default' => [
                        [
                            'name' => '',
                            'id' => '',
                            'role' => '',
                        ],
                    ],
                    'repeatable' => true,
                    'fields' => [
                        'name' => [
                            'type' => 'text',
                            'title' => __('Asset Name', 'cardanopress'),
                        ],
                        'id' => [
                            'type' => 'text',
                            'title' => __('Policy ID', 'cardanopress'),
                        ],
                        'role' => [
                            'type' => 'select',
                            'title' => __('Additional Role', 'cardanopress'),
                            'options' => wp_roles()->role_names,
                        ],
                    ],
                ],
            ],
        ]);
    }

    public function getPoolDetails($newValue, $oldValue)
    {
        if (
            ! empty($oldValue['delegation_pool_data']) && (
                $newValue['delegation_pool_id'] === $oldValue['delegation_pool_id'] ||
                empty(array_filter($newValue['blockfrost_project_id']))
            )
        ) {
            return $newValue;
        }

        $newValue['delegation_pool_data'] = $oldValue['delegation_pool_data'] ?? [];

        foreach ($newValue['delegation_pool_id'] as $network => $poolId) {
            if (! Blockfrost::isReady($network)) {
                continue;
            }

            $blockfrost = new Blockfrost($network);
            $newValue['delegation_pool_data'][$network] = $blockfrost->getPoolDetails($poolId);
        }

        return $newValue;
    }
}
