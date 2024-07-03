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
import { NFT, fetchNFTBalance } from "@/apis/fetchNFTBalance";

const MyAssetsPage = () => {
  const wallet = useWalletStore((state) => state.wallets[state.activeWallet]);
  const loading = useWalletStore((state) => state.loading);
  const [walletBalance, setWalletBalance] = useState<WalletBalance | null>(null);
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    const loadWallet = async () => {
      if (loading) {
        return;
      }
      if (!wallet) {
        console.log("No wallet found, redirecting to /create-wallet");
        return;
      }

      const [tokenBalance, nftBalance] = await Promise.all([
        fetchWalletBalance(wallet.senderAddress),
        fetchNFTBalance("0x4fff0f708c768a46050f9b96c46c265729d1a62f"),
      ]);
      setWalletBalance(tokenBalance);
      setNfts(nftBalance);
    };
    loadWallet()
  }, [wallet, loading]);

  return (
    <Layout title="Wallet">
      <div className="space-y-2">
        <div className="flex lg:block">
          {walletBalance && <Balance usdValue={walletBalance.usdValue} />}
          {/*<BestToBuy />*/}
        </div>
        <div className="flex lg:block">
          {walletBalance && <AllAssets walletBalance={walletBalance} nfts={nfts}/>}
          {/*<Summary />*/}
        </div>
      </div>
    </Layout>
  );
};

export default MyAssetsPage;
