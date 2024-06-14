<?php

/**
 * Page template for displaying split payments flow.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/page/Split.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

cardanoPress()->enqueue('script', 'cardanopress-split');
cardanoPress()->enqueue('script', 'cardanopress-payment');

$fixedFee = cardanoPress()->option('payment_split');
$recaptchaKeys = cardanoPress()->option('recaptcha_key');
$recaptchaKey = $recaptchaKeys['site'] ?? '';

if (! empty($recaptchaKey)) {
    cardanoPress()->enqueue('script', 'cardanopress-recaptcha');
}

cardanoPress()->compatibleHeader();

?>

<main class="container">
    <div class="py-6">
        <h1>Split Payments</h1>
        <?php the_content(); ?>

        <form
            x-data="paymentForm"
            data-amount="<?php echo esc_attr($fixedFee); ?>"
            data-recaptcha="<?php echo esc_attr($recaptchaKey); ?>"
        >
            <div class="py-6">
                <h2>Fixed Fee: <span><?php echo esc_html($fixedFee); ?></span> ADA</h2>

                <p class="text-sm italic">
                    <?php cardanoPress()->template('part/payment-lovelace'); ?> Lovelace
                </p>

                <h2>Current Balance: <?php cardanoPress()->template('part/payment-balance'); ?> ADA</h2>
                <p class="text-sm italic">
                    <?php cardanoPress()->template('part/payment-balance', ['format' => 'lovelace']); ?> Lovelace
                </p>

                <template x-if="!syncedBalance">
                    <?php cardanoPress()->template('part/balance-sync'); ?>
                </template>
            </div>

            <template x-if="!isVerified">
                <div class="py-6">
                    <?php cardanoPress()->template('part/payment-recaptcha'); ?>
                </div>
            </template>

            <table class="w-full" x-data="splitForm" data-fee="<?php echo esc_attr($fixedFee); ?>">
                <thead>
                    <tr>
                        <th>Percentage</th>
                        <th>Address</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <template x-for="(output, index) in outputs" :key="index">
                        <tr>
                            <td class="w-1/5">
                                <input x-bind:value="output.percentage" type="number" disabled readonly class="w-full">
                            </td>
                            <td class="w-1/2">
                                <input x-bind:value="output.address" type="text" disabled readonly class="w-full">
                            </td>
                            <td class="w-1/3">
                                <input x-bind:value="output.amount" type="text" disabled readonly class="w-full">
                            </td>
                            <td class="w-1/5">
                                <button
                                    x-on:click.prevent="removeOutput(index)"
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    </template>

                    <tr>
                        <td class="w-1/5">
                            <input x-model="percentage" type="number" min="0" max="100" class="w-full">
                        </td>
                        <td class="w-1/2">
                            <input x-model="address" type="text" class="w-full">
                        </td>
                        <td class="w-1/3">
                            <input x-bind:value="paymentAmount" type="text" class="w-full" readonly disabled>
                        </td>
                        <td class="w-1/5">
                            <button
                                x-on:click.prevent="addOutput()"
                                x-bind:disabled="!isReady()"
                            >
                                Add
                            </button>
                        </td>
                    </tr>
                </tbody>

                <tfoot>
                    <tr>
                        <td colspan="4">
                            <h3 class="mt-2">
                                Remaining Balance: <?php cardanoPress()->template(
                                    'part/payment-balance',
                                    ['type' => 'remaining']
                                ); ?> ADA
                            </h3>
                            <p class="text-sm italic">
                                <?php cardanoPress()->template(
                                    'part/payment-balance',
                                    ['type' => 'remaining', 'format' => 'lovelace']
                                ); ?> Lovelace
                            </p>
                            <p>
                                <button
                                    x-on:click.prevent="handleSend('all')"
                                    x-bind:disabled="!isReady('all')"
                                >
                                    Send All
                                </button>
                            </p>
                            <template x-if='transactionHash'>
                                <div class="py-6">
                                    <?php cardanoPress()->template('part/payment-output'); ?>
                                </div>
                            </template>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </form>
    </div>
</main>

<?php

cardanoPress()->compatibleFooter();
