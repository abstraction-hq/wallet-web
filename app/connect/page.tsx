"use client";
import { useWalletStore } from "@/stores/walletStore";
import type { NextPage } from "next";
import React, { useEffect } from "react";

const Connect: NextPage = () => {
  const loading = useWalletStore((state) => state.loading);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);

  useEffect(() => {
    window.addEventListener("message", (event) => {
      if (event.origin !== window.opener.origin) return;
    });
  }, []);

  useEffect(() => {
    window.opener.postMessage({ type: "connect", message: "PopupLoaded" }, "*");
  }, [loading, wallet]);

  const onConfirm = () => {
    window.opener.postMessage({ type: "connect", message: {
      walletAddress: wallet.senderAddress,
    } }, "*");
    window.close();
  };

  const onReject = () => {
    window.opener.postMessage({ type: "connect", message: "Reject" }, "*");
  };

  return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="card-sidebar">
          <div className="mb-3 text-title-1s md:mb-4 md:text-[1.125rem] text-center flex justify-center items-center">
            Connect to {window.opener.origin}
          </div>
          <div className="flex justify-center w-full mt-6">
            <button onClick={onConfirm} className="btn-secondary mr-2 w-1/2 px-4">
              Yes
            </button>
            <button onClick={onReject} className="btn-gray w-1/2 px-4">
              No
            </button>
          </div>
        </div>
      </div>
  );
};

export default Connect;
