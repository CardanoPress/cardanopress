import { addNotice, removeNotice } from './api/util'
import { handleDelegation } from './actions'
import { cardanoPressMessages } from './api/config'

window.addEventListener('alpine:init', () => {
    const Alpine = window.Alpine || {}

    Alpine.data('poolDelegation', () => ({
        isProcessing: false,
        transactionHash: '',

        async handleDelegation() {
            this.transactionHash = ''

            addNotice({
                id: 'delegation',
                type: 'info',
                text: cardanoPressMessages.delegating,
            })

            this.isProcessing = true
            const response = await handleDelegation()

            removeNotice('delegation')

            if (response.success) {
                this.transactionHash = response.data

                addNotice({ type: 'info', text: cardanoPressMessages.delegated })
            } else {
                addNotice({ type: 'warning', text: response.data })
            }

            this.isProcessing = false
        },
    }))
})
