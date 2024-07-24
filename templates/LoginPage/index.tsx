"use client";
import PasskeyAccount from "@/account/passkeyAccount";
import Login from "@/components/Login";
import { ethClient } from "@/config";
import { IWallet, useWalletStore } from "@/stores/walletStore";
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
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const createWallet = useWalletStore((state) => state.onCreateWallet);
  const [passkeyName, setPasskeyName] = useState("");
  const wallets = useWalletStore((state) => state.wallets);
  const route = useRouter();

  const restoreWithPasskey = async () => {
    const randomString = Math.random().toString(36).substring(2, 15);

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
    

    // TODO: show passkey qr code and wait for pass key is add to wallet

    // createWallet({
    //   id: wallets.length,
    //   name: `Account ${wallets.length}`,
    //   passkeyCredentialId: authData.credentialId,
    //   senderAddress: walletAddress,
    // });
    // route.replace("/");
  };

  return (
    <Login
      title="Abstraction Wallet."
      description="Your gateway to blockchain world."
      image="/images/login-pic-1.png"
    >
      <Field
        className="flex-1 mb-3"
        placeholder="Enter your passkey name"
        value={passkeyName}
        onChange={(e) => setPasskeyName(e.target.value)}
        required
      />

      <button className="btn-primary w-full mb-3" onClick={restoreWithPasskey}>
        Login wallet
      </button>
    </Login>
  );
};

export default LoginPage;
