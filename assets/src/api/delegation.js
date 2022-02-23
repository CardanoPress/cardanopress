import { buildTx, prepareTx } from './wallet'
import { hexToBytes, getProtocol, getAccount, saveWalletTx } from './util'
import Extensions from '../lib/extensions'
import Extension from '../lib/extension'
import * as CSL from '@emurgo/cardano-serialization-lib-browser'

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

export const delegation = async (poolId) => {
    const connectedExtension = localStorage.getItem('_x_connectedExtension')
    const walletObject = await Extensions.getWallet(connectedExtension)
    const Wallet = new Extension(walletObject)
    const network = await Wallet.getNetwork()

    if ('Typhon' === connectedExtension) {
        try {
            const response = await walletObject.delegationTransaction({
                poolId,
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

    const responseProtocol = await getProtocol(network)

    if (!responseProtocol.success) {
        return responseProtocol
    }

    const rewardAddress = await Wallet.getRewardAddress()
    const responseAccount = await getAccount(network, rewardAddress)

    if (!responseAccount.success) {
        return responseAccount
    }

    try {
        const accountDetails = responseAccount.data
        const protocolParameters = responseProtocol.data
        const changeAddress = await Wallet.getChangeAddress()
        const utxos = await Wallet.getUtxos()
        const outputs = await prepareTx(protocolParameters.keyDeposit, changeAddress)
        const stakeKeyHash = await Wallet.getStakeKeyHash()
        const certificates = await delegationCertificates(stakeKeyHash, accountDetails.active, poolId)
        const transaction = await buildTx(changeAddress, utxos, outputs, protocolParameters, certificates)

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
