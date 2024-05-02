<?php

/**
 * The template for displaying the payment transaction hash.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/payment-output.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

?>

<div class='flex'>
    <input x-bind:value="transactionHash" type="text" class="w-full" readonly disabled>
    <button x-on:click.prevent="clipboardValue(transactionHash)">Copy</button>
</div>
