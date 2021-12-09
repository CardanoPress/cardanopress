<?php

/**
 * The template for displaying the contents of the connect-modal popup.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/modal-content.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

?>

<div class="px-6 py-4">
    <button x-on:click.prevent='isConnected ? handleReconnect() : handleConnect()' x-bind:disabled="isDisabled()">
        Nami

        <template x-if="!isAvailable">
            <span class="block italic text-sm">(Not available)</span>
        </template>
    </button>
</div>
