<?php

/**
 * The template for displaying the button to process the delegation.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/delegation-process.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

?>

<template x-if='!isConnected'>
    <button type='button' disabled='true'>Delegate</button>
</template>

<template x-if='isConnected && !transactionHash'>
    <button type='button' @click='handleDelegation()' x-bind:disabled='isProcessing'>Delegate</button>
</template>

<template x-if='isConnected && transactionHash'>
    <button type='button' disabled='true'>Delegated</button>
</template>
