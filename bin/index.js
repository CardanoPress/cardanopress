const { TextDecoder } = require('text-encoding')
const verifyDataSignature = require('@cardano-foundation/cardano-verify-datasignature')

function main(args) {
    try {
        return verifyDataSignature(...args)
    } catch (error) {
        return false
    }
}
