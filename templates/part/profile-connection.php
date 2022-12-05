<?php

/**
 * The template for displaying the connected wallet information.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/profile-connection.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

$userProfile = cardanoPress()->userProfile();

?>

<h3>
    Account

    <span class="ml-3">
        <?php if (! $userProfile->isConnected()) : ?>
            <?php cardanoPress()->template('part/modal-trigger', ['text' => 'Reconnect']); ?>
        <?php else : ?>
            <?php cardanoPress()->template('part/asset-sync'); ?>
        <?php endif; ?>
    </span>
</h3>

<table class="w-full table-auto border-collapse">
    <tbody>
        <tr>
            <th>Extension</th>
            <td x-text="connectedExtension"></td>
        </tr>

        <tr>
            <th>Network</th>
            <td><?php echo esc_html($userProfile->connectedNetwork()); ?></td>
        </tr>

        <tr>
            <th>Wallet</th>
            <td><?php echo esc_html($userProfile->connectedWallet()); ?></td>
        </tr>

        <tr>
            <th>Stake</th>
            <td><?php echo esc_html($userProfile->connectedStake()); ?></td>
        </tr>
    </tbody>
</table>
