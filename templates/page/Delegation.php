<?php

/**
 * Page template for displaying stake pool delegation flow.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/page/Delegation.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

cardanoPress()->enqueue('script', 'cardanopress-delegation');
cardanoPress()->compatibleHeader();

?>

<main class="container">
    <div class="py-6">
        <h1>Delegation:</h1>
        <?php the_content(); ?>

        <?php cardanoPress()->template('pool-delegation'); ?>
    </div>
</main>

<?php

cardanoPress()->compatibleFooter();
