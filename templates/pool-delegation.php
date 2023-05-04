<?php

/**
 * The template for displaying the stake pool delegation.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/pool-delegation.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

?>

<div x-data="poolDelegation">
    <div class="py-6">
        <?php cardanoPress()->template('part/delegation-details'); ?>
    </div>

    <div class="py-6">
        <?php cardanoPress()->template('part/delegation-connect'); ?>
    </div>

    <?php if (cardanoPress()->isUserDelegated()) : ?>
        <div class="py-6">
            <button type='button' disabled='true'>Delegated</button>
        </div>
    <?php else : ?>
        <div class="py-6">
            <?php cardanoPress()->template('part/delegation-process'); ?>
        </div>

        <div class="py-6">
            <?php cardanoPress()->template('part/delegation-result'); ?>
        </div>
    <?php endif; ?>
</div>
