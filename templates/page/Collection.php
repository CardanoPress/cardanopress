<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

use PBWebDev\NamiPress\Profile;

$userProfile = new Profile(wp_get_current_user());

get_header();

?>

<main class="container">
    <div class="py-6">
        <?php namiPress()->template('welcome-banner'); ?>

        <h1>Assets:</h1>

        <?php namiPress()->template('collection-list', compact('userProfile')); ?>
    </div>
</main>

<?php

get_footer();
