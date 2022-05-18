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

<button @click="openDropdown = !openDropdown">
    <span x-text="getWalletHandle('<?php echo $text; ?>')"><?php echo $text; ?></span>
</button>
