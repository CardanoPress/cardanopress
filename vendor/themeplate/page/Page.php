<?php

/**
 * Setup options page
 *
 * @package ThemePlate
 * @since 0.1.0
 */

namespace ThemePlate;

use ThemePlate\Core\Helper\Box;
use ThemePlate\Core\Helper\Main;

class Page {

	private $config;


	public function __construct( $config ) {

		$expected = array(
			'id',
			'title',
		);

		if ( ! Main::is_complete( $config, $expected ) ) {
			throw new \Exception();
		}

		$defaults     = array(
			'capability' => 'manage_options',
			'parent'     => '',
			'menu'       => '',
			'icon'       => '',
			'position'   => null,
		);
		$this->config = Main::fool_proof( $defaults, $config );

		add_action( 'admin_init', array( $this, 'init' ) );
		add_action( 'admin_menu', array( $this, 'menu' ) );
		add_action( 'admin_notices', array( $this, 'notices' ) );
		add_action( 'admin_print_footer_scripts', array( $this, 'footer' ) );

	}


	public function init() {

		$option = $this->config['id'];

		register_setting( $option, $option, array( $this, 'save' ) );

	}


	public function menu() {

		$page = $this->config;

		if ( empty( $page['parent'] ) ) {
			$this->add_menu( $page );
		} else {
			if ( $page['parent'] === $page['id'] ) {
				$this->add_menu( $page );
				$page['menu'] = $page['title'];
			}

			$this->add_submenu( $page );
		}

	}


	private function add_menu( $page ) {

		add_menu_page(
			// Page Title
			$page['title'],
			// Menu Title
			$page['menu'] ?: $page['title'],
			// Capability
			$page['capability'],
			// Menu Slug
			$page['id'],
			// Content Function
			array( $this, 'create' ),
			// Icon URL
			$page['icon'],
			// Menu Order
			$page['position']
		);

	}


	private function add_submenu( $page ) {

		add_submenu_page(
			// Parent Slug
			$page['parent'],
			// Page Title
			$page['title'],
			// Menu Title
			$page['menu'] ?: $page['title'],
			// Capability
			$page['capability'],
			// Menu Slug
			$page['id'],
			// Content Function
			array( $this, 'create' )
		);

	}


	public function notices() {

		if ( ! isset( $_REQUEST['page'], $_REQUEST['settings-updated'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification
			return;
		}

		$page = $this->config['id'];

		if ( $_REQUEST['page'] === $page && 'true' === $_REQUEST['settings-updated'] ) { // phpcs:ignore WordPress.Security.NonceVerification
			echo '<div id="themeplate-message" class="updated"><p><strong>Settings updated.</strong></p></div>'; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		}

	}


	public function create() {

		$page = $this->config['id'];

		?>

		<div class="wrap">
			<h1><?php echo esc_html( get_admin_page_title() ); ?></h1>

			<form action="options.php" method="post">
				<div id="poststuff">
					<div id="post-body" class="metabox-holder columns-2">
						<?php if ( has_action( $page . '_content' ) || has_action( 'themeplate_settings_' . $page . '_after_title' ) ) : ?>
							<div id="post-body-content">
								<div id="after_title-sortables" class="meta-box-sortables">
									<?php do_action( 'themeplate_settings_' . $page . '_after_title' ); ?>
								</div>

								<?php do_action( $page . '_content' ); ?>
							</div>
						<?php endif; ?>

						<div id="postbox-container-1" class="postbox-container">
							<div id="submitdiv" class="postbox">
								<h2><?php echo esc_html( get_admin_page_title() ); ?></h2>

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
								<?php do_action( 'themeplate_settings_' . $page . '_side' ); ?>
							</div>
						</div>

						<div id="postbox-container-2" class="postbox-container">
							<div id="normal-sortables" class="meta-box-sortables">
								<?php do_action( 'themeplate_settings_' . $page . '_normal' ); ?>
							</div>

							<div id="advanced-sortables" class="meta-box-sortables">
								<?php do_action( 'themeplate_settings_' . $page . '_advanced' ); ?>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>

		<?php

	}


	public function save( $options ) {

		return Box::prepare_save( $options );

	}


	public function footer() {

		require_once ABSPATH . 'wp-includes/class-wp-editor.php';
		\_WP_Editors::wp_link_dialog();

	}

}
