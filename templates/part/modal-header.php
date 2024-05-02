<?php

/**
 * The template for displaying the header of the connect-modal popup.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/modal-header.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

?>

<div class="px-6 py-4 flex items-center justify-between">
    <h2 class="mb-0 mr-2">
        <span x-text="isConnected ? 'Reconnect' : 'Connect'">Connect</span>

        Wallet
    </h2>

    <button type="button" class="z-50 cursor-pointer p-0" x-on:click="showModal = false">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
        >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </button>
</div>
