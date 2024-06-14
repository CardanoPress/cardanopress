/* global grecaptcha */

import { handleMultisend, handlePayment } from './actions'
import { cardanoPressMessages } from './api/config'
import { addNotice, removeNotice } from './api/util'

window.addEventListener('alpine:init', () => {
    Alpine.data('splitForm', () => ({
        isProcessing: false,
        percentage: 0,
        address: '',
        transactionHash: '',
        outputs: [],

        isReady(type = '') {
            if (!(this.syncedBalance && !this.isProcessing && !this.transactionHash)) {
                return false
            }

            if ('all' === type) {
                return this.isVerified && this.outputs.length
            }

            return this.remainingBalance && this.percentage && this.address
        },

        paymentAmount() {
            return (((this.currentBalance - parseInt(this.lovelaceValue())) * this.percentage) / 100).toFixed()
        },

        addOutput() {
            this.outputs.push({ address: this.address, amount: this.paymentAmount(), percentage: this.percentage })
            this.remainingBalance -= this.paymentAmount()
            this.address = ''
            this.percentage = 0
        },

        removeOutput(index) {
            this.outputs.splice(index, 1)
        },

        async handleSend(type = '') {
            this.transactionHash = ''

            addNotice({
                id: 'payment',
                type: 'info',
                text: cardanoPressMessages.paying,
            })

            this.isProcessing = true

            let response

            if ('all' === type) {
                response = await handleMultisend(this.outputs)
            } else {
                response = await handlePayment(this.paymentAmount(), this.address)
            }

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
