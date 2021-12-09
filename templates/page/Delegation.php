<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

use ThemePlate\Enqueue;

Enqueue::asset('script', 'cardanopress-delegation');

get_header();

?>

<main class="container">
    <div class="py-6">
        <h1>Delegation:</h1>

        <?php cardanoPress()->template('pool-delegation'); ?>
    </div>
</main>

<?php

get_footer();
