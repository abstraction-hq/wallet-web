"use client";
import { Communicator } from "@abstraction-hq/wallet-sdk/communicator/communicator";
import { useWalletStore } from "@/stores/walletStore";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SignUpHandle from "../SignUpPage/SignUpHandle";

const ConnectPage: NextPage = () => {
  const loading = useWalletStore((state) => state.loading);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const [dappInfo, setDappInfo] = useState<any>({});
  const [messageId, setMessageId] = useState<string>("");
  const searchParams = useSearchParams();
  const communicator = new Communicator(window.opener);

  useEffect(() => {
    communicator.onPopupLoaded(searchParams.get("id") || "");
  }, [loading, wallet]);

  useEffect(() => {
    communicator.listenRequestMessage((message) => {
      setDappInfo(message.payload.dappInfo);
      setMessageId(message.id);
      console.log("message", message);
    });
  });

  const onConnect = () => {
    communicator.sendResponseMessage(messageId, [wallet.senderAddress]);
    window.close();
  };

  const onReject = () => {
    window.opener.postMessage({ type: "connect", message: "Reject" }, "*");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!wallet) {
    return <SignUpHandle allowToggle={false} />;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Connect</h1>
      <img
        className="w-16 h-16 mb-2"
        src={dappInfo.icon}
        alt={dappInfo.title}
      />
      <h2 className="text-xl font-semibold mb-2">{dappInfo.title}</h2>
      <p className="text-gray-500 mb-4">{dappInfo.hostname}</p>
      <p className="text-lg mb-4">Would you like to connect?</p>
      <div className="flex items-center py-3">
        <div className="flex flex-col w-4/5">
          <div className="flex items-center">
            <div className="text-base-1 text-theme-secondary">
              Selected Wallet
            </div>
          </div>
          <div className="text-base-1s font-medium">
            {wallet.senderAddress}
          </div>
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={onReject}
        >
          Reject
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={onConnect}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default ConnectPage;
