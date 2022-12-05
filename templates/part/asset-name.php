<?php

/**
 * The template for displaying the single asset name.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/asset-name.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($text)) {
    $text = $asset['onchain_metadata']['name'] ?? $asset['packed_name'] ?? '';

    if (! $text) {
        return;
    }
}

?>

<span class="text-2xl"><?php echo esc_html($text); ?></span>
