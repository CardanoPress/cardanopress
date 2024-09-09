export { TextDecoder } from 'text-encoding'
import verifyDataSignature from '@cardano-foundation/cardano-verify-datasignature'

export function main(args: string[]) {
    try {
        return verifyDataSignature.apply(null, args)
    } catch (error) {
        return false
    }
}
