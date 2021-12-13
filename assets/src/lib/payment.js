import {
    getNetwork,
    getChangeAddress,
    getUtxos,
    signAndSubmit
} from './namiWallet'
import { buildTx, prepareTx } from '../api/wallet'
import { getProtocol, saveWalletTx } from '../api/util'

export const handlePayment = async (lovelaceValue, payee) => {
    const network = await getNetwork()
    const response = await getProtocol(network)

    if (!response.success) {
        return response
    }

    const protocolParameters = response.data
    const utxos = await getUtxos()
    const changeAddress = await getChangeAddress()
    const outputs = await prepareTx(lovelaceValue, payee)
    const transaction = await buildTx(changeAddress, utxos, outputs, protocolParameters)

    try {
        const txHash = await signAndSubmit(transaction)

        return await saveWalletTx(network, changeAddress, txHash)
    } catch (error) {
        return {
            success: false,
            data: error,
        }
    }
}
