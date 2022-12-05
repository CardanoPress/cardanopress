<?php

/**
 * The template for displaying the stake pool name with its ticker.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/pool-name.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($pool)) {
    return;
}

?>

<?php echo esc_html($pool['ticker']); ?> &mdash; <?php echo esc_html($pool['name']); ?>
