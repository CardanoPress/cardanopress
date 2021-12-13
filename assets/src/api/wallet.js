import { ERROR, TX } from './config'
import * as CSL from '@emurgo/cardano-serialization-lib-browser'
import CoinSelection from '../lib/coinSelection'
import { multiAssetCount } from './util'

export const prepareTx = async (lovelaceValue, paymentAddress) => {
    const outputs = CSL.TransactionOutputs.new()

    outputs.add(
        CSL.TransactionOutput.new(
            CSL.Address.from_bech32(paymentAddress),
            CSL.Value.new(CSL.BigNum.from_str(lovelaceValue))
        )
    )

    return outputs
}

export const buildTx = async (changeAddress, utxos, outputs, protocolParameters, certificates = null) => {
    const totalAssets = await multiAssetCount(outputs.get(0).amount().multiasset())
    CoinSelection.setProtocolParameters(
        protocolParameters.minUtxo,
        protocolParameters.linearFee.minFeeA.toString(),
        protocolParameters.linearFee.minFeeB.toString(),
        protocolParameters.maxTxSize.toString()
    )

    let selection

    try {
        selection = await CoinSelection.randomImprove(utxos, outputs, 20 + totalAssets)
    } catch {
        throw ERROR.txNotPossible
    }

    const inputs = selection.input

    const txBuilder = CSL.TransactionBuilder.new(
        CSL.LinearFee.new(
            CSL.BigNum.from_str(protocolParameters.linearFee.minFeeA.toString()),
            CSL.BigNum.from_str(protocolParameters.linearFee.minFeeB.toString())
        ),
        CSL.BigNum.from_str(protocolParameters.minUtxo),
        CSL.BigNum.from_str(protocolParameters.poolDeposit),
        CSL.BigNum.from_str(protocolParameters.keyDeposit),
        protocolParameters.maxValSize,
        protocolParameters.maxTxSize
    )

    if (certificates) {
        txBuilder.set_certs(certificates)
    }

    for (let i = 0; i < inputs.length; i++) {
        const utxo = inputs[i]
        txBuilder.add_input(utxo.output().address(), utxo.input(), utxo.output().amount())
    }

    txBuilder.add_output(outputs.get(0))

    const change = selection.change
    const changeMultiAssets = change.multiasset()

    // check if change value is too big for single output
    if (changeMultiAssets && change.to_bytes().length * 2 > protocolParameters.maxValSize) {
        const partialChange = CSL.Value.new(CSL.BigNum.from_str('0'))

        const partialMultiAssets = CSL.MultiAsset.new()
        const policies = changeMultiAssets.keys()
        const makeSplit = () => {
            for (let j = 0; j < changeMultiAssets.len(); j++) {
                const policy = policies.get(j)
                const policyAssets = changeMultiAssets.get(policy)
                const assetNames = policyAssets.keys()
                const assets = CSL.Assets.new()
                for (let k = 0; k < assetNames.len(); k++) {
                    const policyAsset = assetNames.get(k)
                    const quantity = policyAssets.get(policyAsset)
                    assets.insert(policyAsset, quantity)
                    //check size
                    const checkMultiAssets = CSL.MultiAsset.from_bytes(partialMultiAssets.to_bytes())
                    checkMultiAssets.insert(policy, assets)
                    const checkValue = CSL.Value.new(CSL.BigNum.from_str('0'))
                    checkValue.set_multiasset(checkMultiAssets)
                    if (checkValue.to_bytes().length * 2 >= protocolParameters.maxValSize) {
                        partialMultiAssets.insert(policy, assets)
                        return
                    }
                }
                partialMultiAssets.insert(policy, assets)
            }
        }
        makeSplit()
        partialChange.set_multiasset(partialMultiAssets)
        const minAda = CSL.min_ada_required(partialChange, CSL.BigNum.from_str(protocolParameters.minUtxo))
        partialChange.set_coin(minAda)

        txBuilder.add_output(CSL.TransactionOutput.new(CSL.Address.from_bech32(changeAddress), partialChange))
    }

    txBuilder.set_ttl(protocolParameters.slot + TX.invalid_hereafter)
    txBuilder.add_change_if_needed(CSL.Address.from_bech32(changeAddress))

    const transaction = CSL.Transaction.new(txBuilder.build(), CSL.TransactionWitnessSet.new())

    const size = transaction.to_bytes().length * 2
    if (size > protocolParameters.maxTxSize) throw ERROR.txTooBig

    return transaction
}
