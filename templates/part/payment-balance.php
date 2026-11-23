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

<span x-text="<?php echo esc_attr('balanceValue(' . wp_json_encode((string) $type, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) . ', ' . ($inAda ? 'true' : 'false') . ')'); ?>"></span>
