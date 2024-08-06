import { ethClient } from "@/config";
import axios from "axios";
import { Address, formatEther, zeroAddress } from "viem";
import { create } from "zustand";

export interface Token {
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  balance: bigint;
  price?: number;
}

export interface NFT {
  address: string;
  name: string;
  image: string;
  id: string;
}

export interface IWalletInfo {
  usdValue: number;
}

interface AssetStore {
  walletInfo: IWalletInfo;
  tokens: Token[];
  nfts: NFT[];
  fetchData: (address: Address) => void;
}

const useAssetStore = create<AssetStore>((set) => ({
  walletInfo: {
    usdValue: 0,
  },
  tokens: [
    {
      address: zeroAddress,
      symbol: "ETH",
      decimals: 18,
      balance: BigInt(0),
      name: "Ethereum",
      price: 0,
    },
  ],
  nfts: [],
  fetchData: async (address: Address) => {
    try {
      const [etherBalance, etherPrice] = await Promise.all([
        await ethClient.getBalance({
          address,
        }),
        await axios.get(
          "https://www.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
        ),
      ]);

      const usdValue =
        parseFloat(formatEther(etherBalance)) * parseFloat(etherPrice.data.price);

      const tokens: Token[] = [
        {
          address: zeroAddress,
          symbol: "ETH",
          decimals: 18,
          balance: BigInt(etherBalance),
          name: "Ethereum",
          price: etherPrice.data.price,
        },
      ];

      set({
        walletInfo: {
          usdValue,
        },
        tokens,
        // nfts,
      });
    } catch (error: any) {
      console.log("Error fetching wallet balance: ", error);
    }
  },
}));

export default useAssetStore;
