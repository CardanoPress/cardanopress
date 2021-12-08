<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

use PBWebDev\CardanoPress\Actions\CoreAction;
use PBWebDev\CardanoPress\Actions\WalletAction;
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
        $load_path = plugin_dir_path(CARDANOPRESS_FILE);

        $this->templates = new Templates($load_path . 'templates');

        new Manifest($load_path . 'assets');
        new CoreAction();
        new WalletAction();

        $this->admin = new Admin();

        add_action('plugins_loaded', [Enqueue::class, 'init']);
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
            $user = wp_get_current_user();
        }

        return new Profile($user);
    }

    public function isReady(): bool
    {
        $projectIds = $this->option('blockfrost_project_id');
        $projectIds = array_filter($projectIds);

        return ! empty($projectIds);
    }

    public function isTemplatePage($post = null): bool
    {
        $template = get_page_template_slug($post);

        return $this->templates->isCustomPage($template);
    }
}
