import { toPropertyName, supportedWallets, browser } from '../api/config'

class Extensions {
    static async getWallet(type) {
        if (! supportedWallets.includes(type)) {
            throw `Not supported wallet "${type}"`
        }

        const method = `has${toPropertyName(type)}`
        const wallet =  type.toLowerCase()
        const object = `${wallet}Object`

        if (! browser[method]()) {
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

                if ('Yoroi' === type) {
                    this[object] = Object.create(this[object])
                }

                this[object].type = type
            } catch {
                this[object] = undefined;
            }
        }

        return Object.freeze(this[object]);
    }
}

export default Extensions
