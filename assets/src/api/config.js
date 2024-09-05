import { fromVespr } from '@pbwebdev/cardano-wallet-browser-extensions-interface'

export const cardanoPress = window.cardanoPress || {
    ajaxUrl: '',
    _nonce: '',
    logged: '',
}

export const cardanoPressMessages = window.cardanoPressMessages || {
    connected: '',
    connecting: '',
    reconnected: '',
    reconnecting: '',
    walletSyncing: '',
    newAssetsPulled: '',
    handleSaving: '',
    delegating: '',
    paying: '',
    clipboardCopy: '',
    dataMessage: '',
}

export const toPropertyName = (string, prefix = '', suffix = '') =>
    prefix + string.charAt(0).toUpperCase() + string.slice(1) + suffix

export const getConnectedExtension = () => {
    const extension = localStorage.getItem('_x_connectedExtension') || ''

    if ('' === extension) {
        return ''
    }

    return `${extension}${fromVespr(extension) ? '(VESPR Compat)' : ''}`
}

export const setConnectedExtension = (value) => localStorage.setItem('_x_connectedExtension', value)
export const isNotified = () => 'true' === (localStorage.getItem('_x_isNotified') || 'false')
export const setNotified = (value) => localStorage.setItem('_x_isNotified', value)
