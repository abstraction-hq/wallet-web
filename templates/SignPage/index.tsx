"use client";
import PasskeyAccount from "@/account/passkeyAccount";
import { useWalletStore } from "@/stores/walletStore";
import { handleUserOp } from "@/utils/bundler";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createPublicClient, http, zeroAddress } from "viem";
import ContractInteraction from "./ContractInteraction";
import SignMessage from "./SignMessage";
import Image from "next/image";
import { Icon } from "@chakra-ui/react";
import { Communicator } from "@abstraction-hq/wallet-sdk";
import { MethodCategory, signMethods } from "@/constants/sign";
import { ethClient } from "@/config";
import Loading from "@/components/Loading";

function determineMethodCategory(method: string): MethodCategory | undefined {
  for (const c in signMethods) {
    const category = c as MethodCategory;
    if ((signMethods[category] as readonly string[]).includes(method)) {
      return category;
    }
  }
  return undefined;
}

const SignPage = () => {
  const walletLoading = useWalletStore((state) => state.loading);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const [messageId, setMessageId] = useState<string>("");
  const [signData, setSignData] = useState<any>(null);
  const searchParams = useSearchParams();
  const communicator = new Communicator(window.opener, "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    communicator.onPopupLoaded(searchParams.get("id") || "");
  }, [walletLoading, wallet]);

  useEffect(() => {
    communicator.listenRequestMessage((message) => {
      console.log("message", message);
      setMessageId(message.id);
      setSignData({
        method: determineMethodCategory(message.payload.method),
        params: message.payload.params,
        dappInfo: message.payload.dappInfo,
      });
    });
  });

  const onConfirm = async () => {
    setLoading(true);
    try {
      if (!wallet) window.close();
      const account = new PasskeyAccount(
        wallet.passkeyCredentialId || "",
        0n,
        0n
      );

      const [userOp, userOpHash] = await account.sendTransactionOperation(ethClient, [
        {
          target: signData?.params[0].to || zeroAddress,
          value: signData?.params[0].value || 0n,
          data: signData?.params[0].data || "0x",
        },
      ]);

      const txHash = await handleUserOp(userOp, userOpHash);
      communicator.sendResponseMessage(messageId, txHash);
    } catch (error) {
      console.error(error);
    }
    window.close();
  };

  const onReject = () => {
    communicator.sendResponseMessage(messageId, "rejected");
    window.close();
  };

  if (walletLoading || !wallet) {
    return <Loading />;
  }

  // if (!signData) {
  //     return (
  //         <div className="flex justify-center items-center min-h-screen">
  //             <div className="card-sidebar">
  //                 <div className="mb-3 text-title-1s md:mb-4 md:text-[1.125rem] text-center flex justify-center items-center">
  //                     Loading...
  //                 </div>
  //             </div>
  //         </div>
  //     )
  // }

  return (
    <>
      {signData?.method == "signMessage" ? (
        <SignMessage
          loading={loading}
          signData={signData}
          onConfirm={onConfirm}
          onReject={onReject}
        />
      ) : (
        <ContractInteraction
          loading={loading}
          signData={signData}
          onConfirm={onConfirm}
          onReject={onReject}
        />
      )}
    </>
  );
};
export default SignPage;
