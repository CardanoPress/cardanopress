# ThemePlate Logger

## Usage

```php
use ThemePlate\Logger;

$logger = new Logger('path/to/logs');
$logger->channel('api')->info('READY!');
$logger->channel('app')->info('INITIALIZED!');
```

`path/to/logs/[year]/[month]/[day]/[channel].log`
