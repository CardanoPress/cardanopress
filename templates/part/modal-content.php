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
    <button x-on:click.prevent="isConnected ? handleReconnect('Nami') : handleConnect('Nami')" x-bind:disabled="isDisabled('Nami')">
        Nami

        <template x-if="!isAvailable || !has('Nami')">
            <span class="block italic text-sm">(Not available)</span>
        </template>
    </button>

    <button x-on:click.prevent="isConnected ? handleReconnect('ccvault') : handleConnect('ccvault')" x-bind:disabled="isDisabled('ccvault')">
        ccvault

        <template x-if="!isAvailable || !has('Ccvault')">
            <span class="block italic text-sm">(Not available)</span>
        </template>
    </button>

    <button x-on:click.prevent="isConnected ? handleReconnect('Yoroi') : handleConnect('Yoroi')" x-bind:disabled="isDisabled('Yoroi')">
        Yoroi

        <template x-if="!isAvailable || !has('Yoroi')">
            <span class="block italic text-sm">(Not available)</span>
        </template>
    </button>

    <button x-on:click.prevent="isConnected ? handleReconnect('Flint') : handleConnect('Flint')" x-bind:disabled="isDisabled('Flint')">
        Flint

        <template x-if="!isAvailable || !has('Flint')">
            <span class="block italic text-sm">(Not available)</span>
        </template>
    </button>

    <button x-on:click.prevent="isConnected ? handleReconnect('Typhon') : handleConnect('Typhon')" x-bind:disabled="isDisabled('Typhon')">
        Typhon

        <template x-if="!isAvailable || !has('Typhon')">
            <span class="block italic text-sm">(Not available)</span>
        </template>
    </button>
</div>
