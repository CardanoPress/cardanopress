<?php

/**
 * The template for displaying the queried payment address.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/payment-address.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

?>

<div class="flex">
    <input x-bind:value="paymentAddress" type="text" class="w-full" readonly disabled>
    <button x-on:click.prevent="clipboardValue(paymentAddress)">Copy</button>
</div>
