<?php

/**
 * The template for displaying the current and remaining wallet balance.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/payment-balance.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($type)) {
    $type = 'current';
}

$inAda = empty($format) || $format === 'ADA';

?>

<span x-text="balanceValue('<?php echo esc_js($type); ?>', <?php echo esc_js($inAda) ? 'true' : 'false'; ?>)"></span>
