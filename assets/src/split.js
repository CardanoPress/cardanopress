/* global grecaptcha */

import { cardanoPressMessages, getConnectedExtension } from './api/config'
import { addNotice, getConnectedWallet, removeNotice } from './api/util'
import { handlePayment } from './actions'
import { adaToLovelace } from '@pbwebdev/cardano-wallet-browser-extensions-interface/utils'

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
                if (getConnectedExtension()) {
                    try {
                        const Wallet = await getConnectedWallet()
                        this.remainingBalance = parseInt(await Wallet.getBalance()) - parseInt(adaToLovelace(this.$root.dataset.fee))
                    } catch (error) {
                        addNotice({ type: 'error', text: error })
                    }
                }
            })

            window.addEventListener('cardanoPress:recaptcha', async (event) => {
                this.isVerified = event.detail
            }, { once: true })
        },

        isReady() {
            return !!(this.isVerified && !this.isProcessing && this.percentage && this.address)
        },

        paymentAmount() {
            return (this.remainingBalance * this.percentage / 100).toFixed();
        },

        async handleSend() {
            this.transactionHash = ''

            addNotice({
                id: 'payment',
                type: 'info',
                text: cardanoPressMessages.paying,
            })

            this.isProcessing = true
            const response = await handlePayment(this.paymentAmount(), this.address)

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
