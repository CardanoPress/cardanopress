<?php

/**
 * The template for displaying the list of navigation items for the menu dropdown.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/menu-items.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

if (empty($list)) {
    $dashboardPage = cardanoPress()->option('member_dashboard');
    $collectionPage = cardanoPress()->option('member_collection');

    $list = [
        'Dashboard' => get_permalink($dashboardPage),
        'NFT Collection' => get_permalink($collectionPage),
        'Disconnect' => wp_logout_url(get_permalink()),
    ];
}

?>

<?php foreach ($list as $label => $link) : ?>
    <li>
        <a href="<?php echo $link; ?>" class='block py-1 px-2'><?php echo $label; ?></a>
    </li>
<?php endforeach; ?>
