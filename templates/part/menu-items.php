<?php

$dashboardPage = namiPress()->option('member_dashboard');
$collectionPage = namiPress()->option('member_collection');

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
