<?php

/**
 * @package ThemePlate
 * @since   0.1.0
 */

use PBWebDev\CardanoPress\Profile;

if (empty($userProfile) || ! $userProfile instanceof Profile) {
    $userProfile = new Profile(wp_get_current_user());
}

?>

<ul class="list-none my-0 -mx-4 p-0 flex flex-wrap">
    <?php foreach ($userProfile->storedAssets() as $asset) : ?>
        <?php cardanoPress()->template('part/collection-item', compact('asset')); ?>
    <?php endforeach; ?>
</ul>
