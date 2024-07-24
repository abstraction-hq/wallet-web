import { createPublicClient, defineChain, http } from "viem";
import dotenv from "dotenv"
dotenv.config()

const mainnet = defineChain({
  id: 88,
  name: "Viction",
  nativeCurrency: {
    decimals: 18,
    name: "Viction",
    symbol: "VIC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.viction.xyz"],
      webSocket: ["wss://ws.viction.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://vicscan.xyz" },
  },
  testnet: false,
});

const testnet = defineChain({
  id: 89,
  name: "Viction Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Viction",
    symbol: "VIC",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-testnet.viction.xyz"],
      webSocket: ["wss://ws-testnet.viction.xyz"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://testnet.vicscan.xyz" },
  },
  testnet: true,
});

export const activeNetwork = process.env.ACTIVE_NETWORK || "mainnet";
export const bundlerRpc = process.env.NEXT_PUBLIC_BUNDLER_RPC || "https://wallet.abstraction.world/bundler";

export const networks: any = {
  testnet: testnet,
  mainnet: mainnet,
};

export const ethClient = createPublicClient({
  chain: networks[activeNetwork],
  transport: http(),
});