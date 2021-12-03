# ThemePlate Enqueue

## Usage

```php

use ThemePlate\Enqueue;

function theme_scripts() {
	wp_enqueue_script( 'main-script', 'PATH_TO_MAIN_JS' );
	wp_script_add_data( 'main-script', 'async', true );
	wp_enqueue_script( 'extra-script', 'PATH_TO_EXTRA_JS' );
	wp_script_add_data( 'extra-script', 'defer', true );

	wp_enqueue_script( 'jquery-slim', 'https://code.jquery.com/jquery-3.5.1.slim.min.js', array(), '3.5.1', true );
	wp_script_add_data( 'jquery-slim', 'integrity', 'sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj' );
	wp_script_add_data( 'jquery-slim', 'crossorigin', 'anonymous' );
	wp_enqueue_style( 'bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css', array(), '4.5.2' );
	wp_style_add_data( 'bootstrap', 'integrity', 'sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z' );
	wp_style_add_data( 'bootstrap', 'crossorigin', 'anonymous' );

	wp_register_style( 'slick-carousel', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css', array(), '1.9.0', 'all' );
	wp_register_script( 'slick-carousel', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.js', array(), '1.9.0', true );
}
add_action( 'wp_enqueue_scripts', 'theme_scripts' );

Enqueue::init();

Enqueue::asset( 'script', 'slick-carousel' );
Enqueue::asset( 'style', 'slick-carousel' );
```

### Enqueue::asset( $type, $handle )
- **$type** *(string)(Required)* Type of asset
- **$handle** *(string)(Required)* Registered handle
