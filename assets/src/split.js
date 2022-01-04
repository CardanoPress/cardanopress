/* global grecaptcha */

import { addNotice, removeNotice } from './api/util'
import { handlePayment } from './lib/payment'
import { getBalance } from './lib/namiWallet'

window.addEventListener('alpine:init', () => {
    const Alpine = window.Alpine || {}

    Alpine.data('splitForm', () => ({
        isVerified: false,
        isProcessing: false,
        remainingBalance: 0,
        percentage: 0,
        address: '',
        transactionHash: '',

        async init() {
            this.remainingBalance = parseInt(await getBalance()) - parseInt(this.lovelaceValue(this.$root.dataset.fee))

            window.addEventListener('cardanoPress:recaptcha', async (event) => {
                this.isVerified = event.detail
            })
        },

        isReady() {
            return !!(this.isVerified && !this.isProcessing && this.percentage && this.address)
        },

        lovelaceValue(amount) {
            return (parseFloat(amount || '1') * 1000000).toFixed()
        },

        paymentAmount() {
            return (this.remainingBalance * this.percentage / 100).toFixed();
        },

        async handleSend() {
            this.transactionHash = ''

            addNotice({
                id: 'payment',
                type: 'info',
                text: 'Processing...',
            })

            this.isProcessing = true
            const response = await handlePayment(this.paymentAmount(), this.address)

            removeNotice('payment')

            if (response.success) {
                this.transactionHash = response.data

                addNotice({ type: 'info', text: 'Payment successful' })
            } else {
                addNotice({ type: 'warning', text: response.data })
            }

            this.isProcessing = false
        },
    }))
})
