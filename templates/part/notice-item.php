<?php

/**
 * The template for displaying the single notice to toast.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/notice-item.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

?>

<div
    class="my-2 py-2 px-3 inline-block shadow rounded text-white cursor-pointer"
    :class="{
        'bg-green-500': notice.type === 'success',
        'bg-blue-500': notice.type === 'info',
        'bg-yellow-500': notice.type === 'warning',
        'bg-red-500': notice.type === 'error',
        }"
    style="pointer-events:all"
>
    <p class="mb-0 font-semibold text-lg" x-text="notice.text"></p>
</div>
