<?php

/**
 * Setup options page
 *
 * @package CardanoPress\Dependencies\ThemePlate
 * @since 0.1.0
 */

namespace CardanoPress\Dependencies\ThemePlate\Page;

use CardanoPress\Dependencies\ThemePlate\Page\Interfaces\PageInterface;

abstract class BasePage implements CommonInterface, PageInterface {

	protected array $defaults = array(
		'capability' => 'manage_options',
		'menu_title' => '',
		'menu_slug'  => '',
		'position'   => null,
	);
	protected array $config;
	protected string $title;
	protected string $hookname = '';


	protected function initialize( string $title, array $config ) {

		$this->title = $title;

		if ( empty( $config['menu_title'] ) ) {
			$config['menu_title'] = $this->title;
		}

		if ( empty( $config['menu_slug'] ) ) {
			$config['menu_slug'] = $config['menu_title'];
		}

		$config['menu_slug'] = sanitize_title( $config['menu_slug'] );

		$this->config = array_merge( $this->defaults, $config );

	}


	public function capability( string $capability ): self {

		$this->config['capability'] = $capability;

		return $this;

	}


	public function position( int $position ): self {

		$this->config['position'] = $position;

		return $this;

	}


	public function setup(): void {

		add_filter( 'allowed_options', array( $this, 'maybe_init_option' ) );

		if ( did_action( 'admin_menu' ) ) {
			$this->menu();// @codeCoverageIgnore
		} else {
			add_action( 'admin_menu', array( $this, 'menu' ) );
		}

	}


	public function maybe_init_option( array $options ): array {

		if ( ! array_key_exists( $this->config['menu_slug'], $options ) ) {
			$options[ $this->config['menu_slug'] ] = array();
		}

		return $options;

	}


	public function load(): void {

		$page = $this->config['menu_slug'];

		add_action( 'admin_notices', array( $this, 'notices' ) );
		do_action( 'themeplate_page_' . $page . '_load', $this->get_hookname(), $this->config );

	}


	public function notices(): void {

		if ( ! isset( $_REQUEST['page'], $_REQUEST['settings-updated'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
			return;
		}

		if ( $_REQUEST['page'] === $this->config['menu_slug'] && 'true' === $_REQUEST['settings-updated'] ) { // phpcs:ignore WordPress.Security.NonceVerification
			echo '<div id="themeplate-message" class="updated"><p><strong>Settings updated.</strong></p></div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}

	}


	public function create(): void {

		$page = $this->config['menu_slug'];

		?>

		<div class="wrap">
			<h1><?php echo esc_html( $this->title ); ?></h1>

			<form action="options.php" method="post">
				<div id="poststuff">
					<div id="post-body" class="metabox-holder columns-2">
						<?php if ( has_action( $page . '_content' ) || has_action( 'themeplate_settings_' . $page . '_after_title' ) ) : ?>
							<div id="post-body-content">
								<div id="after_title-sortables" class="meta-box-sortables">
									<?php do_action( 'themeplate_settings_' . $page . '_after_title', $page, $this->config ); ?>
								</div>

								<?php do_action( 'themeplate_page_' . $page . '_content', $this->get_hookname(), $this->config ); ?>
							</div>
						<?php endif; ?>

						<div id="postbox-container-1" class="postbox-container">
							<div id="submitdiv" class="postbox">
								<h2><?php echo esc_html( $this->title ); ?></h2>

								<div id="major-publishing-actions">
									<?php settings_fields( $page ); ?>

									<?php if ( current_user_can( apply_filters( 'option_page_capability_' . $page, 'manage_options' ) ) ) : ?>
										<input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes">
									<?php else : ?>
										<p><strong>Need a higher level access to save changes.</strong></p>
									<?php endif; ?>
								</div>
							</div>

							<div id="side-sortables" class="meta-box-sortables">
								<?php do_action( 'themeplate_settings_' . $page . '_side', $page, $this->config ); ?>
							</div>
						</div>

						<div id="postbox-container-2" class="postbox-container">
							<div id="normal-sortables" class="meta-box-sortables">
								<?php do_action( 'themeplate_settings_' . $page . '_normal', $page, $this->config ); ?>
							</div>

							<div id="advanced-sortables" class="meta-box-sortables">
								<?php do_action( 'themeplate_settings_' . $page . '_advanced', $page, $this->config ); ?>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>

		<?php

	}


	public function get_hookname(): string {

		return $this->hookname;

	}

}
