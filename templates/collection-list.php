<?php

/**
 * The template for displaying all the pulled assets by assigned policy IDs.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/collection-list.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

?>

<ul class="list-none my-0 -mx-4 p-0 flex flex-wrap">
    <?php foreach (cardanoPress()->userProfile()->storedAssets() as $asset) : ?>
        <?php cardanoPress()->template('part/collection-item', compact('asset')); ?>
    <?php endforeach; ?>
</ul>
