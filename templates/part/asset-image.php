<?php

if (empty($asset)) {
    return;
}

?>

<div class="relative w-full mb-4" style="padding-top: 100%">
    <div class="absolute inset-0">
        <?php if ($asset['parsed_image']) : ?>
            <img
                src="<?php echo $asset['parsed_image']; ?>"
                alt="<?php echo $asset['packed_name']; ?>"
                class="w-full"
            >
        <?php else : ?>
            <div class="h-full p-4">
                <div class="w-full h-full inline-flex justify-center items-center rounded-full bg-gray-500">
                    <div
                        role="image"
                        class="text-9xl font-medium uppercase"
                        aria-label="<?php echo $asset['packed_name']; ?>"
                    >
                        <?php echo $asset['packed_name'][0]; ?>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </div>
</div>
