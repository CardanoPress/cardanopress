<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use Monolog\Logger as MonoLogger;
use PBWebDev\CardanoPress\Actions\CoreAction;
use PBWebDev\CardanoPress\Actions\WalletAction;
use ThemePlate\Enqueue;
use ThemePlate\Logger;

class Application
{
    private static Application $instance;
    private static Logger $logger;
    private Admin $admin;
    private Templates $templates;
    public const VERSION = '0.30.0';

    public static function instance(): Application
    {
        if (! isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct()
    {
        $load_path = plugin_dir_path(CARDANOPRESS_FILE);

        $this->templates = new Templates($load_path . 'templates');
        self::$logger = new Logger('cardanopress-logs');

        new Manifest($load_path . 'assets/dist', self::VERSION);
        new CoreAction();
        new WalletAction();
        new Shortcode();

        $this->admin = new Admin();

        add_action('init', [Enqueue::class, 'init']);
    }

    public static function logger(string $channel): MonoLogger
    {
        return self::$logger->channel($channel);
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

    public function userProfile(): Profile
    {
        static $user;

        if (null === $user) {
            $user =  new Profile(wp_get_current_user());
        }

        return $user;
    }

    public function delegationPool(): array
    {
        static $data;

        if (null !== $data) {
            return $data;
        }

        $poolData = $this->option('delegation_pool_data');
        $data = $poolData[$this->getNetwork()] ?? [];

        return $data;
    }

    public function paymentAddress(): string
    {
        static $data;

        if (null !== $data) {
            return $data;
        }

        $paymentAddresses = $this->option('payment_address');
        $data = $paymentAddresses[$this->getNetwork()] ?? '';

        return $data;
    }

    public function isReady(): bool
    {
        $projectIds = $this->option('blockfrost_project_id');
        $projectIds = array_filter($projectIds);

        return ! empty($projectIds);
    }

    public function getNetwork(): string
    {
        $network = $this->userProfile()->connectedNetwork();

        if (! $network || ! Blockfrost::isReady($network)) {
            $network = 'mainnet';
        }

        return $network;
    }
}
