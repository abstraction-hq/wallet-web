"use client";
import React, { useState } from "react";
import { client, parsers, utils } from "@passwordless-id/webauthn";
import { Hex, createPublicClient, hashMessage, http, toBytes } from "viem";
import { RegistrationEncoded } from "@passwordless-id/webauthn/dist/esm/types";
import PasskeyAccount from "@/account/passkeyAccount";
import { WebAuthnUtils } from "@/utils/webauthn";
import { CHAINS } from "@/constants/chain";
import { handleUserOp } from "@/utils/bundler";
import { computePasskeyModuleAddress, computeWalletAddress } from "@/utils/create2";
import { WALLET_FACTORY } from "@/constants";
import Factory from "@/abis/Factory.json";

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<Hex>("0x");
  const [passkeyName, setPasskeyName] = useState<string>("");

  const [credentialId, setCredentialId] = useState<string>("");
  const [passkeyAccount, setPasskeyAccount] = useState<PasskeyAccount>(
    new PasskeyAccount("0x", BigInt(0), BigInt(0))
  );

  const test = async () => {
    const ethClient = createPublicClient({
      chain: CHAINS["testnet"],
      transport: http()
    })

    const salt = hashMessage(passkeyName)

    const computeWallet = computeWalletAddress(salt);
    console.log(computeWallet)

    const walletAddress = await ethClient.readContract({
      address: WALLET_FACTORY,
      abi: Factory.abi,
      functionName: "getWalletAddress",
      args: [hashMessage(passkeyName)],
    })
    console.log(walletAddress)

    const account = new PasskeyAccount(
      salt,
      0n,
      0n
    );

    console.log(account.getSender())

    return

  }

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
      transport: http()
    })

    const account = new PasskeyAccount(
      parsedData.credential.id,
      passkey[0] as bigint,
      passkey[1] as bigint
    );

    const [initWalletOp] = await account.sendTransactionOperation(
      ethClient,
      [
        {
          target: "0x49827013c5a9ac04136ba5576b0dd56408daef34",
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
    setPasskeyAccount(account);
    setWalletAddress(account.getSender());
    setCredentialId(authData.credentialId);
  };

  const signWithPasskey = async () => {
    const ethClient = createPublicClient({
      chain: CHAINS["testnet"],
      transport: http()
    })
    const [initWalletOp] = await passkeyAccount.sendTransactionOperation(
      ethClient,
      [
        {
          target: "0x49827013c5a9ac04136ba5576b0dd56408daef34",
          value: 0n,
          data: "0x",
        },
      ]
    );

    await handleUserOp(initWalletOp);
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
