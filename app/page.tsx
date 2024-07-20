"use client";
import React, { useEffect } from "react";
import { useWalletStore } from "@/stores/walletStore";
import { useRouter } from "next/navigation";
import MyAssets from "./my-assets/page";
import useAssetStore from "@/stores/assetStore";
import Loading from "@/components/Loading";

export default function Home() {
  const loading = useWalletStore((state) => state.loading);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const fetchWalletBalance = useAssetStore((state) => state.fetchData);
  const route = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!wallet) {
      route.push("/sign-up");
      return;
    }

    if (wallet) {
      fetchWalletBalance(wallet?.senderAddress);
    }
  }, [wallet, loading, fetchWalletBalance, route]);

  if (loading || !wallet) {
    return (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
    )
  }

  return <MyAssets />;
}
