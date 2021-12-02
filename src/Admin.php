<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use Env\Env;
use Exception;
use ThemePlate\Core\Data;
use ThemePlate\Page;
use ThemePlate\Settings;

class Admin
{
    protected Data $data;

    public const OPTION_KEY = 'cardanopress';

    public function __construct()
    {
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
                'title' => 'CardanoPress',
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
                'title' => __('Blockfrost Project ID', 'cardanopress'),
                'page' => self::OPTION_KEY,
                'context' => 'side',
                'fields' => [
                    'project_id' => [
                        'type' => 'group',
                        'default' => [
                            'mainnet' => $this->getVariable('BLOCKFROST_MAINNET_PROJECT_ID'),
                            'testnet' => $this->getVariable('BLOCKFROST_TESTNET_PROJECT_ID'),
                        ],
                        'fields' => [
                            'mainnet' => [
                                'title' => __('Mainnet', 'cardanopress'),
                                'type' => 'text',
                                'default' => $this->getVariable('BLOCKFROST_MAINNET_PROJECT_ID'),
                            ],
                            'testnet' => [
                                'title' => __('Testnet', 'cardanopress'),
                                'type' => 'text',
                                'default' => $this->getVariable('BLOCKFROST_TESTNET_PROJECT_ID'),
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
                'title' => __('Policy IDs', 'cardanopress'),
                'page' => self::OPTION_KEY,
                'fields' => [
                    'ids' => [
                        'type' => 'group',
                        'default' => [
                            [
                                'label' => __('Asset Collection', 'cardanopress'),
                                'value' => $this->getVariable('ASSETS_POLICY_ID'),
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
                'title' => __('Member Pages', 'cardanopress'),
                'page' => self::OPTION_KEY,
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
                ],
            ]);

            $this->data->store($settings->get_config());
        } catch (Exception $exception) {
            error_log($exception->getMessage());
        }
    }

    public function getVariable(string $name)
    {
        $value = $_ENV[$name] ?? null;

        if (null === $value) {
            return null;
        }

        return Env::convert($value);
    }

    public function getOption(string $key)
    {
        $options = get_option(static::OPTION_KEY, []);
        $value = $options[$key] ?? '';

        if ($value) {
            return $value;
        }

        return $this->data->get_default(static::OPTION_KEY, $key);
    }
}
