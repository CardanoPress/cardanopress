import { getProtocol } from './actions'
import { getConnectedWallet } from './util'

export const payment = async (address, amount) => {
    let Wallet

    try {
        Wallet = await getConnectedWallet()
    } catch (error) {
        return {
            success: false,
            data: error,
        }
    }

    const network = await Wallet.getNetwork()

    try {
        let protocolParameters = null

        if ('Typhon' !== Wallet.type) {
            const response = await getProtocol(network)

            if (!response.success) {
                return response
            }

            protocolParameters = response.data
        }

        return {
            success: true,
            data: {
                network,
                transaction: await Wallet.payTo(address, amount, protocolParameters),
            },
        }
    } catch (error) {
        return {
            success: false,
            data: error,
        }
    }
}
