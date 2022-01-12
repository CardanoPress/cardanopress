import { browser } from '../api/config'

class Extensions {
    constructor() {
        this.namiObject = undefined;
        this.ccvaultObject = undefined;
    }

    async getNami() {
        if (! browser.hasNami()) {
            throw new Error('Nami extension is not available')
        }

        if (undefined === this.namiObject && (await window.cardano.isEnabled() || await window.cardano.enable())) {
            this.namiObject = window.cardano;
        }

        return this.namiObject;
    }

    async getCcvault() {
        if (! browser.hasCcvault()) {
            throw new Error('ccvault extension is not available')
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

    async getWallet(type) {
        if ('ccvault' === type) {
            return this.getCcvault()
        }

        return this.getNami()
    }
}

export default Extensions
