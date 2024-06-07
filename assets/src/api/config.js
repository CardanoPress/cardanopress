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
}

export const toPropertyName = (string, prefix = '', suffix = '') =>
    prefix + string.charAt(0).toUpperCase() + string.slice(1) + suffix

export const getConnectedExtension = () => localStorage.getItem('_x_connectedExtension') || ''
export const setConnectedExtension = (value) => localStorage.setItem('_x_connectedExtension', value)
export const isNotified = () => 'true' === (localStorage.getItem('_x_isNotified') || 'false')
export const setNotified = (value) => localStorage.setItem('_x_isNotified', value)
