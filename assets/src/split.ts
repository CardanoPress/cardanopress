import { handleMultisend, handlePayment } from './actions'
import { cardanoPressMessages } from './api/config'
import { addNotice, removeNotice } from './api/util'

interface PaymentData {
    syncedBalance: boolean
    currentBalance: number
    remainingBalance: number
    isVerified: boolean
    lovelaceValue: () => string
}

window.addEventListener('alpine:init', () => {
    window.Alpine.data('splitForm', () => ({
        isProcessing: false,
        percentage: 0,
        address: '',
        transactionHash: '',
        outputs: [] as { address: string; amount: string; percentage: number }[],

        get parent(): PaymentData {
            return this as unknown as PaymentData
        },

        isReady(type = ''): boolean {
            if (!(this.parent.syncedBalance && !this.isProcessing && !this.transactionHash)) {
                return false
            }

            if ('all' === type) {
                return this.parent.isVerified && !!this.outputs.length
            }

            return !!this.parent.remainingBalance && !!this.percentage && !!this.address
        },

        paymentAmount() {
            return (
                ((this.parent.currentBalance - parseInt(this.parent.lovelaceValue())) * this.percentage) /
                100
            ).toFixed()
        },

        addOutput() {
            this.outputs.push({ address: this.address, amount: this.paymentAmount(), percentage: this.percentage })
            this.parent.remainingBalance -= parseInt(this.paymentAmount())
            this.address = ''
            this.percentage = 0
        },

        removeOutput(index: number) {
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
