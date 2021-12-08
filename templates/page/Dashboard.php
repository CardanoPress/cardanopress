<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

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
            <?php cardanoPress()->template('welcome-banner'); ?>

            <?php cardanoPress()->template('part/profile-connection'); ?>
        </div>
    </template>
</main>

<?php

get_footer();
