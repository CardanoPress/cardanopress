/* global grecaptcha */

import { cardanoPressMessages, getConnectedExtension } from './api/config'
import { addNotice, getConnectedWallet, removeNotice, waitElement, windowLoader } from './api/util'
import { getPaymentAddress, handlePayment } from './actions'
import { adaToLovelace } from '@pbwebdev/cardano-wallet-browser-extensions-interface/utils'

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
        recaptchaKey: '',

        async init() {
            this.payAmount = parseFloat(this.$root.dataset.amount)
            this.recaptchaKey = this.$root.dataset.recaptcha

            if ('' === this.recaptchaKey) {
                this.isVerified = true

                const response = await getPaymentAddress()

                if (response.success) {
                    this.paymentAddress = response.data
                }
            }

            windowLoader(async () => {
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

        balanceValue(type, inAda = true) {
            const amount = this[type + 'Balance']

            return amount / (inAda ? 1000000 : 1)
        },

        lovelaceValue() {
            return adaToLovelace(this.payAmount)
        },

        totalAmount(inAdaValue = true) {
            const amount = this.payAmount * this.quantity

            return inAdaValue ? amount : adaToLovelace(amount)
        },

        clipboardValue(target) {
            window.navigator.clipboard.writeText(target)
        },

        async handlePayment() {
            this.transactionHash = ''

            addNotice({
                id: 'payment',
                type: 'info',
                text: cardanoPressMessages.paying,
            })

            if (!this.paymentAddress) {
                const { success, data } = await getPaymentAddress()

                if (success) {
                    this.paymentAddress = data
                }
            }

            this.isProcessing = true
            const response = await handlePayment(this.lovelaceValue(), this.paymentAddress)

            removeNotice('payment')

            if (response.success) {
                this.transactionHash = response.data.hash

                addNotice({ type: 'info', text: response.data.message })
            } else {
                addNotice({ type: 'warning', text: response.data })
            }

            this.isProcessing = false
        },
    }))
})

window.cardanoPressRecaptchaCallback = () => {
    const sendVerified = (status) => window.dispatchEvent(new CustomEvent('cardanoPress:recaptcha', { 'detail': status }))

    waitElement('#cardanopress-recaptcha').then((element) => {
        grecaptcha.render(element, {
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
    })
}
