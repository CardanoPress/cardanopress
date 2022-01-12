import { getNetwork, getChangeAddress, getRewardAddress } from './lib/namiWallet'

export const handleReconnect = async (wallet) => {
    if (undefined === wallet) {
        return {
            success: false,
            data: 'Wallet extension not available',
        }
    }

    const network = await getNetwork(wallet)
    const changeAddress = await getChangeAddress(wallet)
    const rewardAddress = await getRewardAddress(wallet)
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

export const logMeIn = async (wallet) => {
    const network = await getNetwork(wallet)
    const changeAddress = await getChangeAddress(wallet)
    const rewardAddress = await getRewardAddress(wallet)
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

export const logMeOut = async (network, address) => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_user_change',
            query_network: network,
            wallet_address: address,
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
