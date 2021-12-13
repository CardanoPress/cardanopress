<?php

/**
 * The template for displaying the payment google recaptcha.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/payment-recaptcha.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

$recaptchaKeys = cardanoPress()->option('recaptcha_key');

?>

<div id="cardanopress-recaptcha" data-sitekey="<?php echo $recaptchaKeys['site']; ?>"></div>
