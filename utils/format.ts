import { NFT, Token } from "@/stores/assetStore";
import { Address, formatEther, zeroAddress } from "viem";

export const formatWalletAddress = (address: Address): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export const getAssetLogo = (asset: Token | NFT): string => {
  if ("balance" in asset) {
    if (asset.address == zeroAddress) {
      return "/images/viction.jpeg";
    } else {
      return "/images/dcr.svg";
    }
  } else {
    return asset.image;
  }
};

export const formatTokenBalance = (token: Token): number => {
  return parseFloat(formatEther(token.balance))
}
