import { addNotice, removeNotice } from './api/util'
import { handleDelegation } from './lib/delegation'

window.addEventListener('alpine:init', () => {
    const Alpine = window.Alpine || {}

    Alpine.data('truDelegation', () => ({
        isProcessing: false,
        transactionHash: '',

        async handleDelegation() {
            this.transactionHash = ''

            addNotice({
                id: 'delegation',
                type: 'info',
                text: 'Processing...',
            })

            this.isProcessing = true
            const response = await handleDelegation()

            removeNotice('delegation')

            if (response.success) {
                this.transactionHash = response.data

                addNotice({ type: 'info', text: 'Delegation successful' })
            } else {
                addNotice({ type: 'warning', text: response.data })
            }

            this.isProcessing = false
        },
    }))
})
