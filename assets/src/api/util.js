import { Address, MultiAsset } from '@emurgo/cardano-serialization-lib-browser'
import { cardanoPress } from './config'
import { Buffer } from 'buffer'

export const hexToBytes = (string) => {
    return Buffer.from(string, 'hex')
}

export const hexToBech32 = (address) => {
    return Address.from_bytes(hexToBytes(address)).to_bech32()
}

export const generateUuid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }

    //Format: 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

export const addNotice = (detail) => {
    window.dispatchEvent(new CustomEvent('cardanoPress:addNotice', { detail }))
}

export const removeNotice = (detail) => {
    window.dispatchEvent(new CustomEvent('cardanoPress:removeNotice', { detail }))
}

/**
 * @param {MultiAsset} multiAsset
 * @returns
 */
export const multiAssetCount = async (multiAsset) => {
    if (!multiAsset) return 0
    let count = 0
    const policies = multiAsset.keys()
    for (let j = 0; j < multiAsset.len(); j++) {
        const policy = policies.get(j)
        const policyAssets = multiAsset.get(policy)
        const assetNames = policyAssets.keys()
        for (let k = 0; k < assetNames.len(); k++) {
            count++
        }
    }
    return count
}

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

export const getDelegation = async (network, rewardAddress) => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_pool_delegation',
            query_network: network,
            reward_address: rewardAddress,
        }),
    }).then((response) => response.json())
}

export const saveWalletTx = async (network, changeAddress, txHash) => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_wallet_transaction',
            query_network: network,
            wallet_address: changeAddress,
            transaction_hash: txHash,
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
