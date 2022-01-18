import Alpine from 'alpinejs'
import * as CSL from '@emurgo/cardano-serialization-lib-browser'
import { handleReconnect, handleSync, logMeIn, logMeOut } from './actions'
import { NETWORK, cardano, cardanoPress, browser } from './api/config'
import { addNotice, removeNotice, hexToBech32 } from './api/util'
import * as apiMethods from './api/util'
import * as walletTransactions from './api/wallet'
import * as namiHelpers from './lib/namiWallet'
import Extensions from './lib/extensions'
import Extension from './lib/extension'

window.Alpine = Alpine

Alpine.data('cardanoPress', () => ({
    isAvailable: undefined !== window.cardano && undefined !== window.cardanoPress,
    isConnected: cardanoPress.logged,
    isProcessing: false,
    showModal: false,
    openDropdown: false,
    hasNami: false,
    hasCcvault: false,
    connectedWallet: '',

    isDisabled() {
        return !!(!this.isAvailable || this.isProcessing)
    },

    async init() {
        this.$watch('showModal', () => {
            this.hasNami = browser.hasNami()
            this.hasCcvault = browser.hasCcvault()
        })

        if (this.isAvailable) {
            cardano.onNetworkChange((networkId) => this.handleLogout(networkId, 0))
            cardano.onAccountChange((addresses) => this.handleLogout(-1, addresses))
        }

        if (this.isConnected && !localStorage.getItem('_x_isNotified')) {
            addNotice({ type: 'success', text: 'Successfully connected' })
            localStorage.setItem('_x_isNotified', 'true')
        } else if (!this.isConnected) {
            localStorage.getItem('_x_isNotified') && localStorage.removeItem('_x_isNotified')
            localStorage.getItem('_x_connectedWallet') && localStorage.removeItem('_x_connectedWallet')
        }

        this.connectedWallet = localStorage.getItem('_x_connectedWallet')
    },

    async handleConnect(type) {
        this.isProcessing = true
        const wallet = await Extensions.getWallet(type)

        if (undefined !== wallet) {
            addNotice({
                id: 'loginConnect',
                type: 'info',
                text: 'Connecting...',
            })
            await this.handleLogin(wallet)
        }

        this.isProcessing = false
    },

    async handleLogin(wallet) {
        const response = await logMeIn(wallet)

        if (response.success) {
            removeNotice('loginConnect')
            addNotice({ type: 'success', text: response.data.message })
            localStorage.setItem('_x_connectedWallet', wallet.type)

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

    async handleLogout(id, addresses) {
        if (!this.isConnected) {
            return
        }

        const walletObject = await Extensions.getWallet(localStorage.getItem('_x_connectedWallet'))
        const Wallet = new Extension(walletObject)
        const network = 0 <= id ? NETWORK[id] : await Wallet.getNetwork()
        const address = 0 !== addresses ? hexToBech32(addresses[0]) : await Wallet.getChangeAddress()
        const response = await logMeOut(network, address)

        if (response.success) {
            addNotice({ type: 'success', text: response.data.message })
            localStorage.removeItem('_x_isNotified')
            localStorage.removeItem('_x_connectedWallet')

            if (response.data.reload) {
                return setTimeout(() => {
                    window.location.reload()
                }, 500)
            }
        } else {
            addNotice({ type: 'error', text: response.data.message })
        }
    },

    async handleReconnect(type) {
        const wallet = await Extensions.getWallet(type)

        addNotice({
            id: 'reconnect',
            type: 'info',
            text: 'Reconnecting...',
        })

        this.isProcessing = true
        const response = await handleReconnect(wallet)

        removeNotice('reconnect')

        if (response.success) {
            addNotice({ type: 'success', text: 'Wallet reconnected' })
            localStorage.setItem('_x_connectedWallet', wallet.type)

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
