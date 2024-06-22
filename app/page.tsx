"use client";
import React, { useState } from "react";
import { client, parsers, utils } from "@passwordless-id/webauthn";
import { Hex, createPublicClient, http, toBytes } from "viem";
import { RegistrationEncoded } from "@passwordless-id/webauthn/dist/esm/types";
import PasskeyAccount from "@/account/passkeyAccount";
import { WebAuthnUtils } from "@/utils/webauthn";
import { CHAINS } from "@/constants/chain";
import { handleUserOp } from "@/utils/bundler";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<Hex>("0x");
  const [passkeyName, setPasskeyName] = useState<string>("");

  const [credentialId, setCredentialId] = useState<string>("");
  const [passkeyAccount, setPasskeyAccount] = useState<PasskeyAccount>(
    new PasskeyAccount("", BigInt(0), BigInt(0))
  );

  const createPassKey = async () => {
    if (passkeyName.length === 0) {
      return;
    }
    const payload = utils.randomChallenge();

    const regData: RegistrationEncoded = await client.register(
      passkeyName,
      payload,
      {
        authenticatorType: "both",
        userVerification: "required",
      }
    );
    const parsedData = parsers.parseRegistration(regData);

    let passkey = await WebAuthnUtils.getPublicKeyFromBytes(
      parsedData.credential.publicKey
    );

    const account = new PasskeyAccount(
      parsedData.credential.id,
      passkey[0] as bigint,
      passkey[1] as bigint
    );

    console.log(      
      parsedData.credential.id,
      passkey[0] as bigint,
      passkey[1] as bigint
    )

    const ethClient = createPublicClient({
      chain: CHAINS["testnet"],
      transport: http()
    })

    const [initWalletOp] = await account.sendTransactionOperation(
      ethClient,
      [
        {
          target: "0x1a663E1d486996c55ac502a6BCfbd6cF836d63d5",
          value: 0n,
          data: "0x",
        },
      ]
    );

    await handleUserOp(initWalletOp);

    setPasskeyAccount(account);
    setWalletAddress(account.getSender());
    setCredentialId(regData.credential.id);
  };
  
  const loginPassKey = async () => {
    const payload = utils.randomChallenge();
    const authData = await client.authenticate([], payload, {
      userVerification: "required",
      authenticatorType: "both",
    });
    const account = new PasskeyAccount(
      authData.credentialId,
      BigInt(0),
      BigInt(0)
    );
    setWalletAddress(account.getSender());
    setCredentialId(authData.credentialId);
  };

  const signWithPasskey = async () => {
    const message =
      "0x74b1fa619a31e12d9a8e8349f0becc1ac1560a5b972db5d025bd27165b30858d";
    const challenge = utils.toBase64url(toBytes(message)).replace(/=/g, "");
    const authData = await client.authenticate([], challenge, {
      userVerification: "required",
      authenticatorType: "both",
    });
    console.log(authData);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <input
          className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
          type="text"
          placeholder="Passkey Name"
          onChange={(e) => setPasskeyName(e.target.value)}
          value={passkeyName}
        />
        <button
          className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
          onClick={createPassKey}
        >
          Init Wallet
        </button>
        <button
          className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
          onClick={loginPassKey}
        >
          Login
        </button>

        <div className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
          Credential Id: {credentialId}
        </div>
        <div className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
          Wallet Address: {walletAddress}
        </div>
        <button
          className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
          onClick={signWithPasskey}
        >
          Send Token
        </button>
      </div>
    </main>
  );
}
