import Alpine from 'alpinejs'
import { handleReconnect, handleSave, handleSync, logMeIn, logMeOut } from './actions'
import {
    cardanoPress,
    cardanoPressMessages,
    getConnectedExtension,
    isNotified,
    setConnectedExtension,
    setNotified,
    toPropertyName,
} from './api/config'
import {
    NETWORK,
    supportedWallets,
} from '@pbwebdev/cardano-wallet-browser-extensions-interface/config'
import { hexToBech32 } from '@pbwebdev/cardano-wallet-browser-extensions-interface/utils'
import { addNotice, getConnectedWallet, removeNotice, windowLoader } from './api/util'
import { delegation as delegationTx } from './api/delegation'
import { payment as paymentTx } from './api/payment'
import Extensions, { CSL as csl } from '@pbwebdev/cardano-wallet-browser-extensions-interface'
import * as actions from './api/actions'
import * as util from './api/util'
import * as utils from '@pbwebdev/cardano-wallet-browser-extensions-interface/utils'
import * as wallet from '@pbwebdev/cardano-wallet-browser-extensions-interface/wallet'

window.Alpine = Alpine

Alpine.data('cardanoPress', () => ({
    isAvailable: undefined !== window.cardano && undefined !== window.cardanoPress,
    isConnected: false,
    isProcessing: false,
    showModal: false,
    openDropdown: false,
    connectedExtension: '',
    selectedHandle: '',
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

    getWalletHandle($default) {
        return this.selectedHandle || $default
    },

    refreshWallets() {
        supportedWallets.forEach(wallet => {
            this[toPropertyName(wallet, 'has')] = Extensions.hasWallet(wallet)
        })
    },

    async init() {
        this.refreshWallets()

        this.$watch('showModal', () => {
            this.refreshWallets()
        })

        if (cardanoPress.logged) {
            this.connectedExtension = getConnectedExtension()
            this.selectedHandle = this.$root.dataset.handle;
            this.isConnected = !!this.connectedExtension
            window.cardanoPress.extension = this.connectedExtension

            if (this.isConnected && !isNotified()) {
                addNotice({ type: 'success', text: cardanoPressMessages.connected })
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

    clipboardValue(target) {
        removeNotice('clipboardValue')
        window.navigator.clipboard.writeText(target).then(() => {
            addNotice({
                id: 'clipboardValue',
                type: 'info',
                text: cardanoPressMessages.clipboardCopy,
            })
        })
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
                text: cardanoPressMessages.connecting,
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
            addNotice({ type: 'error', text: response.data })
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
                text: cardanoPressMessages.reconnecting,
            })

            const response = await handleReconnect(wallet)

            removeNotice('reconnect')

            if (response.success) {
                addNotice({ type: 'success', text: cardanoPressMessages.reconnected })
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
            text: cardanoPressMessages.walletSyncing,
        })

        this.isProcessing = true
        const response = await handleSync()

        removeNotice('sync')

        if (response.success) {
            addNotice({ type: 'success', text: response.data.message })

            if (response.data.updated) {
                addNotice({ type: 'info', text: cardanoPressMessages.newAssetsPulled })
            }
        } else {
            addNotice({ type: 'error', text: response.data })
        }

        this.isProcessing = false
    },

    async handleSave() {
        addNotice({
            id: 'save',
            type: 'info',
            text: cardanoPressMessages.handleSaving,
        })

        this.isProcessing = true
        const response = await handleSave(this.selectedHandle)

        removeNotice('save')
        addNotice({ type: response.success ? 'success' : 'error', text: response.data })

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
        Extensions,
        supports: supportedWallets,
        isSupported: type => Extensions.isSupported(type),
        ...supportedWallets.reduce((a, v) => ({
            ...a,
            [toPropertyName(v, 'has')]: async () => await Extensions.hasWallet(v),
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

windowLoader(() => Alpine.start())
