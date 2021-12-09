<?php

/**
 * The template for displaying the menu button of connected wallet.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/menu-button.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($trimmedAddress)) {
    $trimmedAddress = str_replace(['addr1', 'addr_test1'], ['', ''], cardanoPress()->userProfile()->connectedWallet());
    $trimmedAddress = substr($trimmedAddress, 0, 2) . '...' . substr($trimmedAddress, -4);
}

?>

<button @click="openDropdown = !openDropdown">
    Wallet <?php echo $trimmedAddress; ?>
</button>
