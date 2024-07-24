"use client";
import PasskeyAccount from "@/account/passkeyAccount";
import Login from "@/components/Login";
import { ethClient } from "@/config";
import { IWallet, useWalletStore } from "@/stores/walletStore";
import { getXYCoordinates, WebAuthnUtils } from "@/utils/webauthn";
import Field from "@/components/Field";
import { client, parsers } from "@passwordless-id/webauthn";
import { RegistrationEncoded } from "@passwordless-id/webauthn/dist/esm/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { submitUserOp } from "@/utils/bundler";
import { useRouter } from "next/navigation";

const CreatePage = () => {
  const createWallet = useWalletStore((state) => state.onCreateWallet);
  const [passkeyName, setPasskeyName] = useState("");
  const wallets = useWalletStore((state) => state.wallets);
  const route = useRouter();


  const onCreateWallet = async () => {
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

    const account = new PasskeyAccount(
      parsedData.credential.id,
      passkey[0] as bigint,
      passkey[1] as bigint
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
    const userOpReceipt: any = await toast.promise(submitUserOp(userOp, true), {
      loading: "Wallet creating...",
      success: (data) => (
        <div>
          Transaction Success -{" "}
          <a href={`https://vicscan.xyz/tx/${userOpHash}`} target="_blank">
            Click to view on scan
          </a>
        </div>
      ),
      error: (err) => (
        <div>
          Transaction Fail -{" "}
          <a href={`https://vicscan.xyz/tx/${userOpHash}`} target="_blank">
            Click to view on scan
          </a>
        </div>
      ),
    });

    if (userOpReceipt && userOpReceipt.success) {
      createWallet({
        id: wallets.length,
        name: `Account ${wallets.length}`,
        senderAddress: account.getSender(),
        passkeyCredentialId: parsedData.credential.id,
      });

      route.replace("/");
    }
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

      <button className="btn-primary w-full mb-3" onClick={onCreateWallet}>
        Create wallet
      </button>
    </Login>
  );
};

export default CreatePage;
