<?php

/**
 * The template for displaying the stake pool favicon.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/pool-image.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($pool)) {
    return;
}

$image_icon = '';

if (isset($pool['extended']['info']['url_png_icon_64x64'])) {
    $image_icon = $pool['extended']['info']['url_png_icon_64x64'];
}

?>

<div class="relative w-16 h-16 inline-block m-2">
    <div class="absolute inset-0">
        <?php if ($image_icon) : ?>
            <img
                src="<?php echo esc_attr($image_icon); ?>"
                alt="<?php echo esc_attr($pool['name']); ?>"
                class="w-full"
            >
        <?php else : ?>
            <div class="h-full">
                <div class="w-full h-full inline-flex justify-center items-center rounded-full bg-gray-500">
                    <div
                        role="img"
                        class="text-3xl font-medium uppercase"
                        aria-label="<?php echo esc_attr($pool['name']); ?>"
                    >
                        <?php echo esc_html($pool['name'][0] ?? ''); ?>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>
</div>
