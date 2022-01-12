import { buildTx, prepareTx } from '../api/wallet'
import * as CSL from '@emurgo/cardano-serialization-lib-browser'
import { hexToBytes, getDelegation, getProtocol, saveWalletTx } from '../api/util'
import Extensions from './extensions'
import Extension from './extension'

const delegationCertificates = async (stakeKeyHash, accountActive, poolHex) => {
    const certificates = CSL.Certificates.new()

    if (!accountActive) {
        certificates.add(
            CSL.Certificate.new_stake_registration(
                CSL.StakeRegistration.new(
                    CSL.StakeCredential.from_keyhash(
                        CSL.Ed25519KeyHash.from_bytes(
                            hexToBytes(stakeKeyHash)
                        )
                    )
                )
            )
        )
    }

    certificates.add(
        CSL.Certificate.new_stake_delegation(
            CSL.StakeDelegation.new(
                CSL.StakeCredential.from_keyhash(
                    CSL.Ed25519KeyHash.from_bytes(
                        hexToBytes(stakeKeyHash)
                    )
                ),
                CSL.Ed25519KeyHash.from_bytes(
                    hexToBytes(poolHex)
                )
            )
        )
    )

    return certificates
}

export const handleDelegation = async () => {
    const walletObject = await Extensions.getWallet(localStorage.getItem('_x_connectedWallet'))
    const Wallet = new Extension(walletObject)
    const network = await Wallet.getNetwork()
    const responseProtocol = await getProtocol(network)

    if (!responseProtocol.success) {
        return responseProtocol
    }

    const protocolParameters = responseProtocol.data
    const rewardAddress = await Wallet.getRewardAddress()
    const responseDelegation = await getDelegation(network, rewardAddress)

    if (!responseDelegation.success) {
        return responseDelegation
    }

    const delegationDetails = responseDelegation.data
    const utxos = await Wallet.getUtxos()
    const changeAddress = await Wallet.getChangeAddress()
    const outputs = await prepareTx(protocolParameters.keyDeposit, changeAddress)
    const certificates = await delegationCertificates(await Wallet.getStakeKeyHash(), delegationDetails.active, delegationDetails.hex)

    try {
        const transaction = await buildTx(changeAddress, utxos, outputs, protocolParameters, certificates)
        const txHash = await Wallet.signAndSubmit(transaction)

        return await saveWalletTx(network, changeAddress, txHash)
    } catch (error) {
        return {
            success: false,
            data: error,
        }
    }
}
