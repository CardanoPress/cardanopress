<?php

/**
 * The template for displaying the balance sync button.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/balance-sync.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($text)) {
    $text = 'Sync Balance';
}

?>

<button x-on:click.prevent='syncBalance()' x-bind:disabled="isProcessing"><?php echo esc_html($text); ?></button>
