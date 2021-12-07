import { NETWORK } from './config'
import * as CSL from '@emurgo/cardano-serialization-lib-browser'
import { MultiAsset } from '@emurgo/cardano-serialization-lib-browser'
import { Buffer } from 'buffer'

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

export const getNetwork = async (cardano) => {
    const id = await cardano.getNetworkId()

    return NETWORK[id]
}

export const getChangeAddress = async (cardano) => {
    const changeAddress = await cardano.getChangeAddress()

    return CSL.Address.from_bytes(Buffer.from(changeAddress, 'hex')).to_bech32()
}

export const getRewardAddress = async (cardano) => {
    const rewardAddress = await cardano.getRewardAddress()

    return CSL.RewardAddress.from_address(
        CSL.Address.from_bytes(Buffer.from(rewardAddress, 'hex'))
    ).to_address().to_bech32()
}

export const getStakeKeyHash = async (cardano) => {
    const rewardAddress = await cardano.getRewardAddress()

    return CSL.RewardAddress.from_address(
        CSL.Address.from_bytes(Buffer.from(rewardAddress, 'hex'))
    ).payment_cred().to_keyhash().to_bytes()
}

/**
 *
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
