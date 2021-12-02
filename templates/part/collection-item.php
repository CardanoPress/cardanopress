<?php

if (empty($asset)) {
    return;
}

?>

<li class="p-4 w-full sm:w-1/2 lg:w-1/4">
    <?php namiPress()->template('part/asset-image', compact('asset')); ?>

    <h2><?php namiPress()->template('part/asset-name', compact('asset')); ?></h2>
    <p class="mb-1"><b>Quantity:</b> <?php echo $asset['quantity']; ?></p>

    <?php if (! empty($asset['onchain_metadata'])) : ?>
        <?php foreach ($asset['onchain_metadata'] as $key => $value) : ?>
            <?php if (! in_array($key, ['name', 'image', 'arweaveId'])) : ?>
                <p class="mb-1">
                    <b><?php echo ucfirst($key); ?>:</b>

                    <?php if (is_array($value)) : ?>
                        <?php echo implode(', ', $value); ?>
                    <?php else : ?>
                        <?php echo $value; ?>
                    <?php endif; ?>
                </p>
            <?php endif; ?>
        <?php endforeach; ?>
    <?php endif; ?>
</li>
