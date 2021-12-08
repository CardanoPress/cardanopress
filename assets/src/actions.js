import { getNetwork, getChangeAddress, getRewardAddress } from './lib/namiWallet'

export const handleReconnect = async () => {
    const network = await getNetwork()
    const changeAddress = await getChangeAddress()
    const rewardAddress = await getRewardAddress()
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_reconnect_account',
            stake_address: rewardAddress,
            wallet_address: changeAddress,
            query_network: network,
        }),
    }).then((response) => response.json())
}

export const logMeIn = async () => {
    const network = await getNetwork()
    const changeAddress = await getChangeAddress()
    const rewardAddress = await getRewardAddress()
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_user_account',
            stake_address: rewardAddress,
            wallet_address: changeAddress,
            query_network: network,
        }),
    }).then((response) => response.json())
}

export const logMeOut = async (network) => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_network_change',
            query_network: network,
        }),
    }).then((response) => response.json())
}

export const handleSync = async () => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_sync_assets',
        }),
    }).then((response) => response.json())
}
