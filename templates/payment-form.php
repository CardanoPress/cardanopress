<?php

/**
 * The template for displaying the actual payment form.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/payment-form.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

$paymentAmount = cardanoPress()->option('payment_amount');

?>

<form x-data='paymentForm' data-amount="<?php echo $paymentAmount; ?>">
    <div class='py-6'>
        <h2>Amount: <span><?php echo $paymentAmount; ?></span> ADA</h2>

        <p class='text-sm italic'>
            <?php cardanoPress()->template('part/payment-lovelace'); ?> Lovelace
        </p>
    </div>

    <div class="py-6">
        <?php cardanoPress()->template('part/payment-recaptcha'); ?>
    </div>

    <div class='py-6'>
        <?php cardanoPress()->template('part/payment-toggle'); ?>

        <template x-if='showAddress'>
            <?php cardanoPress()->template('part/payment-address'); ?>
        </template>
    </div>

    <div class="py-6">
        <?php cardanoPress()->template('part/payment-button'); ?>
    </div>

    <template x-if='transactionHash'>
        <div class="py-6">
            <?php cardanoPress()->template('part/payment-output'); ?>
        </div>
    </template>
</form>
