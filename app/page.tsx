"use client";
import React, { useEffect } from "react";
import { useWalletStore } from "@/stores/walletStore";
import { useRouter } from "next/navigation";
import MyAssets from "./my-assets/page";
import Loading from "@/components/Loading";

export default function Home() {
  const loading = useWalletStore((state) => state.loading);
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const route = useRouter();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!wallet) {
      route.push("/welcome");
      return;
    }
  }, [wallet, loading, route]);

  if (loading || !wallet) {
    return (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
    )
  }

  return <MyAssets />;
}
