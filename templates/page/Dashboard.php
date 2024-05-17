<?php

/**
 * Page template for displaying the profile dashboard.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/page/Dashboard.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

cardanoPress()->compatibleHeader();

?>

<main class="container">
    <template x-if="!isConnected">
        <div class="py-6">
            <?php cardanoPress()->template('part/modal-trigger', ['text' => 'Connect Wallet']); ?>
        </div>
    </template>

    <template x-if="isConnected">
        <div class="py-6">
            <?php cardanoPress()->template('welcome-banner'); ?>
            <?php the_content(); ?>

            <?php cardanoPress()->template('part/profile-connection'); ?>
            <?php cardanoPress()->template('part/profile-adahandles'); ?>
        </div>
    </template>
</main>

<?php

cardanoPress()->compatibleFooter();
