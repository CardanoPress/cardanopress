<?php

use PBWebDev\CardanoPress\Blockfrost;

$network = cardanoPress()->userProfile()->connectedNetwork();

if (! $network) {
    return;
}

$blockfrost = new Blockfrost($network);
$poolIds = cardanoPress()->option('delegation_pool_id');
$pool = $blockfrost->getPoolDetails($poolIds[$network]);

if (empty($pool)) {
    return;
}

?>

<h2>
    <a href="<?php echo $pool['homepage']; ?>" target="_blank">
        <span><?php echo $pool['ticker']; ?></span> &mdash; <?php echo $pool['name']; ?>
    </a>
</h2>

<p><?php echo $pool['description']; ?></p>
