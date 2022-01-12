import { buildTx, prepareTx } from '../api/wallet'
import { getProtocol, saveWalletTx } from '../api/util'
import Extensions from './extensions'
import Extension from './extension'

export const handlePayment = async (lovelaceValue, payee) => {
    const walletObject = await Extensions.getWallet(localStorage.getItem('_x_connectedWallet'))
    const Wallet = new Extension(walletObject)
    const network = await Wallet.getNetwork()
    const response = await getProtocol(network)

    if (!response.success) {
        return response
    }

    const protocolParameters = response.data
    const utxos = await Wallet.getUtxos()
    const changeAddress = await Wallet.getChangeAddress()
    const outputs = await prepareTx(lovelaceValue, payee)

    try {
        const transaction = await buildTx(changeAddress, utxos, outputs, protocolParameters)
        const txHash = await Wallet.signAndSubmit(transaction)

        return await saveWalletTx(network, changeAddress, txHash)
    } catch (error) {
        return {
            success: false,
            data: error,
        }
    }
}
