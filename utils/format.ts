import { Address } from "viem";

export const formatWalletAddress = (address: Address): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}