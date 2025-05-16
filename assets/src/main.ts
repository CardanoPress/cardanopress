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
import { Buffer as buffer } from '@pbwebdev/cardano-wallet-browser-extensions-interface/buffer'
import { supportedWallets } from '@pbwebdev/cardano-wallet-browser-extensions-interface/config'
import { CSL as csl } from '@pbwebdev/cardano-wallet-browser-extensions-interface/csl'
import type Extension from '@pbwebdev/cardano-wallet-browser-extensions-interface/extension'

import * as utils from '@pbwebdev/cardano-wallet-browser-extensions-interface/utils'
import * as wallet from '@pbwebdev/cardano-wallet-browser-extensions-interface/wallet'
import * as actions from './api/actions'
import * as util from './api/util'

window.addEventListener('alpine:init', () => {
    window.Alpine.data('cardanoPress', () => ({
        isAvailable: undefined !== window.cardano && undefined !== window.cardanoPress,
        isConnected: false,
        isProcessing: false,
        showModal: false,
        openDropdown: false,
        connectedExtension: '',
        selectedHandle: '',
        availableWallets: [] as string[],
        supportedWallets: [] as string[],

        has(wallet: string): boolean {
            return this.availableWallets.includes(wallet)
        },

        isDisabled(wallet = null) {
            return !!(!this.isAvailable || this.isProcessing || (null !== wallet && !this.has(wallet)))
        },

        walletAvailable(type: string): boolean {
            return this.isAvailable && this.has(type)
        },

        fromVespr(wallet: string): boolean {
            return this.has(wallet) && fromVespr(wallet)
        },

        getWalletHandle($default: string): string {
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

            const wallets = JSON.parse(this.$root.dataset.wallets || '[]')

            this.supportedWallets = Array.isArray(wallets) && wallets.length > 0 ? wallets.filter((wallet: string) => supportedWallets.includes(wallet)) : [...supportedWallets]

            if (cardanoPress.logged) {
                this.connectedExtension = getConnectedExtension()
                this.selectedHandle = this.$root.dataset.handle || ''
                this.isConnected = !!this.connectedExtension

                if (this.isConnected && !isNotified()) {
                    addNotice({ type: 'success', text: cardanoPressMessages.connected })
                    setNotified('true')
                }
            } else {
                isNotified() && setNotified('false')
                getConnectedExtension() && setConnectedExtension('')
            }
        },

        clipboardValue(target: string) {
            removeNotice('clipboardValue')
            window.navigator.clipboard.writeText(target).then(() => {
                addNotice({
                    id: 'clipboardValue',
                    type: 'info',
                    text: cardanoPressMessages.clipboardCopy,
                })
            })
        },

        async walletConnect(type: string) {
            if (this.isConnected) {
                await this.handleReconnect(type)
            } else {
                await this.handleConnect(type)
            }
        },

        async handleConnect(type: string) {
            this.isProcessing = true

            try {
                addNotice({
                    id: 'loginConnect',
                    type: 'info',
                    text: cardanoPressMessages.connecting,
                })

                const wallet = await Extensions.getWallet(type)

                await this.handleLogin(wallet)
            } catch (error) {
                addNotice({ type: 'error', text: error as string })
            }

            this.isProcessing = false
        },

        async handleLogin(wallet: Extension) {
            const response = await logMeIn(wallet)

            removeNotice('loginConnect')

            if (response.success) {
                addNotice({ type: 'success', text: response.data.message })
                setConnectedExtension(wallet.type)

                if (response.data.reload) {
                    return setTimeout(() => {
                        window.location.reload()
                    }, 500)
                }

                setNotified('true')

                this.showModal = false
                this.isConnected = true
                cardanoPress.logged = 'true'
                this.connectedExtension = wallet.type
            } else {
                addNotice({ type: 'error', text: response.data })
            }
        },

        async handleLogout() {
            if (!this.isConnected) {
                return
            }

            try {
                const Wallet = await getConnectedWallet()
                const network = await Wallet.getNetwork()
                const address = await Wallet.getChangeAddress()
                const response = await logMeOut(network, address)

                if (response.success) {
                    addNotice({ type: 'success', text: response.data.message })

                    if (response.data.reload) {
                        setNotified('false')
                        setConnectedExtension('')

                        return setTimeout(() => {
                            window.location.reload()
                        }, 500)
                    }
                } else {
                    addNotice({ type: 'error', text: response.data })
                }
            } catch (error) {
                addNotice({ type: 'error', text: error as string })
            }
        },

        async handleReconnect(type: string) {
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
                addNotice({ type: 'error', text: error as string })
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
    buffer,
    csl,
    wallet: {
        delegationTx,
        paymentTx,
        multisendTx,
        ...wallet,
    },
}
