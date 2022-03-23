/* global grecaptcha */

import { getConnectedExtension} from './api/config'
import { adaToLovelace, addNotice, getConnectedWallet, removeNotice } from './api/util'
import { getPaymentAddress, handlePayment } from './actions'

window.addEventListener('alpine:init', () => {
    const Alpine = window.Alpine || {}

    Alpine.data('paymentForm', () => ({
        isVerified: false,
        isProcessing: false,
        payAmount: 1,
        quantity: 1,
        currentBalance: 0,
        remainingBalance: 0,
        transactionHash: '',
        showAddress: false,
        paymentAddress: '',

        async init() {
            this.payAmount = parseFloat(this.$root.dataset.amount)

            window.addEventListener('load', async () => {
                if (getConnectedExtension()) {
                    try {
                        const Wallet = await getConnectedWallet()
                        this.currentBalance = parseInt(await Wallet.getBalance())
                        this.remainingBalance = this.currentBalance - parseInt(this.lovelaceValue())
                    } catch (error) {
                        addNotice({ type: 'error', text: error })
                    }
                }
            })

            window.addEventListener('cardanoPress:recaptcha', async (event) => {
                this.isVerified = event.detail

                if (this.isVerified && !this.paymentAddress) {
                    const response = await getPaymentAddress()

                    if (response.success) {
                        this.paymentAddress = response.data
                    }
                }
            }, { once: true })
        },

        isReady(type = 'extension') {
            return !!(('extension' !== type ? this.isVerified : true) && !this.isProcessing)
        },

        lovelaceValue() {
            return adaToLovelace(this.payAmount)
        },

        totalAmount(inAdaValue = true) {
            const amount = this.payAmount * this.quantity

            return inAdaValue ? amount : adaToLovelace(amount)
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
