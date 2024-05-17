<?php

/**
 * Page template for displaying the payment flow.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/page/Payment.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

cardanoPress()->enqueue('script', 'cardanopress-payment');

$recaptchaKeys = cardanoPress()->option('recaptcha_key');
$recaptchaKey = $recaptchaKeys['site'] ?? '';

if (! empty($recaptchaKey)) {
    cardanoPress()->enqueue('script', 'cardanopress-recaptcha');
}

cardanoPress()->compatibleHeader();

?>

<main class="container">
    <div class="py-6">
        <h1>Payment</h1>
        <?php the_content(); ?>

        <?php cardanoPress()->template('payment-form', compact('recaptchaKey')); ?>
    </div>
</main>

<?php

cardanoPress()->compatibleFooter();
