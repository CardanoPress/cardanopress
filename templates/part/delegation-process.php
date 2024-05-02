<?php

/**
 * The template for displaying the button to process the delegation.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/delegation-process.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($text)) {
    $text = 'Delegate';
}

if (empty($textDelegated)) {
    $textDelegated = 'Delegated';
}

?>

<template x-if='!isConnected'>
    <button type='button' disabled='true'><?php echo esc_html($text); ?></button>
</template>

<template x-if='isConnected && !transactionHash'>
    <button type='button' x-on:click='handleDelegation()' x-bind:disabled='isProcessing'><?php echo esc_html($text); ?></button>
</template>

<template x-if='isConnected && transactionHash'>
    <button type='button' disabled='true'><?php echo esc_html($textDelegated); ?></button>
</template>
