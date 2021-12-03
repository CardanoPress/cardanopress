# External Update Manager -- ![Scrutinizer Build Status](https://scrutinizer-ci.com/g/kermage/External-Update-Manager/badges/build.png) ![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/kermage/External-Update-Manager/badges/quality-score.png)
> *"A drop-in library for WordPress themes or plugins to manage updates."*

*self-hosted...can't be submitted to official WordPress repository...non-GPL licensed...custom-made...commercial...etc.*

## Requirements
* PHP 5.2.4+
* WordPress 4.4.0+

## Installation
1. Grab the `class-external-update-manager.php` file and place it somewhere inside the theme or plugin directory
2. Add a `require_once` call in the theme's `functions.php` or in the plugin's `main php file` referencing the class file
3. Run the `EUM_Handler` with the `full path` of the theme or plugin and the `update URL` to check for the latest version available

```php
require_once 'class-external-update-manager.php';
EUM_Handler::run( __FILE__, '<UPDATE URL>' );
```

## Working Examples

* [ThemePlate](https://github.com/kermage/ThemePlate)
* [Augment Types](https://github.com/kermage/augment-types)
