import { handleReconnect, handleSave, handleSync, logMeIn, logMeOut } from './actions'
import {
    cardanoPress,
    cardanoPressMessages,
    getConnectedExtension,
    isNotified,
    setConnectedExtension,
    setNotified,
} from './api/config'
import { delegation as delegationTx } from './api/delegation'
import { multisend as multisendTx } from './api/multisend'
import { payment as paymentTx } from './api/payment'
import { addNotice, getConnectedWallet, removeNotice } from './api/util'

import Extensions, { fromVespr } from '@pbwebdev/cardano-wallet-browser-extensions-interface'
import { NETWORK, supportedWallets } from '@pbwebdev/cardano-wallet-browser-extensions-interface/config'
import { CSL as csl } from '@pbwebdev/cardano-wallet-browser-extensions-interface/csl'

import * as utils from '@pbwebdev/cardano-wallet-browser-extensions-interface/utils'
import * as wallet from '@pbwebdev/cardano-wallet-browser-extensions-interface/wallet'
import * as actions from './api/actions'
import * as util from './api/util'

const { hexToBech32 } = utils

window.addEventListener('alpine:init', () => {
    Alpine.data('cardanoPress', () => ({
        isAvailable: undefined !== window.cardano && undefined !== window.cardanoPress,
        isConnected: false,
        isProcessing: false,
        showModal: false,
        openDropdown: false,
        connectedExtension: '',
        selectedHandle: '',
        availableWallets: [],
        supportedWallets,

        has(wallet) {
            return this.availableWallets.includes(wallet)
        },

        isDisabled(wallet = null) {
            return !!(!this.isAvailable || this.isProcessing || (null !== wallet && !this.has(wallet)))
        },

        walletAvailable(type) {
            return this.isAvailable && this.has(type)
        },

        fromVespr(wallet) {
            return this.has(wallet) && fromVespr(wallet)
        },

        getWalletHandle($default) {
            return this.selectedHandle || $default
        },

        refreshWallets() {
            this.availableWallets = supportedWallets.filter((wallet) => Extensions.hasWallet(wallet))
        },

        async init() {
            this.refreshWallets()

            this.$watch('showModal', () => {
                this.refreshWallets()
            })

            this.supportedWallets = supportedWallets.filter((wallet) => this.$root.dataset.wallets.includes(wallet))

            if (cardanoPress.logged) {
                this.connectedExtension = getConnectedExtension()
                this.selectedHandle = this.$root.dataset.handle
                this.isConnected = !!this.connectedExtension

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
})

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
    },
    csl,
    wallet: {
        delegationTx,
        paymentTx,
        multisendTx,
        ...wallet,
    },
}
