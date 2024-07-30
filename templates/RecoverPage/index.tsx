"use client";

import { useColorMode } from "@chakra-ui/react";
import Login from "@/components/Login";
import { client } from "@passwordless-id/webauthn";
import { IWallet, useWalletStore } from "@/stores/walletStore";
import { computeWalletAddress } from "@/utils/create2";
import { hashMessage } from "viem";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Field from "@/components/Field";
import { useState } from "react";

const RestorePage = () => {
  const [email, setEmail] = useState("");
  const { colorMode } = useColorMode();
  const createWallet = useWalletStore((state) => state.onCreateWallet);
  const router = useRouter();

  const loginWithPasskey = async () => {
    const payload = "0x0000";
    const authData = await client.authenticate([], payload, {
      userVerification: "required",
      authenticatorType: "both",
    });

    const walletAddress = computeWalletAddress(
      hashMessage(authData.credentialId)
    );

    const walletState: IWallet = {
      id: 0,
      name: "Account 0",
      passkeyCredentialId: authData.credentialId,
      senderAddress: walletAddress,
    };

    createWallet(walletState);
    router.push("/");
  };

  return (
    <Login
      title="Abstraction Wallet."
      description="Your gateway to blockchain world."
      image="/images/login-pic-1.png"
    >
      <Field
        className="flex-1 mb-3"
        label="Your email"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button className="btn-primary w-full mb-3" onClick={loginWithPasskey}>
        Recover with mail
      </button>
    </Login>
  );
};

export default RestorePage;
