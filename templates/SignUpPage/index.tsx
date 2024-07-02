"use client";

import { useEffect, useState } from "react";
import { useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import Login from "@/components/Login";
import Field from "@/components/Field";
import { useLocalStore } from "@/stores/testLocalStore";
import { useWalletStore } from "@/stores/walletStore";
import { RegistrationEncoded } from "@passwordless-id/webauthn/dist/esm/types";
import { client, parsers, utils } from "@passwordless-id/webauthn";
import { WebAuthnUtils } from "@/utils/webauthn";
import { createPublicClient, hashMessage, http } from "viem";
import { CHAINS } from "@/constants/chain";
import PasskeyAccount from "@/account/passkeyAccount";
import { handleUserOp } from "@/utils/bundler";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const loading: boolean = useWalletStore((state) => state.loading);
  const createWallet = useWalletStore((state) => state.onCreateWallet);
  const route = useRouter();

  const onCreateWallet = async () => {
    const passkeyName = "passkey";

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
    createWallet({
      id: 0,
      name: "Account 0",
      senderAddress: account.getSender(),
      passkeyCredentialId: parsedData.credential.id,
    })
    console.log("Create wallet tx", txHash);
    route.replace("/");
  }

  return (
    <Login
      title="Abstraction Wallet."
      description="Your gateway to blockchain world."
      image="/images/login-pic-1.png"
    >
      <button className="btn-primary w-full mb-3" onClick={onCreateWallet}>
        Create wallet
      </button>
      <div className="text-caption-1 text-theme-secondary">
        By signing up, you agree to the{" "}
        <Link
          className="text-theme-primary transition-colors hover:text-primary-1"
          href="/"
        >
          Terms of Use
        </Link>
        ,{" "}
        <Link
          className="text-theme-primary transition-colors hover:text-primary-1"
          href="/"
        >
          Privacy Notice
        </Link>
        , and{" "}
        <Link
          className="text-theme-primary transition-colors hover:text-primary-1"
          href="/"
        >
          Cookie Notice
        </Link>
        .
      </div>
    </Login>
  );
};

export default SignUpPage;
