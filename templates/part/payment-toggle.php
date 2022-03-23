<?php

/**
 * The template for displaying the payment address toggle button.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/payment-toggle.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

?>

<button
    x-on:click.prevent='showAddress = ! showAddress'
    x-bind:disabled="!isReady('reveal')"
>
    <span x-text="showAddress ? 'Hide' : 'Reveal'">Reveal</span> Address
</button>
