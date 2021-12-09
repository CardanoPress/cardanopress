<?php

/**
 * The template for displaying the current delegation process information.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/delegation-result.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

?>

<template x-if='isConnected && !isProcessing && !transactionHash'>
    <p>Waiting for delegation</p>
</template>

<template x-if='isConnected && isProcessing'>
    <p>Confirming transaction</p>
</template>

<template x-if='isConnected && !isProcessing && transactionHash'>
    <p x-text='transactionHash'></p>
</template>
