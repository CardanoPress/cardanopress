<?php

/**
 * The template for displaying the actual pay button.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/payment-button.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($text)) {
    $text = 'Pay';
}

if (empty($textNotConnected)) {
    $textNotConnected = '(Not connected)';
}

?>

<template x-if='!isConnected'>
    <button disabled='true'>
        <?php echo $text; ?>

        <span class='block italic text-sm'><?php echo $textNotConnected; ?></span>
    </button>
</template>

<template x-if='isConnected'>
    <button
        x-on:click.prevent='handlePayment()'
        x-bind:disabled='!isReady()'
    >
        <?php echo $text; ?>

        <span class='block italic text-sm' x-text="'(Connected to ' + connectedExtension + ')'"></span>
    </button>
</template>
