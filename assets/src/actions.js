import Extension from './lib/extension'

export const handleReconnect = async (walletObject) => {
    if (undefined === walletObject) {
        return {
            success: false,
            data: 'Wallet extension not available',
        }
    }

    const Wallet = new Extension(walletObject)
    const network = await Wallet.getNetwork()
    const changeAddress = await Wallet.getChangeAddress()
    const rewardAddress = await Wallet.getRewardAddress()
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

export const logMeIn = async (walletObject) => {
    const Wallet = new Extension(walletObject)
    const network = await Wallet.getNetwork()
    const changeAddress = await Wallet.getChangeAddress()
    const rewardAddress = await Wallet.getRewardAddress()
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
