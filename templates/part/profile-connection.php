<?php

$userProfile = cardanoPress()->userProfile();

?>

<h3>
    Account

    <span class="ml-3">
        <?php if (! $userProfile->isConnected()) : ?>
            <button type="button" @click="showModal = true">Reconnect</button>
        <?php else : ?>
            <?php cardanoPress()->template('part/asset-sync'); ?>
        <?php endif; ?>
    </span>
</h3>

<table class="w-full table-auto border-collapse">
    <tbody>
        <tr>
            <th>Network</th>
            <td><?php echo $userProfile->connectedNetwork(); ?></td>
        </tr>

        <tr>
            <th>Wallet</th>
            <td><?php echo $userProfile->connectedWallet(); ?></td>
        </tr>

        <tr>
            <th>Stake</th>
            <td><?php echo $userProfile->connectedStake(); ?></td>
        </tr>
    </tbody>
</table>
