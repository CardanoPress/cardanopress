<?php

/**
 * Page template for displaying split payments flow.
 *
 * This can be overridden by copying it to yourtheme/cardanopress/page/SplitPayments.php.
 *
 * @package ThemePlate
 * @since   0.1.0
 */

use ThemePlate\Enqueue;

Enqueue::asset('script', 'cardanopress-split');
Enqueue::asset('script', 'cardanopress-payment');
Enqueue::asset('script', 'cardanopress-recaptcha');

$fixedFee = cardanoPress()->option('payment_split');

get_header();

?>

<main class="container">
    <div class="py-6">
        <h1>Split Payments</h1>

        <form x-data='paymentForm' data-amount="<?php echo $fixedFee; ?>">
            <div class='py-6'>
                <h2>Fixed Fee: <span><?php echo $fixedFee; ?></span> ADA</h2>

                <p class='text-sm italic'>
                    <?php cardanoPress()->template('part/payment-lovelace'); ?> Lovelace
                </p>

                <h2>Current Balance: <span x-text='currentBalance / 1000000'></span> ADA</h2>
                <p class='text-sm italic'>
                    <span x-text='currentBalance'></span> Lovelace
                </p>
            </div>

            <div class="py-6">
                <?php cardanoPress()->template('part/payment-recaptcha'); ?>
            </div>

            <table class="w-full">
                <thead>
                    <tr>
                        <th>Percentage</th>
                        <th>Address</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    <?php for ($i = 1; $i <= 5; $i++) : ?>
                        <tr x-data="splitForm" data-fee="<?php echo $fixedFee; ?>">
                            <td class="w-1/5">
                                <input x-model="percentage" type="number" min='0' max='100' class="w-full">
                            </td>
                            <td class="w-1/2">
                                <input x-model="address" type="text" class="w-full">
                            </td>
                            <td class="w-1/3">
                                <input x-bind:value='paymentAmount' type="text" class="w-full" readonly disabled>
                            </td>
                            <td class="w-1/5">
                                <button
                                    x-on:click.prevent='handleSend()'
                                    x-bind:disabled='!isConnected || !isReady()'
                                >
                                    Send
                                </button>

                                <span x-text='transactionHash'></span>
                            </td>
                        </tr>
                    <?php endfor; ?>
                </tbody>

                <tfoot>
                    <tr>
                        <td colspan='4'>
                            <h2>Remaining Balance: <span x-text='remainingBalance / 1000000'></span> ADA</h2>
                            <p class='text-sm italic'>
                                <span x-text='remainingBalance'></span> Lovelace
                            </p>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </form>
    </div>
</main>

<?php

get_footer();
