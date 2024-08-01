"use client";
import PasskeyAccount from "@/account/passkeyAccount";
import Login from "@/components/Login";
import { ethClient } from "@/config";
import { useWalletStore } from "@/stores/walletStore";
import { getXYCoordinates, WebAuthnUtils } from "@/utils/webauthn";
import Field from "@/components/Field";
import { client, parsers } from "@passwordless-id/webauthn";
import { RegistrationEncoded } from "@passwordless-id/webauthn/dist/esm/types";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { submitUserOp } from "@/utils/bundler";
import { hashMessage } from "viem";
import { computeWalletAddress } from "@/utils/create2";

type SignUpHandleProps = {
  afterCreateWallet?: () => void;
  allowToggle?: boolean;
};

const SignUpHandle = ({
  afterCreateWallet,
  allowToggle,
}: SignUpHandleProps) => {
  const createWallet = useWalletStore((state) => state.onCreateWallet);

  const onCreateWallet = async () => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const salt = hashMessage(randomString);
    const passkeyName = computeWalletAddress(salt);

    const regData: RegistrationEncoded = await client.register(
      passkeyName,
      randomString,
      {
        authenticatorType: "auto",
        userVerification: "required",
      }
    );
    const parsedData = parsers.parseRegistration(regData);

    let passkey = getXYCoordinates(parsedData.credential.publicKey);

    const account = new PasskeyAccount(
      parsedData.credential.id,
      passkey[0] as bigint,
      passkey[1] as bigint,
      salt
    );

    const [userOp, userOpHash] = await account.sendTransactionOperation(
      ethClient,
      [
        {
          target: account.getSender(),
          value: 0n,
          data: "",
        },
      ]
    );
    const userOpReceipt: any = await toast.promise(
      submitUserOp(userOp, true),
      {
        loading: "Wallet creating...",
        success: (data) => (
          <div>
            Transaction Success -{" "}
            <a href={`https://scan.abstraction.world/operation/${data.userOpHash}`} target="_blank">
              Click to view on scan
            </a>
          </div>
        ),
        error: (err) => (
          <div>
            Transaction Fail -{" "}
            <a href={`https://scan.abstraction.world/operation/${err.userOpHash}`} target="_blank">
              Click to view on scan
            </a>
          </div>
        ),
      }
    );

    if (userOpReceipt && userOpReceipt.success) {
      createWallet({
        id: 0,
        name: "Account 0",
        senderAddress: account.getSender(),
        passkeyCredentialId: parsedData.credential.id,
      });

      if (afterCreateWallet) {
        afterCreateWallet();
      }
    }
  };

  return (
    <Login
      title="Abstraction Wallet."
      description="Your gateway to blockchain world."
      image="/images/login-pic-1.png"
      allowToggle={allowToggle}
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

export default SignUpHandle;
