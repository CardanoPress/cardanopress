<?php

/**
 * The template for displaying the list of navigation items for the menu dropdown.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/menu-items.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

$dashboardPage = cardanoPress()->option('member_dashboard');
$collectionPage = cardanoPress()->option('member_collection');

?>

<li>
    <a href="<?php echo get_permalink($dashboardPage); ?>" class="block py-1 px-2">Dashboard</a>
</li>

<li>
    <a href="<?php echo get_permalink($collectionPage); ?>" class="block py-1 px-2">NFT Collection</a>
</li>

<li>
    <a href="<?php echo wp_logout_url(get_permalink()); ?>" class="block py-1 px-2">Disconnect</a>
</li>
