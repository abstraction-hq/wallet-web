"use client";
import PasskeyAccount from "@/account/passkeyAccount";
import { useWalletStore } from "@/stores/walletStore";
import { handleUserOp, handleUserOpWithoutWait } from "@/utils/bundler";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  createPublicClient,
  encodeFunctionData,
  http,
  keccak256,
  PublicClient,
  stringToHex,
  toHex,
  zeroAddress,
} from "viem";
import ContractInteraction from "./ContractInteraction";
import SignMessage from "./SignMessage";
import Image from "next/image";
import { Icon } from "@chakra-ui/react";
import { Communicator } from "@abstraction-hq/wallet-sdk";
import { MethodCategory, signMethods } from "@/constants/sign";
import { ethClient } from "@/config";
import Loading from "@/components/Loading";
import { computeNewContractAddress } from "@/utils/create2";
import { FACTORY } from "@/constants";
import GenericFactory from "@/abis/GenericFactory.json"

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
    communicator.listenRequestMessage(async (message) => {
      setMessageId(message.id);
      const account = new PasskeyAccount(
        wallet.passkeyCredentialId || "",
        0n,
        0n
      );
      setSignData({
        method: determineMethodCategory(message.payload.method),
        params: {
          ...message.payload.params,
          salt: message.payload.params[0].salt || keccak256(toHex(await account.getNonce(ethClient as PublicClient)))
        },
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

      let userOp, userOpHash;

      if (!signData?.params[0].to) {
        // create contract
        [userOp, userOpHash] = await account.sendTransactionOperation(
          ethClient,
          [
            {
              target: FACTORY,
              value: signData?.params[0].value || 0n,
              data: encodeFunctionData({
                abi: GenericFactory.abi,
                functionName: "create2",
                args: [signData?.params[0].data, signData.salt]
              }),
            },
          ]
        );
      } else {
        [userOp, userOpHash] = await account.sendTransactionOperation(
          ethClient,
          [
            {
              target: signData?.params[0].to || zeroAddress,
              value: signData?.params[0].value || 0n,
              data: signData?.params[0].data || "0x",
            },
          ]
        );
      }

      const txHash = await handleUserOpWithoutWait(userOp);
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
