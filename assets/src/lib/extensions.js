import { toPropertyName, supportedWallets, browser } from '../api/config'
import Extension from './extension'

const getWalletApi = async (namespace) => {
    const response = await window.cardano[namespace].enable();

    if ('typhon' === namespace) {
        if (false === response.status) {
            throw response?.error ?? response.reason
        }

        return await window.cardano[namespace];
    }

    return response
}

class Extensions {
    static async getWallet(type) {
        if (! supportedWallets.includes(type)) {
            throw `Not supported wallet "${type}"`
        }

        const namespace = type.toLowerCase()
        const object = `${namespace}Object`

        if (! browser[toPropertyName(type, 'has')]) {
            throw `Not available wallet "${type}"`
        }

        if (undefined === this[object]) {
            try {
                this[object] = new Extension(type, await getWalletApi(namespace))
            } catch (error) {
                throw typeof error === 'string' ? error : ( error.info || error.message || 'user abort connection' )
            }
        }

        return Object.freeze(this[object]);
    }
}

export default Extensions
