import { cardanoPress } from './config'
import { Address } from '@emurgo/cardano-serialization-lib-browser'
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

export const getPool = async (network, poolId) => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_pool_details',
            query_network: network,
            reward_address: poolId,
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
