<?php

if (empty($asset)) {
    return;
}

?>

<span class="text-2xl"><?php echo $asset['onchain_metadata']['name'] ?? $asset['packed_name']; ?></span>
