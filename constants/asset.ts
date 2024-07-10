import { Token } from "@/stores/assetStore";
import { zeroAddress } from "viem";

export const defaultToken: Token = {
  address: zeroAddress,
  balance: 0n,
  decimals: 18,
  name: "Viction",
  symbol: "VIC",
}