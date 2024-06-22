"use client";
import { WebAuthnUtils } from "@/utils/webauthn";
import { client, utils, parsers } from "@passwordless-id/webauthn";
import {
  AuthenticationEncoded,
  RegistrationEncoded,
  RegisterOptions,
  AuthenticateOptions,
} from "@passwordless-id/webauthn/dist/esm/types";
import { encodeAbiParameters, Hex, keccak256, parseAbiParameters, toBytes, toHex } from "viem";

function toHexString(byteArray: Uint8Array): Hex {
  return "0x" + Array.from(byteArray, byte => ('0' + (byte & 0xFF).toString(16)).slice(-2)).join('') as Hex;
}

export default function Home() {
  const register = (
    challenge: string,
    name?: string,
    options?: RegisterOptions
  ): Promise<RegistrationEncoded> => {
    return client.register(
      name ? name : utils.randomChallenge(),
      challenge,
      options
    );
  };

  const authenticate = (
    challenge: string,
    keyid?: string[] | undefined,
    options?: AuthenticateOptions
  ): Promise<AuthenticationEncoded> => {
    return client.authenticate(keyid ? keyid : [], challenge, options);
  };

  const createPassKey = async () => {
    const payload = utils.randomChallenge();
    const name = "imduchuyyy3";

    const regData = await register(payload, name, {
      authenticatorType: "both",
      userVerification: "required",
    });
    const parsedData = parsers.parseRegistration(regData);

    let passkey = await WebAuthnUtils.getPublicKeyFromBytes(
      parsedData.credential.publicKey
    );

    console.log(passkey);
  };

  const signWithPasskey = async () => {
    const message = "0x74b1fa619a31e12d9a8e8349f0becc1ac1560a5b972db5d025bd27165b30858d";
    const challenge = utils.toBase64url(toBytes(message)).replace(/=/g, "");
    const authData = await authenticate(
      challenge,
      [],
      { userVerification: "required", authenticatorType: "both" }
    );
    console.log(authData)
    const sig = WebAuthnUtils.getMessageSignature(authData.signature);
    const clientDataJSON = new TextDecoder().decode(
      utils.parseBase64url(authData.clientData)
    );
    const authenticatorData = new Uint8Array(
      utils.parseBase64url(authData.authenticatorData)
    );
    const res = {
      r: sig[0],
      s: sig[1],
      clientDataJSON,
      authData: authenticatorData,
    };
    let encodedSig = encodeAbiParameters(parseAbiParameters('bytes, string, uint256, uint256, uint256, uint256'), [
      toHex(res.authData),
      res.clientDataJSON,
      23n,
      1n,
      res.r as bigint,
      res.s as bigint,
    ])

    console.log([
      toHex(res.authData),
      res.clientDataJSON,
      23n,
      1n,
      res.r as bigint,
      res.s as bigint,
    ])

    console.log(encodedSig);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <button
          className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
          onClick={createPassKey}
        >
          Create Passkey
        </button>
        <button
          className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
          onClick={signWithPasskey}
        >
          Sign with Passkey
        </button>
      </div>
    </main>
  );
}
