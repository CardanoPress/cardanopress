<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

namespace PBWebDev\CardanoPress;

class Installer
{
    private static Installer $instance;
    private Application $application;
    private Templates $templates;

    public static function instance(): Installer
    {
        if (! isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct()
    {
        $load_path = plugin_dir_path(CARDANOPRESS_FILE);
        $this->application = Application::instance();
        $this->templates = new Templates($load_path . 'templates');

        add_action('plugins_loaded', [$this, 'loaded'], -1);
        add_action('admin_notices', [$this, 'noticeApplicationNotReady']);
    }

    public function log(string $message): void
    {
        $this->application::logger('installer')->info($message);
    }

    public function activate(): void
    {
        if ('yes' === get_transient('cardanopress_activating')) {
            $this->log('Is already activating');

            return;
        }

        $this->log('Activating version ' . $this->application::VERSION);
        set_transient('cardanopress_activating', 'yes', MINUTE_IN_SECONDS * 2);

        if (empty(get_option('cardanopress_version'))) {
            $this->log('Creating initial pages');
            $this->templates->createPages();
        }

        update_option('cardanopress_version', $this->application::VERSION);
        delete_transient('cardanopress_activating');
    }

    public function loaded(): void
    {
        do_action('cardanopress_loaded');
    }

    public function getSettingsLink(string $text, string $target = '_self'): string
    {
        return sprintf(
            '<a href="%1$s" id="settings-%2$s" aria-label="%3$s" target="%4$s">%5$s</a>',
            admin_url('admin.php?page=' . Admin::OPTION_KEY),
            Admin::OPTION_KEY,
            __('Settings CardanoPress', 'cardanopress'),
            $target,
            $text,
        );
    }

    public function noticeApplicationNotReady(): void
    {
        if ($this->application->isReady()) {
            return;
        }

        ob_start();

        ?>
        <div class="notice notice-info">
            <p>
                <strong>CardanoPress</strong> requires Blockfrost API Token.
                <?php echo $this->getSettingsLink(__('Please set here', 'cardanopress'), '_blank'); ?>
            </p>
        </div>
        <?php

        echo ob_get_clean();
    }
}
