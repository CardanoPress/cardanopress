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
    $paymentPage = cardanoPress()->option('member_payment');
    $delegationPage = cardanoPress()->option('member_delegation');
    $splitPage = cardanoPress()->option('member_split');

    $list = [
        'Dashboard' => get_permalink($dashboardPage),
        'NFT Collection' => get_permalink($collectionPage),
        'Payment' => get_permalink($paymentPage),
        'Delegation' => get_permalink($delegationPage),
        'Split Balance' => get_permalink($splitPage),
        'Disconnect' => wp_logout_url(get_permalink()),
    ];
}

?>

<?php foreach ($list as $label => $link) : ?>
    <li>
        <a href="<?php echo $link; ?>" class='block py-1 px-2'><?php echo $label; ?></a>
    </li>
<?php endforeach; ?>
