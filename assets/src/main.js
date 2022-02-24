import Alpine from 'alpinejs'
import { handleReconnect, handleSync, logMeIn, logMeOut } from './actions'
import { NETWORK, cardanoPress, toPropertyName, supportedWallets, browser } from './api/config'
import { addNotice, removeNotice, hexToBech32 } from './api/util'
import { delegation as delegationTx } from './api/delegation'
import { payment as paymentTx } from './api/payment'
import Extensions from './lib/extensions'
import Extension from './lib/extension'
import * as actions from './api/actions'
import * as util from './api/util'
import * as wallet from './api/wallet'
import * as csl from '@emurgo/cardano-serialization-lib-browser'

window.Alpine = Alpine

Alpine.data('cardanoPress', () => ({
    isAvailable: undefined !== window.cardano && undefined !== window.cardanoPress,
    isConnected: false,
    isProcessing: false,
    showModal: false,
    openDropdown: false,
    connectedExtension: '',
    supportedWallets,

    has(wallet) {
        const method = `has${toPropertyName(wallet)}`

        return this[method]
    },

    isDisabled(wallet = null) {
        return !!(!this.isAvailable || this.isProcessing || (null !== wallet && !this.has(wallet)))
    },

    walletAvailable(type) {
        return this.isAvailable && this.has(type)
    },

    async init() {
        supportedWallets.forEach(wallet => {
            this[`has${toPropertyName(wallet)}`] = false
        })

        this.$watch('showModal', () => {
            supportedWallets.forEach(wallet => {
                const method = `has${toPropertyName(wallet)}`
                this[method] = browser[method]()
            })
        })

        if (cardanoPress.logged) {
            this.connectedExtension = localStorage.getItem('_x_connectedExtension') || ''
            this.isConnected = this.connectedExtension || false
            window.cardanoPress.extension = this.connectedExtension

            if (this.isConnected && !localStorage.getItem('_x_isNotified')) {
                addNotice({ type: 'success', text: 'Successfully connected' })
                localStorage.setItem('_x_isNotified', 'true')
            }
        } else {
            localStorage.getItem('_x_isNotified') && localStorage.removeItem('_x_isNotified')
            localStorage.getItem('_x_connectedExtension') && localStorage.removeItem('_x_connectedExtension')
        }

        if (this.isAvailable && 'Nami' === this.connectedExtension) {
            const wallet = await Extensions.getWallet(this.connectedExtension)

            wallet.experimental.on('networkChange', (networkId) => this.handleLogout(networkId, 0))
            wallet.experimental.on('accountChange', (addresses) => this.handleLogout(-1, addresses))
        }
    },

    async walletConnect(type) {
        if (this.isConnected) {
            this.handleReconnect(type)
        } else {
            this.handleConnect(type)
        }
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
        } else {
            addNotice({ type: 'error', text: 'Unable to connect to wallet' })
        }

        this.isProcessing = false
    },

    async handleLogin(wallet) {
        const response = await logMeIn(wallet)

        if (response.success) {
            removeNotice('loginConnect')
            addNotice({ type: 'success', text: response.data.message })
            localStorage.setItem('_x_connectedExtension', wallet.type)

            if (response.data.reload) {
                return setTimeout(() => {
                    window.location.reload()
                }, 500)
            }

            localStorage.setItem('_x_isNotified', 'true')

            this.showModal = false
            this.isConnected = true
            cardanoPress.logged = true
            this.connectedExtension = wallet.type
            window.cardanoPress.extension = this.connectedExtension
        } else {
            addNotice({ type: 'error', text: response.data.message })
        }
    },

    async handleLogout(id, addresses) {
        if (!this.isConnected) {
            return
        }

        const walletObject = await Extensions.getWallet(localStorage.getItem('_x_connectedExtension'))
        const Wallet = new Extension(walletObject)
        const network = 0 <= id ? NETWORK[id] : await Wallet.getNetwork()
        const address = 0 !== addresses ? hexToBech32(addresses[0]) : await Wallet.getChangeAddress()
        const response = await logMeOut(network, address)

        if (response.success) {
            addNotice({ type: 'success', text: response.data.message })
            localStorage.removeItem('_x_isNotified')
            localStorage.removeItem('_x_connectedExtension')

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
            localStorage.setItem('_x_connectedExtension', wallet.type)

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
    api: {
        ...actions,
        ...util,
    },
    browser,
    csl,
    wallet: {
        delegationTx,
        paymentTx,
        ...wallet
    },
}

Alpine.start()
