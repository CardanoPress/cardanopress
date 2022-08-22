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
use PBWebDev\CardanoPress\Actions\CoreAction;
use PBWebDev\CardanoPress\Actions\WalletAction;

class Application extends AbstractApplication
{
    use Configurable;
    use Enqueueable;
    use Instantiable;
    use Templatable;

    /**
     * Initializes the plugin by setting the instance, creating a new
     * admin, manifest, and templates object.
     */
    protected function initialize(): void
    {
        $this->setInstance($this);

        $path = plugin_dir_path($this->getPluginFile());
        $this->admin = new Admin($this->logger('admin'));
        $this->manifest = new Manifest($path . 'assets/dist', $this->getData('Version'));
        $this->templates = new Templates($path . 'templates');
    }

    /**
     * Sets up hooks for the admin, manifest, and templates classes.
     */
    public function setupHooks(): void
    {
        $this->admin->setupHooks();
        $this->manifest->setupHooks();
        $this->templates->setupHooks();

        add_action('cardanopress_loaded', [$this, 'init']);
    }

    /**
     * Creates a new instance of the class CoreAction, WalletAction, and
     * Shortcode, and then calls the setupHooks() method on each of them
     */
    public function init(): void
    {
        (new CoreAction())->setupHooks();
        (new WalletAction())->setupHooks();
        (new Shortcode())->setupHooks();
    }

    /**
     * Return a boolean value of the application readiness status
     *
     * @return bool The application readiness status.
     */
    public function isReady(): bool
    {
        $projectIds = $this->option('blockfrost_project_id');
        $projectIds = array_filter($projectIds);

        return ! empty($projectIds);
    }

    /**
     * Return an instance of the Profile class with the current user's data
     *
     * @return Profile An instance of the Profile class.
     */
    public function userProfile(): Profile
    {
        static $user;

        if (null === $user) {
            $user = new Profile(wp_get_current_user());
        }

        return $user;
    }

    /**
     * Return an array of data from the `delegation_pool_data` option
     *
     * @return array The data from the delegation pool.
     */
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

    /**
     * Return the payment address for the network that the user is currently on
     *
     * @return string The payment address for the network.
     */
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

    /**
     * > If the user has a connected network, return it. Otherwise, return
     * 'mainnet'
     *
     * @return string The network that the user is connected to.
     */
    public function getNetwork(): string
    {
        $network = $this->userProfile()->connectedNetwork();

        if (! $network || ! Blockfrost::isReady($network)) {
            $network = 'mainnet';
        }

        return $network;
    }

    /**
     * Return an array of pages that are available to the user
     *
     * @return array An array of pages.
     */
    public function getPages(): array
    {
        $list = [];

        foreach (Admin::PAGES as $page) {
            $pageId = cardanoPress()->option('member_' . $page);

            if (! $pageId) {
                continue;
            }

            $list[get_the_title($pageId)] = get_permalink($pageId);
        }

        $list['Disconnect'] = wp_logout_url(get_permalink());

        return $list;
    }
}
