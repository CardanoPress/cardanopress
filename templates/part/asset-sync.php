<?php

/**
 * The template for displaying the asset sync button.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/asset-sync.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

?>

<button x-on:click.prevent='handleSync()' x-bind:disabled="isDisabled()">Sync</button>
