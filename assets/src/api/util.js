import { Address } from '@emurgo/cardano-serialization-lib-browser'
import { Buffer } from 'buffer'
import { getConnectedExtension } from './config'
import Extensions from '../lib/extensions'

export const adaToLovelace = (value) => {
    return (parseFloat(value || '1') * 1000000).toFixed()
}

export const hexToBytes = (string) => {
    return Buffer.from(string, 'hex')
}

export const hexToBech32 = (address) => {
    return Address.from_bytes(hexToBytes(address)).to_bech32()
}

export const generateUuid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }

    //Format: 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

export const addNotice = (detail) => {
    window.dispatchEvent(new CustomEvent('cardanoPress:addNotice', { detail }))
}

export const removeNotice = (detail) => {
    window.dispatchEvent(new CustomEvent('cardanoPress:removeNotice', { detail }))
}

export const getConnectedWallet = async () => {
    const connectedExtension = getConnectedExtension()

    if (!connectedExtension) {
        throw `Not connected to a wallet`
    }

    return await Extensions.getWallet(connectedExtension)
}
