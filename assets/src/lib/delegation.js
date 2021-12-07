import {
    getNetwork,
    getChangeAddress,
    getRewardAddress,
    getUtxos,
    getStakeKeyHash,
    signAndSubmit
} from './namiWallet'
import { buildTx, prepareTx } from '../api/wallet'
import { Buffer } from 'buffer'
import * as CSL from '@emurgo/cardano-serialization-lib-browser'
import { getDelegation, getProtocol, saveWalletTx } from '../api/util'

const delegationCertificates = async (accountActive, poolHex) => {
    const stakeKeyHash = await getStakeKeyHash()
    const certificates = CSL.Certificates.new()

    if (!accountActive) {
        certificates.add(
            CSL.Certificate.new_stake_registration(
                CSL.StakeRegistration.new(
                    CSL.StakeCredential.from_keyhash(
                        CSL.Ed25519KeyHash.from_bytes(
                            Buffer.from(stakeKeyHash, 'hex')
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
                        Buffer.from(stakeKeyHash, 'hex')
                    )
                ),
                CSL.Ed25519KeyHash.from_bytes(
                    Buffer.from(poolHex, 'hex')
                )
            )
        )
    )

    return certificates
}

export const handleDelegation = async () => {
    const network = await getNetwork()
    const responseProtocol = await getProtocol(network)

    if (!responseProtocol.success) {
        return responseProtocol
    }

    const protocolParameters = responseProtocol.data
    const rewardAddress = await getRewardAddress()
    const responseDelegation = await getDelegation(network, rewardAddress)

    if (!responseDelegation.success) {
        return responseDelegation
    }

    const delegationDetails = responseDelegation.data
    const utxos = await getUtxos()
    const changeAddress = await getChangeAddress()
    const outputs = await prepareTx(protocolParameters.keyDeposit, changeAddress)
    const certificates = await delegationCertificates(delegationDetails.active, delegationDetails.hex)
    const transaction = await buildTx(changeAddress, utxos, outputs, protocolParameters, certificates)

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
