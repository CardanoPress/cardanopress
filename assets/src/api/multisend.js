import { getProtocol } from './actions'
import { getConnectedWallet } from './util'

export const multisend = async (outputs) => {
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
        const response = await getProtocol(network)

        if (!response.success) {
            return response
        }

        const protocolParameters = response.data

        return {
            success: true,
            data: {
                network,
                transaction: await Wallet.multiSend(outputs, protocolParameters),
            },
        }
    } catch (error) {
        return {
            success: false,
            data: error,
        }
    }
}
