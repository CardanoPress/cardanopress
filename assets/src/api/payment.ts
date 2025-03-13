import type Extension from '@pbwebdev/cardano-wallet-browser-extensions-interface/extension'
import { getProtocol } from './actions'
import { getConnectedWallet } from './util'

export const payment = async (address: string, amount: string) => {
    let Wallet: Extension

    try {
        Wallet = await getConnectedWallet()
    } catch (error) {
        return {
            success: false,
            data: error as string,
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
                transaction: await Wallet.payTo(address, amount, protocolParameters),
            },
        }
    } catch (error) {
        return {
            success: false,
            data: error as string,
        }
    }
}
