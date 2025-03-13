import type { ProtocolParameters } from '@pbwebdev/cardano-wallet-browser-extensions-interface/config'
import { cardanoPress } from './config'

type ServerResponse<T> =
    | {
          success: true
          data: T
      }
    | {
          success: false
          data: []
      }

export const getProtocol = async (
    network: string
): Promise<
    ServerResponse<
        ProtocolParameters & {
            minUtxo: string
            priceMem: number
            priceStep: number
            collateralPercentage: number
            maxCollateralInputs: number
        }
    >
> => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_protocol_parameters',
            query_network: network,
        }),
    }).then((response) => response.json())
}

export const getAccount = async (
    network: string,
    rewardAddress: string
): Promise<
    ServerResponse<{
        active: boolean
    }>
> => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_account_details',
            query_network: network,
            reward_address: rewardAddress,
        }),
    }).then((response) => response.json())
}

export const saveWalletTx = async (
    network: string,
    txAction: string,
    txHash: string
): Promise<
    ServerResponse<{
        message: string
        hash: string
    }>
> => {
    return await fetch(cardanoPress.ajaxUrl, {
        method: 'POST',
        body: new URLSearchParams({
            _wpnonce: cardanoPress._nonce,
            action: 'cardanopress_wallet_transaction',
            query_network: network,
            transaction_action: txAction,
            transaction_hash: txHash,
        }),
    }).then((response) => response.json())
}
