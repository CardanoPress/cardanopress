# ThemePlate Logger

## Usage

```php
use ThemePlate\Logger;

$logger = new Logger( 'mylogs', 'path/to/save' );

$logger->channel( 'api' )->info( 'READY!' );
$logger->channel( 'app' )->info( 'INITIALIZED!' );
```

`path/to/save/mylogs/[year]/[month]/[day]/[channel].log`

### new Logger( $folder_name, $base_path )

- **$folder_name** *(string)(Optional)* Default `logs`
- **$base_path** *(string)(Optional)* Default `WP_CONTENT_DIR`
