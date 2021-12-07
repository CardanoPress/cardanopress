export const NETWORK = {
    0: 'testnet',
    1: 'mainnet',
}

export const ERROR = {
    accessDenied: 'Access denied',
    wrongPassword: 'Wrong password',
    txTooBig: 'Transaction too big',
    txNotPossible: 'Transaction not possible',
    storeNotEmpty: 'Storage key is already set',
    onlyOneAccount: 'Only one account exist in the wallet',
    fullMempool: 'fullMempool',
}

export const TX = {
    invalid_hereafter: 3600 * 2, //2h from current slot
}

export const cardano = window.cardano || {
    enable: async () => null,
    isEnabled: async () => false,
    getUtxos: async () => [],
    getChangeAddress: async () => '',
    getRewardAddress: async () => '',
    getNetworkId: async () => 0,
    signTx: async (tx) => '',
    submitTx: async (tx) => '',
    onNetworkChange: (tx) => null,
}

export const cardanoPress = window.cardanoPress || {
    ajaxUrl: '',
    _nonce: '',
}
