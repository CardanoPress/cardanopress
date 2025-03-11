import { getAccount, getProtocol } from './actions'
import { getConnectedWallet } from './util'

export const delegation = async (poolId) => {
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
        const responseProtocol = await getProtocol(network)

        if (!responseProtocol.success) {
            return responseProtocol
        }

        const protocolParameters = responseProtocol.data

        const rewardAddress = await Wallet.getRewardAddress()
        const responseAccount = await getAccount(network, rewardAddress)

        if (!responseAccount.success) {
            return responseAccount
        }

        const accountInformation = responseAccount.data

        return {
            success: true,
            data: {
                network,
                transaction: await Wallet.delegateTo(poolId, protocolParameters, accountInformation),
            },
        }
    } catch (error) {
        return {
            success: false,
            data: error,
        }
    }
}
