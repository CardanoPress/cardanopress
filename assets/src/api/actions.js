import { cardanoPress } from './config'

export const getProtocol = async (network) => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_protocol_parameters',
            query_network: network,
        }),
    }).then((response) => response.json())
}

export const getAccount = async (network, rewardAddress) => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_account_details',
            query_network: network,
            reward_address: rewardAddress,
        }),
    }).then((response) => response.json())
}

export const saveWalletTx = async (network, txAction, txHash) => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_wallet_transaction',
            query_network: network,
            transaction_action: txAction,
            transaction_hash: txHash,
        }),
    }).then((response) => response.json())
}
