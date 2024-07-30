"use client";
import PasskeyAccount from "@/account/passkeyAccount";
import { useWalletStore } from "@/stores/walletStore";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  encodeFunctionData,
  keccak256,
  PublicClient,
  toHex,
  zeroAddress,
} from "viem";
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
import SignTypeData from "./signTypeData";

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

  useEffect(() => {
    communicator.onPopupLoaded(searchParams.get("id") || "");
  }, [walletLoading, wallet]);

  useEffect(() => {
    communicator.listenRequestMessage(async (message) => {
      setMessageId(message.id);
      setSignData({
        category: determineMethodCategory(message.payload.method),
        method: message.payload.method,
        params: message.payload.params,
        dappInfo: message.payload.dappInfo,
      });
    });
  }, []);

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
  //             value: "0x612DE0A62FAC40000",
  //             data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  //           },
  //           {
  //             to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  //             value: "0x612DE0A62FAC40000",
  //             data: "0xfbadbaf01",
  //           },
  //         ],
  //       },
  //     ],
  //   });
  // }, []);

  // fake data: eth_sendTransaction
  // useEffect(() => {
  //   setSignData({
  //     category: "contractInteraction",
  //     dappInfo: {},
  //     method: "eth_sendTransaction",
  //     params: [
  //       {
  //         to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  //         value: "0x612DE0A62FAC40000",
  //         data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  //       },
  //     ],
  //   });
  // }, []);

  const onConfirm = async (returnValue: any) => {
    communicator.sendResponseMessage(messageId, returnValue);
    window.close();
  };

  const onReject = () => {
    communicator.sendResponseMessage(messageId, "rejected");
    window.close();
  };

  if (walletLoading || !wallet) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loading />
      </div>
    );
  }

  switch (signData?.category) {
    case "signMessage":
      return (
        <SignMessage
          signData={signData}
          onConfirm={onConfirm}
          onReject={onReject}
        />
      );
    case "signTypeData":
      return (
        <SignTypeData 
          signData={signData}
          onConfirm={onConfirm}
          onReject={onReject}
        />
      )
    case "contractInteraction":
      return (
        <ContractInteraction
          signData={signData}
          onConfirm={onConfirm}
          onReject={onReject}
        />
      );
    case "multiCall":
      return (
        <MultiCall
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
