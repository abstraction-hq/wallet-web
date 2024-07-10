"use client";

import { useState } from "react";
import { useColorMode } from "@chakra-ui/react";
import Login from "@/components/Login";
import Field from "@/components/Field";
import { client, utils } from "@passwordless-id/webauthn";
import { IWallet, useWalletStore } from "@/stores/walletStore";
import { computeWalletAddress } from "@/utils/create2";
import { hashMessage } from "viem";
import { useRouter } from 'next/navigation'

const SignInPage = () => {
  const { colorMode } = useColorMode();
  const createWallet = useWalletStore((state) => state.onCreateWallet);
  const router = useRouter();

  const loginWithPasskey = async () => {
    const payload = utils.randomChallenge();
    const authData = await client.authenticate([], payload, {
      userVerification: "required",
      authenticatorType: "both",
    });

    const walletAddress = computeWalletAddress(hashMessage(authData.credentialId))
    console.log("Wallet address:", walletAddress);

    const walletState: IWallet = {
      id: 0,
      name: "Account 0",
      passkeyCredentialId: authData.credentialId,
      senderAddress: walletAddress,
    }

    console.log(walletState)

    createWallet(walletState);
    router.push("/");
  }

  return (
    <Login title="Sign in" image="/images/login-pic-1.png" signIn allowToggle>
      <div className="mb-5 text-base-2">Sign in with Passkey</div>
      <button className="btn-primary w-full mb-3" onClick={loginWithPasskey}>Login with passkey</button>
    </Login>
  );
};

export default SignInPage;
