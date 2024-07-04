<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use CardanoPress\Foundation\AbstractApplication;
use CardanoPress\Traits\Configurable;
use CardanoPress\Traits\Enqueueable;
use CardanoPress\Traits\Instantiable;
use CardanoPress\Traits\Templatable;
use PBWebDev\CardanoPress\Actions\AdminAction;
use PBWebDev\CardanoPress\Actions\CoreAction;
use PBWebDev\CardanoPress\Actions\WalletAction;

class Application extends AbstractApplication
{
    use Configurable;
    use Enqueueable;
    use Instantiable;
    use Templatable;

    protected function initialize(): void
    {
        $this->setInstance($this);

        $path = plugin_dir_path($this->getPluginFile());
        $this->admin = new Admin($this->logger('admin'));
        $this->manifest = new Manifest($path . 'assets/dist', $this->getData('Version'));
        $this->templates = new Templates($path . 'templates');
    }

    public function setupHooks(): void
    {
        $this->admin->setupHooks();
        $this->manifest->setupHooks();
        $this->templates->setupHooks();

        add_action('cardanopress_loaded', [$this, 'init']);
    }

    public function init(): void
    {
        load_plugin_textdomain($this->getData('TextDomain'));

        (new AdminAction())->setupHooks();
        (new CoreAction())->setupHooks();
        (new WalletAction())->setupHooks();
        (new Shortcode())->setupHooks();
    }

    public function isReady(): bool
    {
        $projectIds = $this->option('blockfrost_project_id');
        $projectIds = array_filter((array)$projectIds);

        return ! empty($projectIds);
    }

    public function userProfile(): Profile
    {
        static $user;

        if (null === $user) {
            $user = new Profile(wp_get_current_user());
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

    public function getNetwork(): string
    {
        $network = $this->userProfile()->connectedNetwork();

        if (! $network || ! Blockfrost::isReady($network)) {
            $network = 'mainnet';
        }

        return $network;
    }

    public function getPages(): array
    {
        $list = [];

        foreach (Admin::PAGES as $page) {
            $pageId = $this->option('member_' . $page);

            if (! $pageId) {
                continue;
            }

            $list[get_the_title($pageId)] = get_permalink($pageId);
        }

        $list['Disconnect'] = wp_logout_url(get_permalink());

        return $list;
    }

    public function isUserDelegated(): bool
    {
        $account = $this->userProfile()->getAccountInfo();

        if (! ($account['active'] ?? false)) {
            return false;
        }

        $delegation = $this->delegationPool();

        if ('' === ($delegation['pool_id'] ?? '')) {
            return false;
        }

        return $account['pool_id'] === $delegation['pool_id'];
    }

    public function getWallets(): array
    {
        return apply_filters('cardanopress_supported_wallets', [
            'Nami',
            'Eternl',
            'Yoroi',
            'Flint',
            'Typhon',
            'GeroWallet',
            'NuFi',
            'Lace',
            'Begin',
        ]);
    }
}
