import { getChangeAddress, getNetwork } from './api/util'

const cardano = window.cardano || {}
const namiPress = window.namiPress || {}

export const handleReconnect = async () => {
    const network = await getNetwork(cardano)
    const changeAddress = await getChangeAddress(cardano)
    const promise = await fetch(namiPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: namiPress._nonce,
            action: 'namipress_reconnect_account',
            wallet_address: changeAddress,
            query_network: network,
        }),
    }).then((response) => response.json())

    return promise
}

export const logMeIn = async () => {
    const changeAddress = await getChangeAddress(cardano)
    const network = await getNetwork(cardano)
    const promise = await fetch(namiPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: namiPress._nonce,
            action: 'namipress_user_account',
            wallet_address: changeAddress,
            query_network: network,
        }),
    }).then((response) => response.json())

    return promise
}

export const logMeOut = async (network) => {
    const promise = await fetch(namiPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: namiPress._nonce,
            action: 'namipress_network_change',
            query_network: network,
        }),
    }).then((response) => response.json())

    return promise
}

export const handleSync = async () => {
    const promise = await fetch(namiPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: namiPress._nonce,
            action: 'namipress_sync_assets',
        }),
    }).then((response) => response.json())

    return promise
}
