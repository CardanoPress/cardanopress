<?php

/**
 * The template for displaying the payment calculated total amount.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/payment-lovelace.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

$inAdaValue = empty($format) || $format === 'ADA';

?>

<span x-text="totalAmount(<?php echo $inAdaValue ? 'true' : 'false'; ?>)"></span>
