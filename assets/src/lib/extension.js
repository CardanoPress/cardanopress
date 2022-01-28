import { NETWORK } from '../api/config'
import * as CSL from '@emurgo/cardano-serialization-lib-browser'
import { hexToBech32, hexToBytes } from '../api/util'

class Extension {
    constructor(wallet) {
        this.cardano = wallet
    }

    getNetwork = async () => {
        const id = await this.cardano.getNetworkId()

        return NETWORK[id]
    }

    getBalance = async () => {
        const balance = await this.cardano.getBalance()

        return CSL.Value.from_bytes(hexToBytes(balance)).coin().to_str()
    }

    getChangeAddress = async () => {
        const changeAddress = await this.cardano.getChangeAddress()

        return hexToBech32(changeAddress)
    }

    getUsedAddresses = async () => {
        const usedAddresses = await this.cardano.getUsedAddresses()

        return usedAddresses.map((address) => hexToBech32(address))
    }

    getUnusedAddresses = async () => {
        const unusedAddresses = await this.cardano.getUnusedAddresses()

        return unusedAddresses.map((address) => hexToBech32(address))
    }

    getRewardAddress = async () => {
        const rewardAddress = await this.cardano.getRewardAddresses()

        return hexToBech32(rewardAddress[0])
    }

    getUtxos = async () => {
        const rawUtxos = await this.cardano.getUtxos()

        return rawUtxos.map((utxo) => CSL.TransactionUnspentOutput.from_bytes(hexToBytes(utxo)))
    }

    getStakeKeyHash = async () => {
        const rewardAddress = await this.getRewardAddress()

        return CSL.RewardAddress.from_address(
            CSL.Address.from_bech32(rewardAddress)
        ).payment_cred().to_keyhash().to_bytes()
    }

    signAndSubmit = async (transaction) => {
        try {
            const witnesses = await this.cardano.signTx(hexToBytes(transaction.to_bytes()).toString('hex'))
            const signedTx = CSL.Transaction.new(
                transaction.body(),
                CSL.TransactionWitnessSet.from_bytes(hexToBytes(witnesses))
            )

            return await this.cardano.submitTx(hexToBytes(signedTx.to_bytes()).toString('hex'))
        } catch (error) {
            throw error.info
        }
    }
}

export default Extension
