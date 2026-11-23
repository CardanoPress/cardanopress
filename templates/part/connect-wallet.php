<?php

/**
 * The template for displaying the connect wallet button.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/part/connect-wallet.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

?>

<?php if (isset($type)) : ?>
    <template x-data="<?php echo esc_attr('{type:' . wp_json_encode((string) $type, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP) . '}'); ?>" x-if="supportedWallets.includes(type)">
<?php endif; ?>

<button x-on:click.prevent="walletConnect(type)" x-bind:disabled="isDisabled(type)">
    <?php if (isset($text)) : ?>
        <span><?php echo esc_html($text); ?></span>
    <?php else : ?>
        <span x-text="type"></span>
    <?php endif; ?>

    <template x-if="!walletAvailable(type)">
        <span class="block italic text-sm">(Not available)</span>
    </template>

    <template x-if="!!fromVespr(type)">
        <span class="block italic text-sm">(VESPR Compat)</span>
    </template>
</button>

<?php if (isset($type)) : ?>
    </template>
<?php endif; ?>
