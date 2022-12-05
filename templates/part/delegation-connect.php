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
    <?php cardanoPress()->template('part/modal-trigger', compact('text')); ?>
</template>

<template x-if='isConnected'>
    <button type='button' disabled='true'><?php echo esc_html($textConnected); ?></button>
</template>
