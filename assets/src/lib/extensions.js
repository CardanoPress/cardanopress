import { browser } from '../api/config'

class Extensions {
    static namiObject = undefined
    static ccvaultObject = undefined
    static yoroiObject = undefined
    static flintObject = undefined
    static typhonObject = undefined

    static async getNami() {
        if (! browser.hasNami()) {
            return undefined
        }

        if (undefined === this.namiObject) {
            try {
                this.namiObject = await window.cardano.nami.enable();
            } catch {
                this.namiObject = undefined;
            }
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

    static async getYoroi() {
        if (! browser.hasYoroi()) {
            return undefined
        }

        if (undefined === this.yoroiObject) {
            try {
                this.yoroiObject = await window.cardano.yoroi.enable();
            } catch {
                this.yoroiObject = undefined;
            }
        }

        return this.yoroiObject;
    }

    static async getFlint() {
        if (! browser.hasFlint()) {
            return undefined
        }

        if (undefined === this.flintObject) {
            try {
                this.flintObject = await window.cardano.flint.enable();
            } catch {
                this.flintObject = undefined;
            }
        }

        return this.flintObject;
    }

    static async getTyphon() {
        if (! browser.hasTyphon()) {
            return undefined
        }

        if (undefined === this.typhonObject) {
            this.typhonObject = await window.cardano.typhon;
        }

        return this.typhonObject;
    }

    static async getWallet(type) {
        let object

        switch (type) {
            case 'Typhon':
                object = await this.getTyphon()
                break
            case 'Flint':
                object = await this.getFlint()
                break
            case 'Yoroi':
                object = await this.getYoroi()
                break
            case 'ccvault':
                object = await this.getCcvault()
                break
            case 'Nami':
            default:
                object = await this.getNami()
        }

        if (undefined === object) {
            return undefined
        }

        if ('Yoroi' === type) {
            object = Object.create(object)
        }

        object.type = type

        return object
    }
}

export default Extensions
