import base64url from 'base64url';
import { ECDSASigValue } from '@peculiar/asn1-ecc';
import { AsnParser } from '@peculiar/asn1-schema';

function shouldRemoveLeadingZero(bytes: Uint8Array): boolean {
    return bytes[0] === 0x0 && (bytes[1] & (1 << 7)) !== 0;
}

function uint8ArrayToBigInt(arr: Uint8Array): BigInt {
    const hex = Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
    return BigInt('0x' + hex);
}

export class WebAuthnUtils {
    static async getPublicKeyFromBytes(publicKeyBytes: string): Promise<BigInt[]> {
        const cap = {
            name: 'ECDSA',
            namedCurve: 'P-256',
            hash: 'SHA-256',
        }
        let pkeybytes = base64url.toBuffer(publicKeyBytes);
        let pkey = await crypto.subtle.importKey('spki', pkeybytes, cap, true, ['verify']);
        let jwk = await crypto.subtle.exportKey('jwk', pkey);
        if (jwk.x && jwk.y)
            return [BigInt("0x" + base64url.toBuffer(jwk.x).toString("hex")), BigInt("0x" + base64url.toBuffer(jwk.y).toString("hex"))];
        else
            throw new Error('Invalid public key');
    }

    static getMessageSignature(authResponseSignature: string): BigInt[] {
        // See https://github.dev/MasterKale/SimpleWebAuthn/blob/master/packages/server/src/helpers/iso/isoCrypto/verifyEC2.ts
        // for extraction of the r and s bytes from the raw signature buffer
        const parsedSignature = AsnParser.parse(
            base64url.toBuffer(authResponseSignature),
            ECDSASigValue,
        );

        let rBytes = new Uint8Array(parsedSignature.r);
        let sBytes = new Uint8Array(parsedSignature.s);
    
        if (shouldRemoveLeadingZero(rBytes)) {
            rBytes = rBytes.slice(1);
        }
        
        if (shouldRemoveLeadingZero(sBytes)) {
            sBytes = sBytes.slice(1);
        }
    
        // r and s values
        return [
            uint8ArrayToBigInt(rBytes),
            uint8ArrayToBigInt(sBytes),
            // BigInt(rBytes.toString()),
            // BigInt(sBytes.toString()),
        ];    
    }
}