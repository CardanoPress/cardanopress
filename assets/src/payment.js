/* global grecaptcha */

import { adaToLovelace } from '@pbwebdev/cardano-wallet-browser-extensions-interface/utils'
import { getPaymentAddress, handlePayment } from './actions'
import { cardanoPressMessages } from './api/config'
import { addNotice, getConnectedWallet, removeNotice, waitElement } from './api/util'

window.addEventListener('alpine:init', () => {
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
        syncedBalance: false,

        async init() {
            this.payAmount = parseFloat(this.$root.dataset.amount)
            this.paymentAddress = this.$root.dataset.address || ''
            this.recaptchaKey = this.$root.dataset.recaptcha

            if ('' === this.recaptchaKey && '' === this.paymentAddress) {
                this.isVerified = true

                const response = await getPaymentAddress()

                this.paymentAddress = response.data
            }

            window.addEventListener(
                'cardanoPress:recaptcha',
                async (event) => {
                    this.isVerified = event.detail

                    if (this.isVerified && !this.paymentAddress) {
                        const response = await getPaymentAddress()

                        this.paymentAddress = response.data
                    }
                },
                { once: true }
            )
        },

        isReady(type = 'extension') {
            return !!(('extension' !== type ? this.isVerified : !this.transactionHash) && !this.isProcessing)
        },

        balanceValue(type, inAda = true) {
            const amount = this[type + 'Balance']

            return parseFloat(amount) / (inAda ? 1000000 : 1)
        },

        lovelaceValue() {
            return adaToLovelace(this.payAmount)
        },

        totalAmount(inAdaValue = true) {
            const amount = (this.payAmount * 100 * (this.quantity * 100)) / (100 * 100)

            return inAdaValue ? amount.toFixed(1) : adaToLovelace(amount)
        },

        async syncBalance() {
            addNotice({
                id: 'balance',
                type: 'info',
                text: cardanoPressMessages.walletSyncing,
            })

            this.isProcessing = true

            try {
                const Wallet = await getConnectedWallet()
                this.currentBalance = parseInt(await Wallet.getBalance())
                this.remainingBalance = this.currentBalance - parseInt(this.lovelaceValue())
                this.syncedBalance = true
            } catch (error) {
                addNotice({ type: 'error', text: error })
            }

            removeNotice('balance')

            this.isProcessing = false
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
            const response = await handlePayment(this.totalAmount(false), this.paymentAddress)

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
    const sendVerified = (status) => window.dispatchEvent(new CustomEvent('cardanoPress:recaptcha', { detail: status }))

    window.addEventListener('alpine:init', () => {
        waitElement('#cardanopress-recaptcha').then((element) => {
            grecaptcha.render(element, {
                callback: () => {
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
    })
}
