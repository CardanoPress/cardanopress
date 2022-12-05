<?php

/**
 * The template for displaying the single ADA Handle.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/adahandle-item.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($handle)) {
    return;
}

?>

<li class="p-2 w-full sm:w-1/2 lg:w-1/4" x-id="['ada-handle']" >
    <label :for="$id('ada-handle')">
        <input
            type="radio"
            name="favorite-handle"
            :id="$id('ada-handle')"
            :disabled="isDisabled()"
            x-model="selectedHandle"
            value="<?php echo esc_attr($handle); ?>"
        >
            <?php echo esc_html($handle); ?>
    </label>
</li>
