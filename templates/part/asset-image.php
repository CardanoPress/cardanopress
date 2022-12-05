<?php

/**
 * The template for displaying the single asset image.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/asset-image.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($source)) {
    $source = $asset['parsed_image'] ?? '';
}

if (empty($label)) {
    $label = $asset['packed_name'] ?? '';
}

if (! $source && ! $label) {
    return;
}

?>

<div class="relative w-full mb-4" style="padding-top: 100%">
    <div class="absolute inset-0">
        <?php if ($source) : ?>
            <img
                src="<?php echo esc_attr($source); ?>"
                alt="<?php echo esc_attr($label); ?>"
                class="w-full"
            >
        <?php else : ?>
            <div class="h-full p-4">
                <div class="w-full h-full inline-flex justify-center items-center rounded-full bg-gray-500">
                    <div
                        role="image"
                        class="text-9xl font-medium uppercase"
                        aria-label="<?php echo esc_attr($label); ?>"
                    >
                        <?php echo esc_html($label[0]); ?>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>
</div>
