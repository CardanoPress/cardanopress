<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

use PBWebDev\CardanoPress\Profile;

$userProfile = new Profile(wp_get_current_user());

get_header();

?>

<main class="container">
    <div class="py-6">
        <?php cardanoPress()->template('welcome-banner'); ?>

        <h1>Assets:</h1>

        <?php cardanoPress()->template('collection-list', compact('userProfile')); ?>
    </div>
</main>

<?php

get_footer();
