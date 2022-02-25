/* global grecaptcha */

import { getConnectedExtension } from './api/config'
import { adaToLovelace, addNotice, removeNotice } from './api/util'
import { handlePayment } from './actions'
import Extensions from './lib/extensions'
import Extension from './lib/extension'

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
            window.addEventListener('load', async () => {
                const connectedExtension = getConnectedExtension()

                if (connectedExtension) {
                    try {
                        const walletObject = await Extensions.getWallet(connectedExtension)
                        const Wallet = new Extension(walletObject)
                        this.remainingBalance = parseInt(await Wallet.getBalance()) - parseInt(this.lovelaceValue(this.$root.dataset.fee))
                    } catch (error) {
                        addNotice({ type: 'error', text: error })
                    }
                }
            })

            window.addEventListener('cardanoPress:recaptcha', async (event) => {
                this.isVerified = event.detail
            })
        },

        isReady() {
            return !!(this.isVerified && !this.isProcessing && this.percentage && this.address)
        },

        lovelaceValue(amount) {
            return adaToLovelace(amount)
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
