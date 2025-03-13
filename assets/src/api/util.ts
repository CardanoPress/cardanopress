import Extensions from '@pbwebdev/cardano-wallet-browser-extensions-interface'
import type Extension from '@pbwebdev/cardano-wallet-browser-extensions-interface/extension'
import { getConnectedExtension } from './config'

export const waitElement = (selector: string) => {
    return new Promise<Element | null>((resolve) => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector))
        }

        const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector))
                observer.disconnect()
            }
        })

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })
    })
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

export type NoticeDetail = {
    id?: string
    type: string
    text: string
}

export const addNotice = (detail: NoticeDetail) => {
    window.dispatchEvent(new CustomEvent('cardanoPress:addNotice', { detail }))
}

export const removeNotice = (detail: string) => {
    window.dispatchEvent(new CustomEvent('cardanoPress:removeNotice', { detail }))
}

export const getConnectedWallet = async (): Promise<Extension> => {
    const connectedExtension = getConnectedExtension()

    if (!connectedExtension) {
        throw `Not connected to a wallet`
    }

    return await Extensions.getWallet(connectedExtension)
}
