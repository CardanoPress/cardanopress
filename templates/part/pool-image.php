<?php

/**
 * The template for displaying the stake pool favicon.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/pool-image.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($pool)) {
    return;
}

?>

<div class="relative w-16 h-16 inline-block m-2">
    <div class="absolute inset-0">
        <?php if ('mainnet' === cardanoPress()->userProfile()->connectedNetwork()) : ?>
            <img
                src="https://static.adapools.org/pool_logo/<?php echo $pool['hex']; ?>.png"
                alt="<?php echo $pool['name']; ?>"
                class="w-full"
            >
        <?php else : ?>
            <div class="h-full">
                <div class="w-full h-full inline-flex justify-center items-center rounded-full bg-gray-500">
                    <div
                        role="image"
                        class="text-3xl font-medium uppercase"
                        aria-label="<?php echo $pool['name']; ?>"
                    >
                        <?php echo $pool['name'][0]; ?>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>
</div>
