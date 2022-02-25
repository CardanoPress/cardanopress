import { toPropertyName, supportedWallets, browser } from '../api/config'
import Extension from './extension'

class Extensions {
    static async getWallet(type) {
        if (! supportedWallets.includes(type)) {
            throw `Not supported wallet "${type}"`
        }

        const wallet =  type.toLowerCase()
        const object = `${wallet}Object`

        if (! browser[toPropertyName(type, 'has')]) {
            throw `Not available wallet "${type}"`
        }

        if (undefined === this[object]) {
            try {
                const response = await window.cardano[wallet].enable();

                if ('Typhon' === type) {
                    if (response.status === true) {
                        this[object] = await window.cardano[wallet];
                    }
                } else {
                    this[object] = response
                }

                this[object] = new Extension(type, this[object])
            } catch {
                this[object] = undefined;
            }
        }

        return Object.freeze(this[object]);
    }
}

export default Extensions
