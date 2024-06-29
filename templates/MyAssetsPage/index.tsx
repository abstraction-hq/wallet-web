"use client";

import Layout from "@/components/Layout";
import TotalBalance from "./TotalBalance";
import BestToBuy from "./BestToBuy";
import AllAssets from "./AllAssets";
import Summary from "./Summary";
import Balance from "./Balance";
import { useWalletStore } from "@/stores/walletStore";
import { useEffect, useState } from "react";
import { WalletBalance, fetchWalletBalance } from "@/apis/fetchWalletBalance";

const MyAssetsPage = () => {
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const loading = useWalletStore((state) => state.loading);
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(null);

  useEffect(() => {
    const loadWallet = async () => {
      if (loading) {
        return;
      }
      if (!wallet) {
        console.log("No wallet found, redirecting to /create-wallet");
        return;
      }
      console.log(wallet);

      const balance = await fetchWalletBalance(wallet.senderAddress);
      console.log(balance);
      setWalletBalance(balance);
    };
    loadWallet()
  }, [wallet, loading]);

  return (
    <Layout title="My assets">
      <div className="space-y-2">
        <div className="flex lg:block">
          {walletBalance && <Balance usdValue={walletBalance.usdValue} />}
          {/*<BestToBuy />*/}
        </div>
        <div className="flex lg:block">
          {walletBalance && <AllAssets walletBalance={walletBalance} />}
          {/*<Summary />*/}
        </div>
      </div>
    </Layout>
  );
};

export default MyAssetsPage;
