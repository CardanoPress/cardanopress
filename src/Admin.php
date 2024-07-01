<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Foundation\AbstractAdmin;

class Admin extends AbstractAdmin
{
    protected array $roles = array();

    public const OPTION_KEY = 'cardanopress';
    public const PAGES = [
        'dashboard',
        'collection',
        'payment',
        'delegation',
        'split',
    ];

    protected function initialize(): void
    {
        require_once plugin_dir_path(CARDANOPRESS_FILE) . 'class-tgm-plugin-activation.php';
    }

    public function setupHooks(): void
    {
        $roles = wp_roles()->role_names;

        unset($roles['administrator']);

        $this->roles = apply_filters('cardanopress_selectable_roles', $roles);

        $this->settingsPage('CardanoPress');

        add_action('tgmpa_register', [$this, 'recommendPlugins']);
        add_action('init', function () {
            $this->blockfrostFields();
            $this->googleRecaptchaFields();
            $this->poolDelegationFields();
            $this->paymentAddressFields();
            $this->assetsPolicyFields();
            $this->memberPagesFields();
            $this->userAccessFields();
            $this->assetAccessFields();
            $this->managedRoleFields();

            $keys = $this->getOption('blockfrost_project_id');

            Blockfrost::useProjectIds($keys['mainnet'] ?? '', $keys['testnet'] ?? '');
        });
    }

    private function blockfrostFields(): void
    {
        $this->optionFields(__('Blockfrost Project ID', 'cardanopress'), [
            'data_prefix' => 'blockfrost_',
            'description' => __('This is required to be able to connect to the Cardano blockchain', 'cardanopress'),
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
                            'description' => __('For networks preview and preprod', 'cardanopress'),
                            'type' => 'text',
                        ],
                    ],
                ],
            ],
        ]);
    }

    private function googleRecaptchaFields(): void
    {
        $this->optionFields(__('Recaptcha Keys', 'cardanopress'), [
            'data_prefix' => 'recaptcha_',
            'description' => __('Required for NFT payment page to reveal payment address.', 'cardanopress'),
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
        $this->optionFields(__('Delegation: Pool ID', 'cardanopress'), [
            'data_prefix' => 'delegation_',
            'description' => __(
                'Enter to Pool ID of the stake pool your delegation page will delegate to.',
                'cardanopress'
            ),
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
                            'description' => __('For networks preview and preprod', 'cardanopress'),
                            'type' => 'text',
                        ],
                    ],
                ],
            ],
        ]);
    }

    private function paymentAddressFields(): void
    {
        $this->optionFields(__('Payment Settings', 'cardanopress'), [
            'data_prefix' => 'payment_',
            'description' => __('Settings for the payment page.', 'cardanopress'),
            'fields' => [
                'amount' => [
                    'title' => __('Amount in ADA', 'cardanopress'),
                    'description' => __('Price for one NFT or item for sale.', 'cardanopress'),
                    'type' => 'number',
                    'default' => 1,
                    'options' => [
                        'min' => 0.1,
                        'step' => 0.1,
                    ],
                ],
                'address' => [
                    'title' => __('Wallet Address', 'cardanopress'),
                    'description' => __('Address to send funds to. E.g Minting address.', 'cardanopress'),
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
                            'description' => __('For networks preview and preprod', 'cardanopress'),
                            'type' => 'text',
                        ],
                    ],
                ],
                'split' => [
                    'title' => __('Stake pool fix fee in ADA for distribution to payment address.', 'cardanopress'),
                    'description' => __('Use for distribution of funds from a stake pool.', 'cardanopress'),
                    'type' => 'number',
                    'default' => 340,
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
        $this->optionFields(__('Policy IDs', 'cardanopress'), [
            'data_prefix' => 'policy_',
            'description' => __('Used for the NFT collection builder.', 'cardanopress'),
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
                            'description' => __('Description of policy ID.', 'cardanopress'),
                            'title' => __('Label', 'cardanopress'),
                        ],
                        'value' => [
                            'title' => __('Value', 'cardanopress'),
                            'description' => __('Policy ID value.', 'cardanopress'),
                            'type' => 'text',
                        ],
                    ],
                ],
            ],
        ]);
    }

    private function memberPagesFields(): void
    {
        $this->optionFields(__('Member Pages', 'cardanopress'), [
            'data_prefix' => 'member_',
            'context' => 'side',
            'fields' => array_combine(
                self::PAGES,
                array_map(function ($page) {
                    return [
                        'type' => 'page',
                        'title' => ucfirst($page),
                    ];
                }, self::PAGES),
            ),
        ]);
    }

    private function userAccessFields(): void
    {
        $this->optionFields(__('Delegation User Access', 'cardanopress'), [
            'data_prefix' => 'ua_',
            'description' => __('Assigning a user role based on stake pool delegation settings.', 'cardanopress'),
            'context' => 'side',
            'fields' => [
                'required_epoch' => [
                    'type' => 'number',
                    'title' => __('Required Epoch', 'cardanopress'),
                    'description' => __('Minimum number of epochs required delegation.', 'cardanopress'),
                    'default' => 1,
                    'options' => [
                        'min' => 1,
                        'step' => 1,
                    ],
                ],
                'required_amount' => [
                    'type' => 'number',
                    'title' => __('Required Amount', 'cardanopress'),
                    'description' => __('Minimum delegation amount in ADA required.', 'cardanopress'),
                    'default' => 1,
                    'options' => [
                        'min' => 0.1,
                        'step' => 0.1,
                    ],
                ],
                'additional_role' => [
                    'type' => 'select',
                    'title' => __('Additional Role', 'cardanopress'),
                    'description' => __('Role that is assigned for meeting required delegation.', 'cardanopress'),
                    'options' => $this->roles,
                ],
            ],
        ]);
    }

    private function assetAccessFields(): void
    {
        $this->optionFields(__('Asset Access', 'cardanopress'), [
            'data_prefix' => 'asset_',
            'description' => __('Assigning a user role based on NFTs in wallet.', 'cardanopress'),
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
                            'description' => __('Name of the token.', 'cardanopress'),
                            'title' => __('Asset Name', 'cardanopress'),
                        ],
                        'id' => [
                            'type' => 'text',
                            'description' => __('Policy ID of the token.', 'cardanopress'),
                            'title' => __('Policy ID', 'cardanopress'),
                        ],
                        'role' => [
                            'type' => 'select',
                            'description' => __('Role to assign a user based token access.', 'cardanopress'),
                            'title' => __('Additional Role', 'cardanopress'),
                            'options' => $this->roles,
                        ],
                    ],
                ],
            ],
        ]);
    }

    private function managedRoleFields(): void
    {
        $this->optionFields(__('Managed Roles', 'cardanopress'), [
            'data_prefix' => 'managed_',
            'description' => __('Select roles to be removed every wallet connect.', 'cardanopress'),
            'context' => 'side',
            'fields' => [
                'roles' => [
                    'type' => 'select',
                    'options' => $this->roles,
                    'multiple' => true,
                ],
            ],
        ]);
    }

    public function recommendPlugins()
    {
        $plugins = [
            [
                'name' => 'User Role Editor',
                'slug' => 'user-role-editor',
            ],
            [
                'name' => 'User Access Manager',
                'slug' => 'user-access-manager',
            ],
        ];

        $config = [
            'id' => 'cardanopress-tgmpa',
            'menu' => 'cardanopress-plugins',
            'parent_slug' => 'cardanopress',
            'dismissable' => true,
            'is_automatic' => true,
        ];

        tgmpa($plugins, $config);
    }
}
