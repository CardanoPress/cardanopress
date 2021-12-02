import { NETWORK } from './config'
import * as CSL from '@emurgo/cardano-serialization-lib-browser'
import { Buffer } from 'buffer'

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
    window.dispatchEvent(new CustomEvent('truApp:addNotice', { detail }))
}

export const removeNotice = (detail) => {
    window.dispatchEvent(new CustomEvent('truApp:removeNotice', { detail }))
}

export const getNetwork = async (cardano) => {
    const id = await cardano.getNetworkId()

    return NETWORK[id]
}

export const getChangeAddress = async (cardano) => {
    const changeAddress = await cardano.getChangeAddress()

    return CSL.Address.from_bytes(Buffer.from(changeAddress, 'hex')).to_bech32()
}
