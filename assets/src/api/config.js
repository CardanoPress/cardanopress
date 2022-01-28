export const NETWORK = {
    0: 'testnet',
    1: 'mainnet',
}

export const ERROR = {
    accessDenied: 'Access denied',
    wrongPassword: 'Wrong password',
    txTooBig: 'Transaction too big',
    txNotPossible: 'Transaction not possible (maybe insufficient balance)',
    storeNotEmpty: 'Storage key is already set',
    onlyOneAccount: 'Only one account exist in the wallet',
    fullMempool: 'fullMempool',
}

export const TX = {
    invalid_hereafter: 3600 * 2, //2h from current slot
}

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
}

export const browser = {
    has(type) {
        const method = `has${type.charAt(0).toUpperCase() + type.slice(1)}`

        return this[method]()
    },
    hasNami() {
        return !!window.cardano?.nami;
    },
    hasCcvault() {
        return !!window.cardano?.ccvault;
    },
}
