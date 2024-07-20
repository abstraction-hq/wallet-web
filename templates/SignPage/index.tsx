"use client";
import PasskeyAccount from "@/account/passkeyAccount";
import { useWalletStore } from "@/stores/walletStore";
import { handleUserOpWithoutWait } from "@/utils/bundler";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { encodeFunctionData, zeroAddress } from "viem";
import ContractInteraction from "./SendTransaction";
import SignMessage from "./SignMessage";
import { Communicator } from "@abstraction-hq/wallet-sdk";
import { MethodCategory, signMethods } from "@/constants/sign";
import { ethClient } from "@/config";
import Loading from "@/components/Loading";
import { FACTORY } from "@/constants";
import GenericFactory from "@/abis/GenericFactory.json";
import MultiCall from "./MultiCall";
import useAssetStore from "@/stores/assetStore";

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

  // useEffect(() => {
  //   communicator.listenRequestMessage(async (message) => {
  //     setMessageId(message.id);
  //     const account = new PasskeyAccount(
  //       wallet.passkeyCredentialId || "",
  //       0n,
  //       0n
  //     );
  //     setSignData({
  //       method: determineMethodCategory(message.payload.method),
  //       params: {
  //         ...message.payload.params,
  //         salt: message.payload.params[0].salt || keccak256(toHex(await account.getNonce(ethClient as PublicClient)))
  //       },
  //       dappInfo: message.payload.dappInfo,
  //     });
  //   });
  // }, []);

  // fake data: wallet_sendCalls
  // useEffect(() => {
  //   setSignData({
  //     category: "multiCall",
  //     dappInfo: {},
  //     method: "wallet_sendCalls",
  //     params: [
  //       {
  //         version: "1.0",
  //         chainId: "0x01",
  //         from: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  //         calls: [
  //           {
  //             to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  //             value: "0x9184e72a",
  //             data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  //           },
  //           {
  //             to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  //             value: "0x182183",
  //             data: "0xfbadbaf01",
  //           },
  //         ],
  //       },
  //     ],
  //   });
  // }, []);

  // fake data: eth_sendTransaction
  useEffect(() => {
    setSignData({
      category: "contractInteraction",
      dappInfo: {},
      method: "eth_sendTransaction",
      params: [
        {
          to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
          value: "0x612DE0A62FAC40000",
          data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
        },
      ],
    });
  }, []);

  const onConfirm = async (returnValue: any) => {
    communicator.sendResponseMessage(messageId, returnValue);
    window.close();
  };

  const onReject = () => {
    communicator.sendResponseMessage(messageId, "rejected");
    window.close();
  };

  if (walletLoading || !wallet) {
    return <Loading />;
  }

  switch (signData?.category) {
    case "signMessage":
      return (
        <SignMessage
          loading={loading}
          signData={signData}
          onConfirm={onConfirm}
          onReject={onReject}
        />
      );
    case "contractInteraction":
      return (
        <ContractInteraction
          loading={loading}
          signData={signData}
          onConfirm={onConfirm}
          onReject={onReject}
        />
      );
    case "multiCall":
      return (
        <MultiCall
          loading={loading}
          signData={signData}
          onConfirm={onConfirm}
          onReject={onReject}
        />
      );
    default:
      return <Loading />;
  }
};
export default SignPage;
