import { browser } from '../api/config'

class Extensions {
    static namiObject = undefined
    static ccvaultObject = undefined

    static async getNami() {
        if (! browser.hasNami()) {
            return undefined
        }

        if (undefined === this.namiObject && (await window.cardano.isEnabled() || await window.cardano.enable())) {
            this.namiObject = window.cardano;
        }

        return this.namiObject;
    }

    static async getCcvault() {
        if (! browser.hasCcvault()) {
            return undefined
        }

        if (undefined === this.ccvaultObject) {
            try {
                this.ccvaultObject = await window.cardano.ccvault.enable();
            } catch {
                this.ccvaultObject = undefined;
            }
        }

        return this.ccvaultObject;
    }

    static async getWallet(type) {
        let object

        switch (type) {
            case 'ccvault':
                object = await this.getCcvault()
                break
            case 'nami':
            default:
                object = await this.getNami()
        }

        if (undefined === object) {
            return undefined
        }

        return { ...object, type }
    }
}

export default Extensions
