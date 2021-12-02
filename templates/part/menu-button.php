<?php

use PBWebDev\NamiPress\Profile;

if (empty($trimmedAddress)) {
    $userProfile = new Profile(wp_get_current_user());
    $trimmedAddress = str_replace(['addr1', 'addr_test1'], ['', ''], $userProfile->connectedWallet());
    $trimmedAddress = substr($trimmedAddress, 0, 2) . '...' . substr($trimmedAddress, -4);
}

?>

<button @click="openDropdown = !openDropdown">
    Wallet <?php echo $trimmedAddress; ?>
</button>
