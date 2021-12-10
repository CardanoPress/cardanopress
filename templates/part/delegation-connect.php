<?php

/**
 * The template for displaying the first step to delegation: Connect wallet.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/delegation-connect.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($text)) {
    $text = 'Connect';
}

if (empty($textConnected)) {
    $textConnected = 'Connected';
}

?>

<template x-if='!isConnected'>
    <button type='button' @click='showModal = true'><?php echo $text; ?>></button>
</template>

<template x-if='isConnected'>
    <button type='button' disabled='true'><?php echo $textConnected; ?>></button>
</template>
