/* global grecaptcha */

import { cardanoPressMessages } from './api/config'
import { addNotice, removeNotice } from './api/util'
import { handlePayment } from './actions'

window.addEventListener('alpine:init', () => {
    const Alpine = window.Alpine || {}

    Alpine.data('splitForm', () => ({
        isProcessing: false,
        percentage: 0,
        address: '',
        transactionHash: '',

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
