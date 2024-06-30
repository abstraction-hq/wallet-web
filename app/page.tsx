"use client";
import React, { useEffect } from "react";
import { useWalletStore } from "@/stores/walletStore";
import { useRouter } from "next/navigation";
import MyAssets from "./my-assets/page";

export default function Home() {
  const loading = useWalletStore((state) => state.loading);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const route = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!wallet) {
      route.push("/sign-up");
    }
  }, [wallet, loading])

  if (loading || !wallet) {
    return <div>Loading...</div>;
  }

  return <MyAssets />;
}
