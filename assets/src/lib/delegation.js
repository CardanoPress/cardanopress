import { getChangeAddress, getNetwork, getRewardAddress, getStakeKeyHash } from '../api/util'
import { buildTx, initTx, prepareTx } from '../api/wallet'
import { Buffer } from 'buffer'
import * as CSL from '@emurgo/cardano-serialization-lib-browser'

const cardano = window.cardano || {}
const cardanoPress = window.cardanoPress || {
    ajaxUrl: '',
    _nonce: '',
}

const initDelegation = async (network, rewardAddress) => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_pool_delegation',
            query_network: network,
            reward_address: rewardAddress,
        }),
    }).then((response) => response.json())
}

const saveWalletTx = async (network, changeAddress, txHash) => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_wallet_transaction',
            query_network: network,
            wallet_address: changeAddress,
            transaction_hash: txHash,
        }),
    }).then((response) => response.json())
}

const delegationCertificates = (accountActive, stakeKeyHash, poolHex) => {
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
    const network = await getNetwork(cardano)
    const responseTx = await initTx(network, cardanoPress)

    if (!responseTx.success) {
        return responseTx
    }

    const protocolParameters = responseTx.data
    const rewardAddress = await getRewardAddress(cardano)
    const responseDelegation = await initDelegation(network, rewardAddress, truOptions)

    if (!responseDelegation.success) {
        return responseDelegation
    }

    const delegationDetails = responseDelegation.data
    const rawUtxos = await cardano.getUtxos()
    const changeAddress = await getChangeAddress(cardano)
    const { utxos, outputs } = await prepareTx(rawUtxos, protocolParameters.keyDeposit, changeAddress)
    const stakeKeyHash = await getStakeKeyHash(cardano)
    const certificates = delegationCertificates(delegationDetails.active, stakeKeyHash, delegationDetails.hex)
    const transaction = await buildTx(changeAddress, utxos, outputs, protocolParameters, certificates)

    let witnesses

    try {
        witnesses = await cardano.signTx(Buffer.from(transaction.to_bytes(), 'hex').toString('hex'))
    } catch (error) {
        return {
            success: false,
            data: error.info,
        }
    }

    const signedTx = CSL.Transaction.new(
        transaction.body(),
        CSL.TransactionWitnessSet.from_bytes(Buffer.from(witnesses, 'hex'))
    )

    let txHash

    try {
        txHash = await cardano.submitTx(Buffer.from(signedTx.to_bytes(), 'hex').toString('hex'))
    } catch (error) {
        return {
            success: false,
            data: error.info,
        }
    }

    return await saveWalletTx(network, changeAddress, txHash)
}
