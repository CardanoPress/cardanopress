<?php

$pool = cardanoPress()->delegationPool();

if (empty($pool)) {
    return;
}

?>

<h2>
    <a href="<?php echo $pool['homepage']; ?>" target="_blank" class="inline-flex items-center">
        <?php cardanoPress()->template('part/pool-image', compact('pool')); ?>

        <?php cardanoPress()->template('part/pool-name', compact('pool')); ?>
    </a>
</h2>

<p><?php echo $pool['description']; ?></p>
