"use client";
import { WebAuthnUtils } from "@/utils/webauthn";
import { client, utils, parsers } from "@passwordless-id/webauthn";
import { AuthenticationEncoded, RegistrationEncoded, RegisterOptions, AuthenticateOptions } from '@passwordless-id/webauthn/dist/esm/types'

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

  const createPassKey = async () => {
    const payload = utils.randomChallenge();
    const name = "imduchuyyy";

    const regData = await register(payload, name, {
      authenticatorType: "both",
      userVerification: "required",
    });
    const parsedData = parsers.parseRegistration(regData);

    let passkey = await WebAuthnUtils.getPublicKeyFromBytes(
      parsedData.credential.publicKey
    );

    console.log(passkey)
  };

  const signWithPasskey = async () => {
    const message = "hello world";
    const encoder = new TextEncoder();
    const messageBuffer = encoder.encode(message);

    // Generate the challenge based on the message
    const challenge = new Uint8Array(messageBuffer);

    // Get the credential for signing
    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge: challenge,
        timeout: 60000,
        userVerification: "preferred",
        allowCredentials: [],
      },
    });

    console.log(assertion);
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
