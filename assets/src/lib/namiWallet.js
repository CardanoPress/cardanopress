import { cardano, NETWORK } from '../api/config'
import * as CSL from '@emurgo/cardano-serialization-lib-browser'
import { Buffer } from 'buffer'

export const getNetwork = async () => {
    const id = await cardano.getNetworkId()

    return NETWORK[id]
}

export const getChangeAddress = async () => {
    const changeAddress = await cardano.getChangeAddress()

    return CSL.Address.from_bytes(Buffer.from(changeAddress, 'hex')).to_bech32()
}

export const getRewardAddress = async () => {
    const rewardAddress = await cardano.getRewardAddress()

    return CSL.RewardAddress.from_address(
        CSL.Address.from_bytes(Buffer.from(rewardAddress, 'hex'))
    ).to_address().to_bech32()
}

export const getUtxos = async () => {
    const rawUtxos = await cardano.getUtxos()

    return rawUtxos.map((utxo) => CSL.TransactionUnspentOutput.from_bytes(Buffer.from(utxo, 'hex')))
}

export const getStakeKeyHash = async () => {
    const rewardAddress = await cardano.getRewardAddress()

    return CSL.RewardAddress.from_address(
        CSL.Address.from_bytes(Buffer.from(rewardAddress, 'hex'))
    ).payment_cred().to_keyhash().to_bytes()
}

export const signAndSubmit = async (transaction) => {
    try {
        const witnesses = await cardano.signTx(Buffer.from(transaction.to_bytes(), 'hex').toString('hex'))
        const signedTx = CSL.Transaction.new(
            transaction.body(),
            CSL.TransactionWitnessSet.from_bytes(Buffer.from(witnesses, 'hex'))
        )

        return await cardano.submitTx(Buffer.from(signedTx.to_bytes(), 'hex').toString('hex'))
    } catch (error) {
        throw error.info
    }
}
