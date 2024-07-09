import axios from "axios";
import { Address, formatEther, zeroAddress } from "viem";
import { create } from "zustand";

export interface Token {
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  tokenBalance: bigint;
  tokenName: string;
}

export interface NFT {
  address: string;
  id: string;
  name: string;
  image: string;
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
      const [infoRes, tokensRes, nftsRes] = await Promise.all([
        await axios.get(
          `https://scan-api-testnet.viction.xyz/api/account/${address}`
        ),
        await axios.get(
          `https://scan-api-testnet.viction.xyz/api/account/${address}/tokenBalance?offset=0&limit=50`
        ),
        await axios.get(
          `https://assets.coin98.com/nfts/88/0x4fff0f708c768a46050f9b96c46c265729d1a62f`
        ),
      ]);

      console.log("NFT balances: ", nftsRes);

      const usdValue =
        parseFloat(formatEther(infoRes.data.balance)) *
        infoRes.data.tomoPrice *
        12452451;

      const tokens: Token[] = [
        {
          tokenAddress: zeroAddress,
          tokenSymbol: "VIC",
          tokenDecimals: 18,
          tokenBalance: BigInt(infoRes.data.balance),
          tokenName: "Viction",
        },
      ];

      tokensRes.data.data?.map((token: any) => {
        tokens.push({
          tokenAddress: token.token,
          tokenSymbol: token.tokenSymbol,
          tokenDecimals: token.tokenDecimals,
          tokenBalance: BigInt(token.quantity),
          tokenName: token.tokenName,
        });
      });

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
          vicBalance: BigInt(infoRes.data.balance),
          vicPrice: infoRes.data.tomoPrice,
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
