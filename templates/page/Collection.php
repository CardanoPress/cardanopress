<?php

/**
 * Page template for displaying user's asset collection.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/page/Collection.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

cardanoPress()->compatibleHeader();

?>

<main class="container">
    <div class="py-6">
        <?php cardanoPress()->template('welcome-banner'); ?>

        <h1>Assets:</h1>
        <?php the_content(); ?>

        <?php cardanoPress()->template('collection-list'); ?>
    </div>
</main>

<?php

cardanoPress()->compatibleFooter();
