import { buildTx, prepareTx } from './wallet'
import { getProtocol } from './actions'
import Extension from '../lib/extension'
import { getConnectedWallet } from './config'

export const payment = async (address, amount) => {
    let walletObject

    try {
        walletObject = await getConnectedWallet()
    } catch (error) {
        return {
            success: false,
            data: error,
        }
    }

    const Wallet = new Extension(walletObject)
    const network = await Wallet.getNetwork()

    if ('Typhon' === walletObject.type) {
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
