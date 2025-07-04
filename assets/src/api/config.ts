
export const cardanoPress = window.cardanoPress || {
    ajaxUrl: '',
    _nonce: '',
    logged: '',
}

export const cardanoPressMessages = window.cardanoPressMessages || {
    connected: '',
    connecting: '',
    verifying: '',
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

export const getConnectedExtension = () => localStorage.getItem('_x_connectedExtension') || ''
export const setConnectedExtension = (value: string) => localStorage.setItem('_x_connectedExtension', value)
export const isNotified = () => 'true' === (localStorage.getItem('_x_isNotified') || 'false')
export const setNotified = (value: string) => localStorage.setItem('_x_isNotified', value)
