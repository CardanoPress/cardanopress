# ThemePlate Tester

#### Available commands:
| Name    | Description       |
|---------|-------------------|
| analyse | Analyse the codes |
| dump    | Dump the configs  |
| fix     | Fix the codes     |
| lint    | Lint the codes    |
| setup   | Setup the tests   |
| test    | Run the tests     |

## Usage

### composer.json
```json
{
	"name": "my/package",
	"require": {
		"php": "^7.4|^8.0"
	},
	"require-dev": {
		"themeplate/tester": "*"
	},
	"autoload-dev": {
		"psr-4": {
			"Tests\\": "tests"
		}
	}
}
```

### SampleTest.php
```php
namespace Tests;

use ThemePlate\Tester\Utils;

class SampleTest extends WP_UnitTestCase {
	public function test_sample() {
		$instance = new Class();

		Utils::invoke_inaccessible_method( $instance, 'method_name', array( 'arg1', 'arg2' ) );

		$value = Utils::get_inaccessible_property( $instance, 'property_name' );

		Utils::set_inaccessible_property( $instance, 'wanted_property', $value );

		// Do actual assertions
	}
}
```

### After `composer install`, run `./vendor/bin/themeplate setup`
- Analyse `./vendor/bin/themeplate analyse`
- Lint `./vendor/bin/themeplate lint`
- Fix `./vendor/bin/themeplate fix`
- Test `./vendor/bin/themeplate test`

#### Dump the configs for customizations `./vendor/bin/themeplate dump`

#### Sample composer scripts
```json
...
    "scripts": {
        "analyse": "themeplate analyse",
        "lint": "themeplate lint",
        "fix": "themeplate fix",
        "test": "themeplate test",
        "test:unit": "themeplate test --type unit",
        "test:integration": "themeplate test --type integration"
    }
...
```
