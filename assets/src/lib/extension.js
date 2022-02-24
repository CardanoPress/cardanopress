import { NETWORK } from '../api/config'
import * as CSL from '@emurgo/cardano-serialization-lib-browser'
import { hexToBech32, hexToBytes } from '../api/util'

class Extension {
    constructor(wallet) {
        this.cardano = wallet
    }

    getNetwork = async () => {
        if ('Yoroi' === this.cardano.type) {
            return NETWORK[1]
        }

        let id = await this.cardano.getNetworkId()

        if ('Typhon' === this.cardano.type) {
            id = id.data
        }

        return NETWORK[id]
    }

    getBalance = async () => {
        if ('Typhon' === this.cardano.type) {
            const response = await this.cardano.getBalance()

            return response.data.ada
        }

        const balance = await this.cardano.getBalance()

        return CSL.Value.from_bytes(hexToBytes(balance)).coin().to_str()
    }

    getChangeAddress = async () => {
        if ('Typhon' === this.cardano.type) {
            const response = await this.cardano.getAddress()

            return response.data
        }

        const changeAddress = await this.cardano.getChangeAddress()

        return hexToBech32(changeAddress)
    }

    getRewardAddress = async () => {
        if ('Typhon' === this.cardano.type) {
            const response = await this.cardano.getRewardAddress()

            return response.data
        }

        const rewardAddress = await this.cardano.getRewardAddresses()

        return hexToBech32(rewardAddress[0])
    }

    getUtxos = async () => {
        if ('Typhon' === this.cardano.type) {
            return []
        }

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
        if ('Typhon' === this.cardano.type) {
            throw 'No implementation from the extension'
        }

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
