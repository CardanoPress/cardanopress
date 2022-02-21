import { buildTx, prepareTx } from '../api/wallet'
import { getProtocol, saveWalletTx } from '../api/util'
import Extensions from './extensions'
import Extension from './extension'

export const handlePayment = async (lovelaceValue, payee) => {
    const connectedExtension = localStorage.getItem('_x_connectedExtension')
    const walletObject = await Extensions.getWallet(connectedExtension)
    const Wallet = new Extension(walletObject)
    const network = await Wallet.getNetwork()
    const response = await getProtocol(network)

    if (!response.success) {
        return response
    }

    if ('Typhon' === connectedExtension) {
        try {
            const response = await walletObject.paymentTransaction({
                outputs: [{
                    address: payee,
                    amount: lovelaceValue,
                }],
            })

            if (response.status) {
                return await saveWalletTx(network, await Wallet.getChangeAddress(), response.data.transactionId)
            }

            return {
                success: false,
                data: response.reason,
            }
        } catch (error) {
            return {
                success: false,
                data: error,
            }
        }
    }

    const protocolParameters = response.data
    const utxos = await Wallet.getUtxos()
    const changeAddress = await Wallet.getChangeAddress()

    try {
        const outputs = await prepareTx(lovelaceValue, payee)
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
