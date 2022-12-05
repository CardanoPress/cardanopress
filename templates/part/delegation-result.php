<?php

/**
 * The template for displaying the current delegation process information.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/delegation-result.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($textWaiting)) {
    $textWaiting = 'Waiting for delegation';
}

if (empty($textConfirming)) {
    $textConfirming = 'Confirming transaction';
}

?>

<template x-if='isConnected && !isProcessing && !transactionHash'>
    <p><?php echo esc_html($textWaiting); ?></p>
</template>

<template x-if='isConnected && isProcessing'>
    <p><?php echo esc_html($textConfirming); ?></p>
</template>

<template x-if='isConnected && !isProcessing && transactionHash'>
    <p x-text='transactionHash'></p>
</template>
