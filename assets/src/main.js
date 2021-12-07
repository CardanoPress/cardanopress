import Alpine from 'alpinejs'
import * as CSL from '@emurgo/cardano-serialization-lib-browser'
import { handleReconnect, handleSync, logMeIn, logMeOut } from './actions'
import { NETWORK, cardano, cardanoPress } from './api/config'
import { addNotice, removeNotice } from './api/util'
import * as apiMethods from './api/util'
import * as walletTransactions from './api/wallet'
import * as namiHelpers from './lib/namiWallet'

window.Alpine = Alpine

Alpine.data('cardanoPress', () => ({
    isAvailable: undefined !== window.cardano && undefined !== window.cardanoPress,
    isConnected: cardanoPress.logged,
    isProcessing: false,
    showModal: false,
    openDropdown: false,

    isDisabled() {
        return !!(!this.isAvailable || this.isProcessing)
    },

    async init() {
        if (this.isAvailable) {
            cardano.onNetworkChange((networkId) => this.handleLogout(networkId))
        }

        if (this.isConnected && !localStorage.getItem('_x_isNotified')) {
            addNotice({ type: 'success', text: 'Successfully connected' })
            localStorage.setItem('_x_isNotified', 'true')
        } else if (!this.isConnected && localStorage.getItem('_x_isNotified')) {
            localStorage.removeItem('_x_isNotified')
        }
    },

    async handleConnect() {
        this.isProcessing = true
        let isEnabled = await cardano.isEnabled()

        if (!isEnabled) {
            isEnabled = await cardano.enable()
        }

        if (isEnabled) {
            addNotice({
                id: 'loginConnect',
                type: 'info',
                text: 'Connecting...',
            })
            await this.handleLogin()
        }

        this.isProcessing = false
    },

    async handleLogin() {
        const response = await logMeIn()

        if (response.success) {
            removeNotice('loginConnect')
            addNotice({ type: 'success', text: response.data.message })

            if (response.data.reload) {
                return setTimeout(() => {
                    window.location.reload()
                }, 500)
            }

            this.isConnected = true
            cardanoPress.logged = true
        } else {
            addNotice({ type: 'error', text: response.data.message })
        }
    },

    async handleLogout(id) {
        if (!this.isConnected) {
            return
        }

        const network = NETWORK[id]
        const response = await logMeOut(network)

        if (response.success) {
            addNotice({ type: 'success', text: response.data.message })
            localStorage.removeItem('_x_isNotified')

            if (response.data.reload) {
                return setTimeout(() => {
                    window.location.reload()
                }, 500)
            }
        } else {
            addNotice({ type: 'error', text: response.data.message })
        }
    },

    async handleReconnect() {
        addNotice({
            id: 'reconnect',
            type: 'info',
            text: 'Reconnecting...',
        })

        this.isProcessing = true
        const response = await handleReconnect()

        removeNotice('reconnect')

        if (response.success) {
            addNotice({ type: 'success', text: 'Wallet reconnected' })

            return setTimeout(() => {
                window.location.reload()
            }, 500)
        } else {
            addNotice({ type: 'error', text: response.data })
        }

        this.isProcessing = false
    },

    async handleSync() {
        addNotice({
            id: 'sync',
            type: 'info',
            text: 'Syncing...',
        })

        this.isProcessing = true
        const response = await handleSync()

        removeNotice('sync')

        if (response.success) {
            addNotice({ type: 'success', text: 'Successfully synced' })

            if (response.data) {
                addNotice({ type: 'info', text: 'New assets pulled' })
            }
        } else {
            addNotice({ type: 'error', text: 'Something is wrong' })
        }

        this.isProcessing = false
    },
}))

window.cardanoPress = {
    ...cardanoPress,
    api: apiMethods,
    csl: CSL,
    helpers: namiHelpers,
    wallet: walletTransactions,
}

Alpine.start()
