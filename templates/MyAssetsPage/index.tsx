"use client";

import Layout from "@/components/Layout";
import TotalBalance from "./TotalBalance";
import BestToBuy from "./BestToBuy";
import AllAssets from "./AllAssets";
import Summary from "./Summary";
import Balance from "./Balance";
import { useWalletStore } from "@/stores/walletStore";
import { useEffect, useState } from "react";

const MyAssetsPage = () => {
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const loading = useWalletStore((state) => state.loading);

  useEffect(() => {
    const loadWallet = async () => {
      if (loading) {
        return;
      }
      if (!wallet) {
        console.log("No wallet found, redirecting to /create-wallet");
        return;
      }

    };
    loadWallet()
  }, [wallet, loading]);

  return (
    <Layout title="Wallet">
      <div className="space-y-2">
        <div className="flex lg:block">
          <Balance />
          {/*<BestToBuy />*/}
        </div>
        <div className="flex lg:block">
          <AllAssets />
          {/*<Summary />*/}
        </div>
      </div>
    </Layout>
  );
};

export default MyAssetsPage;
