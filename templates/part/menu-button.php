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
    if (empty($trimmedAddress)) {
        $connectedWallet = cardanoPress()->userProfile()->connectedWallet();
        $trimmedAddress = str_replace(['addr1', 'addr_test1'], ['', ''], $connectedWallet);
        $trimmedAddress = substr($trimmedAddress, 0, 2) . '...' . substr($trimmedAddress, -4);
    }

    $text = 'Wallet ' . $trimmedAddress;
}


?>

<button @click="openDropdown = !openDropdown">
    <?php echo $text; ?>
</button>
