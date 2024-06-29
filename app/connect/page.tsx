"use client";
import { useWalletStore } from "@/stores/walletStore";
import type { NextPage } from "next";
import { useEffect } from "react";

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
    <div>
      Connect to {window.opener.origin}
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onReject}>No</button>
    </div>
  );
};

export default Connect;
