<?php

/**
 * The template for displaying the modal popup trigger button.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/modal-trigger.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($text)) {
    $text = 'Connect';
}

?>

<button type='button' x-on:click='showModal = true'><?php echo esc_html($text); ?></button>
