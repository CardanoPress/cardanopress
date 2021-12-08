<?php

if (empty($trimmedAddress)) {
    $trimmedAddress = str_replace(['addr1', 'addr_test1'], ['', ''], cardanoPress()->userProfile()->connectedWallet());
    $trimmedAddress = substr($trimmedAddress, 0, 2) . '...' . substr($trimmedAddress, -4);
}

?>

<button @click="openDropdown = !openDropdown">
    Wallet <?php echo $trimmedAddress; ?>
</button>
