import { createPublicClient, http } from "viem";
import { bscTestnet } from "viem/chains"
import dotenv from "dotenv"
dotenv.config()

// export const activeNetwork = process.env.ACTIVE_NETWORK || "mainnet";
export const bundlerRpc = process.env.NEXT_PUBLIC_BUNDLER_RPC || "https://wallet.abstraction.world/bundler";
export const supportedNetworks = ["sepolia"];

export const ethClient = createPublicClient({
  chain: bscTestnet,
  transport: http(),
});