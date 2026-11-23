<?php

/**
 * The template for displaying the menu button of connected wallet.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/menu-button.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($text)) {
    $favoriteHandle = cardanoPress()->userProfile()->getFavoriteHandle();
    $trimmedAddress = cardanoPress()->userProfile()->getTrimmedAddress();

    $text = 'Wallet ' . ($favoriteHandle ?: $trimmedAddress);
}

?>

<button x-on:click="openDropdown = !openDropdown">
    <span x-text="<?php echo esc_attr('getWalletHandle(' . wp_json_encode((string) $text, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) . ')'); ?>"><?php echo esc_html($text); ?></span>
</button>
