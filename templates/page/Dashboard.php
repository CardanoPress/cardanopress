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
    <template x-if="!isConnected">
        <div class="py-6">
            <button type="button" @click="showModal = true">Connect</button>
        </div>
    </template>

    <template x-if="isConnected">
        <div class="py-6">
            <?php namiPress()->template('welcome-banner', compact('userProfile')); ?>

            <?php namiPress()->template('part/profile-connection', compact('userProfile')); ?>
        </div>
    </template>
</main>

<?php

get_footer();
