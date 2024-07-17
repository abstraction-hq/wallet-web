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
  vicBalance: bigint;
  vicPrice: number;
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
    vicBalance: BigInt(0),
    vicPrice: 0,
    usdValue: 0,
  },
  tokens: [],
  nfts: [],
  fetchData: async (address: Address) => {
    try {
      const [vicBalance, vicPrice, nftsRes] = await Promise.all([
        await ethClient.getBalance({
          address,
        }),
        await axios.get("https://www.binance.com/api/v3/ticker/price?symbol=VICUSDT"),
        await axios.get(`https://assets.coin98.com/nfts/88/${address}`),
      ]);

      const usdValue =
        parseFloat(formatEther(vicBalance)) * parseFloat(vicPrice.data.price);


      const tokens: Token[] = [
        {
          address: zeroAddress,
          symbol: "VIC",
          decimals: 18,
          balance: BigInt(vicBalance),
          name: "Viction",
          price: vicPrice.data.price,
        },
      ];

      // tokensRes.data.data?.map((token: any) => {
      //   tokens.push({
      //     address: token.token,
      //     symbol: token.tokenSymbol,
      //     decimals: token.tokenDecimals,
      //     balance: BigInt(token.quantity),
      //     name: token.tokenName,
      //   });
      // });

      const nfts: NFT[] = [];
      for (const data of nftsRes.data) {
        for (const nft of data.data) {
          nfts.push({
            address: nft.address,
            id: nft.id,
            name: nft.metaData.name,
            image: nft.metaData.image,
          });
        }
      }

      console.log("NFT balances: ", nfts);

      set({
        walletInfo: {
          vicBalance,
          vicPrice: vicPrice.data.price,
          usdValue,
        },
        tokens,
        nfts,
      });
    } catch (error: any) {
      console.log("Error fetching wallet balance: ", error);
    }
  },
}));

export default useAssetStore;
