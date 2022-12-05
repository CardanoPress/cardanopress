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

if (empty($recaptchaKey)) {
    $recaptchaKeys = cardanoPress()->option('recaptcha_key');
    $recaptchaKey = $recaptchaKeys['site'] ?? '';
}


?>

<form
    x-data="paymentForm"
    data-amount="<?php echo esc_attr($paymentAmount); ?>"
    data-recaptcha="<?php echo esc_attr($recaptchaKey); ?>"
>
    <div class='py-6'>
        <h2>Amount: <span><?php echo esc_html($paymentAmount); ?></span> ADA</h2>

        <p class='text-sm italic'>
            <?php cardanoPress()->template('part/payment-lovelace'); ?> Lovelace
        </p>

        <label>
            Quantity: <?php cardanoPress()->template('part/payment-quantity'); ?>
        </label>

        <h3>Total: <?php cardanoPress()->template('part/payment-total'); ?> ADA</h3>

        <p class='text-sm italic'>
            <?php cardanoPress()->template('part/payment-total', ['format' => 'lovelace']); ?> Lovelace
        </p>
    </div>

    <div class='py-6'>
        <?php cardanoPress()->template('part/payment-button'); ?>
    </div>

    <template x-if='!isVerified'>
        <div class="py-6">
            <?php cardanoPress()->template('part/payment-recaptcha'); ?>
        </div>
    </template>

    <div class='py-6'>
        <template x-if='!showAddress'>
            <?php cardanoPress()->template('part/payment-toggle'); ?>
        </template>

        <template x-if='showAddress'>
            <?php cardanoPress()->template('part/payment-address'); ?>
        </template>
    </div>

    <template x-if='transactionHash'>
        <div class="py-6">
            <?php cardanoPress()->template('part/payment-output'); ?>
        </div>
    </template>
</form>
