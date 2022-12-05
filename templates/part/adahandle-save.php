<?php

/**
 * The template for displaying the save favorite ADA Handle button.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/adahandle-save.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($text)) {
    $text = 'Save as favorite';
}

?>

<button x-on:click.prevent="handleSave()" x-bind:disabled="isProcessing"><?php echo esc_html($text); ?></button>
