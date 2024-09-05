import { saveWalletTx } from './api/actions'
import { cardanoPress } from './api/config'
import { delegation } from './api/delegation'
import { multisend } from './api/multisend'
import { payment } from './api/payment'

export const handleReconnect = async (Wallet) => {
    const network = await Wallet.getNetwork()
    const changeAddress = await Wallet.getChangeAddress()
    const rewardAddress = await Wallet.getRewardAddress()
    const dataSignature = await Wallet.signData(cardanoPressMessages.dataMessage)
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_reconnect_account',
            data_signature: JSON.stringify(dataSignature),
            stake_address: rewardAddress,
            wallet_address: changeAddress,
            query_network: network,
        }),
    }).then((response) => response.json())
}

export const logMeIn = async (Wallet) => {
    const network = await Wallet.getNetwork()
    const changeAddress = await Wallet.getChangeAddress()
    const rewardAddress = await Wallet.getRewardAddress()
    const dataSignature = await Wallet.signData(cardanoPressMessages.dataMessage)
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_user_account',
            data_signature: JSON.stringify(dataSignature),
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

export const handleSave = async ($handle) => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_save_handle',
            ada_handle: $handle,
        }),
    }).then((response) => response.json())
}

export const getPaymentAddress = async () => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_payment_address',
        }),
    }).then((response) => response.json())
}

export const handlePayment = async (lovelaceValue, payee) => {
    const result = await payment(payee, lovelaceValue)

    if (result.success) {
        return await saveWalletTx(result.data.network, 'payment', result.data.transaction)
    }

    return result
}

const getDelegation = async () => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_delegation_data',
        }),
    }).then((response) => response.json())
}

export const handleDelegation = async () => {
    const response = await getDelegation()

    if (!response.success) {
        return response
    }

    const poolId = response.data
    const result = await delegation(poolId)

    if (result.success) {
        return await saveWalletTx(result.data.network, 'delegation', result.data.transaction)
    }

    return result
}

export const handleMultisend = async (outputs) => {
    const result = await multisend(outputs)

    if (result.success) {
        return await saveWalletTx(result.data.network, 'payment', result.data.transaction)
    }

    return result
}
