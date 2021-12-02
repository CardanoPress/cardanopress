<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\NamiPress;

use Dotenv\Dotenv;
use PBWebDev\NamiPress\Actions\CoreAction;
use PBWebDev\NamiPress\Actions\WalletAction;
use ThemePlate\Enqueue;

class Application
{
    private static Application $instance;
    private Admin $admin;
    private Templates $templates;

    public static function instance(): Application
    {
        if (! isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct()
    {
        $load_path = plugin_dir_path(NAMIPRESS_FILE);

        $this->setupDotEnv($load_path);

        $this->templates = new Templates($load_path . 'templates');

        new Manifest($load_path . 'assets');
        new CoreAction();
        new WalletAction();

        $this->admin = new Admin();

        Enqueue::init();
    }

    /**
     * Use Dotenv to set required environment variables and load .env file in root
     */
    private function setupDotEnv($path): void
    {
        if (file_exists($path . '/.env')) {
            $dotenv = Dotenv::createImmutable($path);
            $dotenv->load();
            $dotenv->required([
                'BLOCKFROST_MAINNET_PROJECT_ID',
                'BLOCKFROST_TESTNET_PROJECT_ID',
                'ASSETS_POLICY_ID',
            ]);
        }
    }

    public function variable(string $name)
    {
        return $this->admin->getVariable($name);
    }

    public function option(string $key)
    {
        return $this->admin->getOption($key);
    }

    public function template(string $name, array $variables = []): void
    {
        $name .= '.php';
        $file = locate_template($this->templates->getPath() . $name);

        if (! $file) {
            $file = $this->templates->getPath(true) . $name;
        }

        if (file_exists($file)) {
            extract($variables, EXTR_OVERWRITE);
            include $file;
        }
    }
}
