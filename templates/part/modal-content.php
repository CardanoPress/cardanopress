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
    <button x-on:click.prevent="walletConnect('Nami')" x-bind:disabled="isDisabled('Nami')">
        Nami

        <template x-if="!walletAvailable('Nami')">
            <span class="block italic text-sm">(Not available)</span>
        </template>
    </button>

    <button x-on:click.prevent="walletConnect('ccvault')" x-bind:disabled="isDisabled('ccvault')">
        ccvault

        <template x-if="!walletAvailable('Ccvault')">
            <span class="block italic text-sm">(Not available)</span>
        </template>
    </button>

    <button x-on:click.prevent="walletConnect('Yoroi')" x-bind:disabled="isDisabled('Yoroi')">
        Yoroi

        <template x-if="!walletAvailable('Yoroi')">
            <span class="block italic text-sm">(Not available)</span>
        </template>
    </button>

    <button x-on:click.prevent="walletConnect('Flint')" x-bind:disabled="isDisabled('Flint')">
        Flint

        <template x-if="!walletAvailable('Flint')">
            <span class="block italic text-sm">(Not available)</span>
        </template>
    </button>

    <button x-on:click.prevent="walletConnect('Typhon')" x-bind:disabled="isDisabled('Typhon')">
        Typhon

        <template x-if="!walletAvailable('Typhon')">
            <span class="block italic text-sm">(Not available)</span>
        </template>
    </button>
</div>
