<?php

/**
 * The template for displaying the stake pool details to delegate to.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/delegation-details.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($pool)) {
    $pool = cardanoPress()->delegationPool();
}

if (empty($pool)) {
    return;
}

?>

<h2>
    <a href="<?php echo esc_url($pool['homepage'] ?? '#'); ?>" target="_blank" class="inline-flex items-center">
        <?php cardanoPress()->template('part/pool-image', compact('pool')); ?>

        <?php cardanoPress()->template('part/pool-name', compact('pool')); ?>
    </a>
</h2>

<p><?php echo esc_html($pool['description']); ?></p>
