/* global grecaptcha */

import { addNotice, removeNotice, getPaymentAddress } from './api/util'
import { handlePayment } from './lib/payment'
import { getBalance } from './lib/namiWallet'

window.addEventListener('alpine:init', () => {
    const Alpine = window.Alpine || {}

    Alpine.data('paymentForm', () => ({
        isVerified: false,
        isProcessing: false,
        payAmount: 1,
        currentBalance: 0,
        remainingBalance: 0,
        transactionHash: '',
        showAddress: false,
        paymentAddress: '',

        async init() {
            this.payAmount = parseFloat(this.$root.dataset.amount)
            this.currentBalance = parseInt(await getBalance())
            this.remainingBalance = this.currentBalance - parseInt(this.lovelaceValue())

            window.addEventListener('cardanoPress:recaptcha', async (event) => {
                this.isVerified = event.detail

                if (!this.isVerified) {
                    this.showAddress = false
                } else if (!this.paymentAddress) {
                    const response = await getPaymentAddress()

                    if (response.success) {
                        this.paymentAddress = response.data
                    }
                }
            })
        },

        isReady() {
            return !!(this.isVerified && !this.isProcessing)
        },

        lovelaceValue() {
            return (parseFloat(this.payAmount || '1') * 1000000).toFixed()
        },

        async handlePayment() {
            this.transactionHash = ''

            addNotice({
                id: 'payment',
                type: 'info',
                text: 'Processing...',
            })

            this.isProcessing = true
            const response = await handlePayment(this.lovelaceValue(), this.paymentAddress)

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

window.cardanoPressRecaptchaCallback = () => {
    const sendVerified = (status) => window.dispatchEvent(new CustomEvent('cardanoPress:recaptcha', { 'detail': status }))

    grecaptcha.render('cardanopress-recaptcha', {
        'callback': () => {
            sendVerified(true)
        },
        'expired-callback': () => {
            sendVerified(false)
        },
        'error-callback': () => {
            sendVerified(false)
        },
    })
}
