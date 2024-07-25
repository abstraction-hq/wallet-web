"use client";
import PasskeyAccount from "@/account/passkeyAccount";
import Field from "@/components/Field";
import Login from "@/components/Login";
import { ethClient } from "@/config";
import { useWalletStore } from "@/stores/walletStore";
import { submitUserOp } from "@/utils/bundler";
import { getXYCoordinates } from "@/utils/webauthn";
import { client, parsers } from "@passwordless-id/webauthn";
import { RegistrationEncoded } from "@passwordless-id/webauthn/dist/esm/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Address, hashMessage, zeroAddress } from "viem";
import Passkey from "@/abis/Passkey.json"
import { PASSKEY } from "@/constants";

const WelcomePage = () => {
  const [passkeyName, setPasskeyName] = useState<string>("");
  const createWallet = useWalletStore((state) => state.onCreateWallet);
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

  const onLogin = async () => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const authData = await client.authenticate([], randomString, {
      authenticatorType: "auto",
      userVerification: "required",
    });

    const keyId = hashMessage(authData.credentialId)


    const walletAddress = await ethClient.readContract({
      abi: Passkey.abi,
      address: PASSKEY,
      functionName: "getWallet",
      args: [keyId],
    })

    console.log(walletAddress)

    if (walletAddress && walletAddress != zeroAddress) {
      createWallet({
        id: wallets.length,
        name: `Account ${wallets.length}`,
        senderAddress: walletAddress as Address,
        passkeyCredentialId: authData.credentialId,
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
      <div className="justify-center w-full mt-6 flex md:flex-1">
        <button className="btn-primary  mb-3 mr-2 w-full md:w-1/2" onClick={onCreateWallet}>
          Create new wallet
        </button>
        <button className="btn-secondary mb-3 w-full md:w-1/2" onClick={onLogin}>
          Login with exited wallet
        </button>
      </div>
      <div className="mt-5 text-title-1s text-theme-tertiary md:mt-4 md:text-base-1s">
        Lost your wallet?{" "}
        <Link
          className="text-theme-primary transition-colors hover:text-primary-1"
          href="/recover"
        >
          Recover
        </Link>{" "}
      </div>
    </Login>
  );
};

export default WelcomePage;
