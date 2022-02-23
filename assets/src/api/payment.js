import { buildTx, prepareTx } from './wallet'
import { getProtocol } from './util'
import Extensions from '../lib/extensions'
import Extension from '../lib/extension'

export const payment = async (address, amount) => {
    const connectedExtension = localStorage.getItem('_x_connectedExtension')
    const walletObject = await Extensions.getWallet(connectedExtension)
    const Wallet = new Extension(walletObject)
    const network = await Wallet.getNetwork()

    if ('Typhon' === connectedExtension) {
        try {
            const response = await walletObject.paymentTransaction({
                outputs: [{
                    address,
                    amount,
                }],
            })

            if (response.status) {
                return {
                    success: true,
                    data: {
                        network,
                        transaction: response.data.transactionId,
                    },
                }
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

    const response = await getProtocol(network)

    if (!response.success) {
        return response
    }

    try {
        const changeAddress = await Wallet.getChangeAddress()
        const utxos = await Wallet.getUtxos()
        const outputs = await prepareTx(amount, address)
        const protocolParameters = response.data
        const transaction = await buildTx(changeAddress, utxos, outputs, protocolParameters)

        return {
            success: true,
            data: {
                network,
                transaction: await Wallet.signAndSubmit(transaction),
            },
        }
    } catch (error) {
        return {
            success: false,
            data: error,
        }
    }
}
