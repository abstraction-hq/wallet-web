import {
  ERC1967_CREATION_CODE_HASH,
  FACTORY,
  WALLET_FACTORY,
} from "@/constants";
import {
  Address,
  Hex,
  getContractAddress,
} from "viem";

export const computeWalletAddress = (salt: Hex): Address => {
  return getContractAddress({
    bytecodeHash: ERC1967_CREATION_CODE_HASH,
    from: WALLET_FACTORY,
    salt,
    opcode: "CREATE2",
  });
};

export const computeNewContractAddress = (salt: Hex, bytecode: Hex): Address => {
  return getContractAddress({
    bytecode: bytecode,
    from: FACTORY,
    salt,
    opcode: "CREATE2",
  });
} 