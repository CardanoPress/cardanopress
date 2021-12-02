<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\NamiPress;

use Exception;
use ThemePlate\Core\Data;
use ThemePlate\Page;
use ThemePlate\Settings;

class Admin
{
    private Application $application;
    private Data $data;

    public const OPTION_KEY = 'namipress';

    public function __construct(Application $application)
    {
        $this->application = $application;
        $this->data = new Data();

        $this->setup();
    }

    public function setup(): void
    {
        $this->applicationPage();
        $this->blockfrostFields();
        $this->assetsPolicyFields();
        $this->memberPagesFields();
    }

    private function applicationPage(): void
    {
        try {
            new Page([
                'id' => self::OPTION_KEY,
                'title' => 'NamiPress',
            ]);
        } catch (Exception $exception) {
            error_log($exception->getMessage());
        }
    }

    private function blockfrostFields(): void
    {
        try {
            $settings = new Settings([
                'id' => 'blockfrost',
                'title' => __('Blockfrost Project ID', 'namipress'),
                'page' => self::OPTION_KEY,
                'context' => 'side',
                'fields' => [
                    'project_id' => [
                        'type' => 'group',
                        'default' => [
                            'mainnet' => $this->application->variable('BLOCKFROST_MAINNET_PROJECT_ID'),
                            'testnet' => $this->application->variable('BLOCKFROST_TESTNET_PROJECT_ID'),
                        ],
                        'fields' => [
                            'mainnet' => [
                                'title' => __('Mainnet', 'namipress'),
                                'type' => 'text',
                                'default' => $this->application->variable('BLOCKFROST_MAINNET_PROJECT_ID'),
                            ],
                            'testnet' => [
                                'title' => __('Testnet', 'namipress'),
                                'type' => 'text',
                                'default' => $this->application->variable('BLOCKFROST_TESTNET_PROJECT_ID'),
                            ],
                        ],
                    ],
                ],
            ]);

            $this->data->store($settings->get_config());
        } catch (Exception $exception) {
            error_log($exception->getMessage());
        }
    }

    private function assetsPolicyFields(): void
    {
        try {
            $settings = new Settings([
                'id' => 'policy',
                'title' => __('Policy IDs', 'namipress'),
                'page' => self::OPTION_KEY,
                'fields' => [
                    'ids' => [
                        'type' => 'group',
                        'default' => [
                            [
                                'label' => __('Asset Collection', 'namipress'),
                                'value' => $this->application->variable('ASSETS_POLICY_ID'),
                            ],
                        ],
                        'repeatable' => true,
                        'fields' => [
                            'label' => [
                                'type' => 'text',
                                'title' => __('Label', 'namipress'),
                            ],
                            'value' => [
                                'title' => __('Value', 'namipress'),
                                'type' => 'text',
                            ],
                        ],
                    ],
                ],
            ]);

            $this->data->store($settings->get_config());
        } catch (Exception $exception) {
            error_log($exception->getMessage());
        }
    }

    private function memberPagesFields(): void
    {
        try {
            $settings = new Settings([
                'id' => 'member',
                'title' => __('Member Pages', 'namipress'),
                'page' => self::OPTION_KEY,
                'context' => 'side',
                'fields' => [
                    'dashboard' => [
                        'type' => 'page',
                        'title' => __('Dashboard', 'namipress'),
                    ],
                    'collection' => [
                        'type' => 'page',
                        'title' => __('Collection', 'namipress'),
                    ],
                ],
            ]);

            $this->data->store($settings->get_config());
        } catch (Exception $exception) {
            error_log($exception->getMessage());
        }
    }

    public function getOption(string $key)
    {
        $options = get_option(self::OPTION_KEY, []);
        $value = $options[$key] ?? '';

        if ($value) {
            return $value;
        }

        return $this->data->get_default(self::OPTION_KEY, $key);
    }
}
