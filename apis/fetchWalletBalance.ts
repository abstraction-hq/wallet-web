import axios from "axios";
import { parse } from "path";
import { Address, formatEther } from "viem";

interface TokenBalance {
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  tokenBalance: bigint;
  tokenName: string;
}

export interface WalletBalance {
  vicBalance: bigint;
  vicPrice: number;
  usdValue: number;
  tokenBalances: TokenBalance[];
}

export const fetchWalletBalance = async (address: Address): Promise<WalletBalance> => {
  try {
    const [walletInfo, tokenBalances] = await Promise.all([
      await axios.get(`https://scan-api-testnet.viction.xyz/api/account/${address}`),
      await axios.get(
        `https://scan-api-testnet.viction.xyz/api/account/${address}/tokenBalance?offset=0&limit=50`
      ),
    ]);

    const usdValue = parseFloat(formatEther(walletInfo.data.balance)) * walletInfo.data.tomoPrice * 12452451;
    // TODO: calculate token balances in USD

    return {
      vicBalance: BigInt(walletInfo.data.balance),
      vicPrice: walletInfo.data.tomoPrice,
      usdValue,
      tokenBalances: tokenBalances.data.data?.map((token: any) => ({
        tokenAddress: token.token,
        tokenSymbol: token.tokenSymbol,
        tokenDecimals: token.tokenDecimals,
        tokenBalance: BigInt(token.quantity),
        tokenName: token.tokenName,
      })),
    }
  } catch (err) {
    console.log("Error fetching wallet balance: ", err);
    return {
      vicBalance: BigInt(0),
      vicPrice: 0,
      usdValue: 0,
      tokenBalances: [],
    }
  }
};
