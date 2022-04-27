export const cardano = window.cardano || {
    enable: async () => null,
    getBalance: async () => '',
    isEnabled: async () => false,
    getUtxos: async () => [],
    getChangeAddress: async () => '',
    getRewardAddress: async () => '',
    getRewardAddresses: async () => [],
    getUnusedAddresses: async () => [],
    getUsedAddresses: async () => [],
    getNetworkId: async () => 0,
    signTx: async (tx) => '',
    submitTx: async (tx) => '',
    onNetworkChange: (networkId) => null,
    onAccountChange: (addresses) => null,
}

export const cardanoPress = window.cardanoPress || {
    ajaxUrl: '',
    _nonce: '',
    logged: '',
}

export const toPropertyName = (string, prefix = '', suffix = '') => prefix + string.charAt(0).toUpperCase() + string.slice(1) + suffix

export const getConnectedExtension = () => localStorage.getItem('_x_connectedExtension') || ''
export const setConnectedExtension = value => localStorage.setItem('_x_connectedExtension', value)
export const isNotified = () => localStorage.getItem('_x_isNotified') || 'false'
export const setNotified = value => localStorage.setItem('_x_isNotified', value)
