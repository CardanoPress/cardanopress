<?php

/**
 * The template for displaying the connect-to-wallet in a modal popup.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/modal-connect.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

?>

<div
    class="hidden fixed inset-0 z-30 items-center justify-center overflow-auto bg-black bg-opacity-50"
    x-init="$el.classList.remove('hidden'); $el.classList.add('flex')"
    x-show="showModal"
>
    <div
        class="w-full max-w-sm mx-auto text-left bg-white rounded shadow-lg"
        x-show="showModal"
        x-transition:enter="transition ease-out duration-150"
        x-transition:enter-start="transform opacity-0 scale-75"
        x-transition:enter-end="transform opacity-100 scale-100"
        x-transition:leave="transition ease-in duration-75"
        x-transition:leave-start="transform opacity-100 scale-100"
        x-transition:leave-end="transform opacity-0 scale-75"
        x-on:click.away="showModal = false"
    >
        <?php cardanoPress()->template('part/modal-header'); ?>
        <?php cardanoPress()->template('part/modal-content'); ?>
    </div>
</div>
