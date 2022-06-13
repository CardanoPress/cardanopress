# ThemePlate Page

## Usage

```php
use ThemePlate\Page\MenuPage;
use ThemePlate\Page\SubMenuPage;

// One-liner
( new MenuPage( 'Theme Options' ) )->setup();
( new SubMenuPage( 'Plugin Settings', 'plugins.php' ) )->setup();
```

### Available config
```php
/** https://developer.wordpress.org/reference/functions/add_menu_page/#parameters */
$args = array(
	'menu_title' => 'Site Reports',
	'icon_url'   => 'dashicons-printer',
	'position'   => 2,
);

( new MenuPage( 'Available Reports', $args ) )->setup();


/** https://developer.wordpress.org/reference/functions/add_submenu_page/#parameters */
$args = array(
	// Used as the settings group name
	'menu_slug'  => 'site-reports/print-download',
	'capability' => 'moderate_comments',
);

( new SubMenuPage( 'Print or Download', 'site-reports', $args ) )->setup();
```
