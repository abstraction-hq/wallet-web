"use client";
import React, { useState } from "react";
import { client, parsers, utils } from "@passwordless-id/webauthn";
import {
  Address,
  Hex,
  createPublicClient,
  hashMessage,
  http,
  toBytes,
} from "viem";
import { RegistrationEncoded } from "@passwordless-id/webauthn/dist/esm/types";
import PasskeyAccount from "@/account/passkeyAccount";
import { WebAuthnUtils } from "@/utils/webauthn";
import { CHAINS } from "@/constants/chain";
import { handleUserOp } from "@/utils/bundler";
import { computeWalletAddress } from "@/utils/create2";
import HomePage from "@/templates/HomePage";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<Hex>("0x");
  const [passkeyName, setPasskeyName] = useState<string>("");

  const [credentialId, setCredentialId] = useState<string>("");
  const [passkeyAccount, setPasskeyAccount] = useState<PasskeyAccount>(
    new PasskeyAccount("0x", BigInt(0), BigInt(0))
  );

  const [receiver, setReceiver] = useState<Address | null>();
  const [amount, setAmount] = useState<number>();

  const test = async () => {
    const credentialId = "kelQ7h3iXsP3Yf1pEODMUC1p4OI";
    const salt = hashMessage(credentialId);

    console.log(salt);

    const address = computeWalletAddress(salt);
    console.log(address);
  };

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

    const ethClient = createPublicClient({
      chain: CHAINS["testnet"],
      transport: http(),
    });

    console.log(
      parsedData.credential.id,
      passkey[0] as bigint,
      passkey[1] as bigint,
      hashMessage(parsedData.credential.id)
    );

    const account = new PasskeyAccount(
      parsedData.credential.id,
      passkey[0] as bigint,
      passkey[1] as bigint
    );

    const [initWalletOp] = await account.sendTransactionOperation(ethClient, [
      {
        target: account.getSender(),
        value: 0n,
        data: "",
      },
    ]);

    const txHash = await handleUserOp(initWalletOp);
    console.log(txHash);

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
    setPasskeyAccount(account);
    setWalletAddress(account.getSender());
    setCredentialId(authData.credentialId);
  };

  const sendToken = async () => {
    const ethClient = createPublicClient({
      chain: CHAINS["testnet"],
      transport: http(),
    });
    const [initWalletOp] = await passkeyAccount.sendTransactionOperation(
      ethClient,
      [
        {
          target: receiver,
          value: BigInt(amount || 0),
          data: "",
        },
      ]
    );

    await handleUserOp(initWalletOp);
  };

  return <HomePage />;

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-between p-24">
  //     <div className="flex flex-col items-center justify-center p-4">
  //       <div className="mb-4 flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
  //         Wallet Address: {walletAddress}
  //       </div>
  //       <button
  //         className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
  //         onClick={sendToken}
  //       >
  //         Send Token
  //       </button>
  //     </div>
  //     <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
  //       <input
  //         className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
  //         type="text"
  //         placeholder="Passkey Name"
  //         onChange={(e) => setPasskeyName(e.target.value)}
  //         value={passkeyName}
  //       />
  //       <button
  //         className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
  //         onClick={createPassKey}
  //       >
  //         Init Wallet
  //       </button>
  //       <button
  //         className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
  //         onClick={loginPassKey}
  //       >
  //         Login
  //       </button>

  //       <div className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
  //         Credential Id: {credentialId}
  //       </div>
  //       <div className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
  //         Wallet Address: {walletAddress}
  //       </div>
  //       <input
  //         className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
  //         type="text"
  //         placeholder="Receiver"
  //         onChange={(e) => setReceiver(e.target.value as Address)}
  //         value={receiver as string}
  //       />
  //       <input
  //         className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
  //         type="number"
  //         placeholder="Amount"
  //         onChange={(e) => setAmount(Number(e.target.value))}
  //         value={amount}
  //       />
  //       <button
  //         className="flex items-center gap-2 p-4 rounded-lg border border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30"
  //         onClick={sendToken}
  //       >
  //         Send Token
  //       </button>
  //     </div>
  //   </main>
  // );
}
