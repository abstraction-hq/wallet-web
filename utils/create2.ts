import {
  ERC1967_CREATION_CODE_HASH,
  PASSKEY_MODULE_CREATION_CODE_HASH,
  WALLET_FACTORY,
} from "@/constants";
import {
  Address,
  Hex,
  encodeAbiParameters,
  getContractAddress,
  keccak256,
  parseAbiParameters,
} from "viem";

export const computeWalletAddress = (salt: Hex): Address => {
  return getContractAddress({
    bytecodeHash: ERC1967_CREATION_CODE_HASH,
    from: WALLET_FACTORY,
    salt,
    opcode: "CREATE2",
  });
};

export const computePasskeyModuleAddress = (x: bigint, y: bigint): Address => {
  const salt = keccak256(
    encodeAbiParameters(parseAbiParameters("uint256, uint256"), [x, y])
  );
  return getContractAddress({
    bytecodeHash: PASSKEY_MODULE_CREATION_CODE_HASH,
    from: WALLET_FACTORY,
    salt,
    opcode: "CREATE2",
  });
};
