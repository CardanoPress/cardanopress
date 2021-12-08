<h3>
    Account

    <div class="ml-3 inline-block">
        <?php if (! cardanoPress()->userProfile()->connectedStake()) : ?>
            <button type="button" @click="showModal = true">Reconnect</button>
        <?php else : ?>
            <?php cardanoPress()->template('part/asset-sync'); ?>
        <?php endif; ?>
    </div>
</h3>

<table class="w-full table-auto border-collapse">
    <tbody>
        <tr>
            <th>Network</th>
            <td><?php echo cardanoPress()->userProfile()->connectedNetwork(); ?></td>
        </tr>

        <tr>
            <th>Wallet</th>
            <td><?php echo cardanoPress()->userProfile()->connectedWallet(); ?></td>
        </tr>

        <tr>
            <th>Stake</th>
            <td><?php echo cardanoPress()->userProfile()->connectedStake(); ?></td>
        </tr>
    </tbody>
</table>
