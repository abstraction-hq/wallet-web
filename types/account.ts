import { Address, Hex, PublicClient } from "viem";

export interface AccountOpt {
  mnemonic: string;
  ethClient: PublicClient;
}

export interface UserOperation {
  sender: Address;
  nonce: bigint;
  initCode: Hex;
  callData: Hex;
  callGasLimit: bigint;
  verificationGasLimit: bigint;
  preVerificationGas: bigint;
  maxFeePerGas: bigint;
  maxPriorityFeePerGas: bigint;
  paymasterAndData: Hex;
  signature: Hex;
}

export interface RawUserOperation {
  sender: Address;
  nonce: Hex;
  initCode: Hex;
  callData: Hex;
  callGasLimit: Hex;
  verificationGasLimit: Hex;
  preVerificationGas: Hex;
  maxFeePerGas: Hex;
  maxPriorityFeePerGas: Hex;
  paymasterAndData: Hex;
  signature: Hex;
}

export interface CallContractArgs {
  target: Address;
  value: bigint;
  data: Hex;
}

export type IStoredWallet = {
  index: number;
  address: Address;
};

export interface IStoredMnemonic {
  encryptedMnemonic: string;
  passwordHash: string;
}
