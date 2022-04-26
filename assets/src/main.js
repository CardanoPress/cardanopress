import Alpine from 'alpinejs'
import { handleReconnect, handleSync, logMeIn, logMeOut } from './actions'
import {
    cardanoPress,
    getConnectedExtension,
    isNotified,
    setConnectedExtension,
    setNotified,
} from './api/config'
import {
    toPropertyName,
    browser,
    NETWORK,
    supportedWallets,
} from '@kermage/cardano-wallet-browser-extensions-interface/config'
import { hexToBech32 } from '@kermage/cardano-wallet-browser-extensions-interface/utils'
import { addNotice, getConnectedWallet, removeNotice } from './api/util'
import { delegation as delegationTx } from './api/delegation'
import { payment as paymentTx } from './api/payment'
import Extensions from '@kermage/cardano-wallet-browser-extensions-interface'
import * as actions from './api/actions'
import * as util from './api/util'
import * as utils from '@kermage/cardano-wallet-browser-extensions-interface/utils'
import * as wallet from '@kermage/cardano-wallet-browser-extensions-interface/wallet'
import { CSL as csl } from '@kermage/cardano-wallet-browser-extensions-interface'

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
        return this[toPropertyName(wallet, 'has')]
    },

    isDisabled(wallet = null) {
        return !!(!this.isAvailable || this.isProcessing || (null !== wallet && !this.has(wallet)))
    },

    walletAvailable(type) {
        return this.isAvailable && this.has(type)
    },

    async init() {
        supportedWallets.forEach(wallet => {
            this[toPropertyName(wallet, 'has')] = false
        })

        this.$watch('showModal', () => {
            supportedWallets.forEach(wallet => {
                const method = toPropertyName(wallet, 'has')
                this[method] = browser[method]()
            })
        })

        if (cardanoPress.logged) {
            this.connectedExtension = getConnectedExtension()
            this.isConnected = !!this.connectedExtension
            window.cardanoPress.extension = this.connectedExtension

            if (this.isConnected && !isNotified()) {
                addNotice({ type: 'success', text: 'Successfully connected' })
                setNotified(true)
            }
        } else {
            isNotified() && setNotified(false)
            getConnectedExtension() && setConnectedExtension('')
        }

        if (this.isAvailable && 'Nami' === this.connectedExtension) {
            const wallet = await getConnectedWallet()

            wallet.cardano.experimental.on('networkChange', (networkId) => this.handleLogout(networkId, 0))
            wallet.cardano.experimental.on('accountChange', (addresses) => this.handleLogout(-1, addresses))
        }
    },

    async walletConnect(type) {
        if (this.isConnected) {
            await this.handleReconnect(type)
        } else {
            await this.handleConnect(type)
        }
    },

    async handleConnect(type) {
        this.isProcessing = true

        try {
            const wallet = await Extensions.getWallet(type)

            addNotice({
                id: 'loginConnect',
                type: 'info',
                text: 'Connecting...',
            })
            await this.handleLogin(wallet)
        } catch (error) {
            addNotice({ type: 'error', text: error })
        }

        this.isProcessing = false
    },

    async handleLogin(wallet) {
        const response = await logMeIn(wallet)

        if (response.success) {
            removeNotice('loginConnect')
            addNotice({ type: 'success', text: response.data.message })
            setConnectedExtension(wallet.type)

            if (response.data.reload) {
                return setTimeout(() => {
                    window.location.reload()
                }, 500)
            }

            setNotified(true)

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

        try {
            const Wallet = await getConnectedWallet()
            const network = 0 <= id ? NETWORK[id] : await Wallet.getNetwork()
            const address = 0 !== addresses ? hexToBech32(addresses[0]) : await Wallet.getChangeAddress()
            const response = await logMeOut(network, address)

            if (response.success) {
                addNotice({ type: 'success', text: response.data.message })

                if (response.data.reload) {
                    setNotified(false)
                    setConnectedExtension('')

                    return setTimeout(() => {
                        window.location.reload()
                    }, 500)
                }
            } else {
                addNotice({ type: 'error', text: response.data.message })
            }
        } catch (error) {
            addNotice({ type: 'error', text: error })
        }
    },

    async handleReconnect(type) {
        this.isProcessing = true

        try {
            const wallet = await Extensions.getWallet(type)

            addNotice({
                id: 'reconnect',
                type: 'info',
                text: 'Reconnecting...',
            })

            const response = await handleReconnect(wallet)

            removeNotice('reconnect')

            if (response.success) {
                addNotice({ type: 'success', text: 'Wallet reconnected' })
                setConnectedExtension(wallet.type)

                return setTimeout(() => {
                    window.location.reload()
                }, 500)
            } else {
                addNotice({ type: 'error', text: response.data })
            }
        } catch (error) {
            addNotice({ type: 'error', text: error })
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
        ...utils,
    },
    browser: {
        supports: supportedWallets,
        ...browser,
        ...supportedWallets.reduce((a, v) => ({
            ...a,
            [toPropertyName(v, 'get')]: async () => await Extensions.getWallet(v),
        }), {})
    },
    csl,
    extension: '',
    wallet: {
        delegationTx,
        paymentTx,
        ...wallet
    },
}

Alpine.start()
