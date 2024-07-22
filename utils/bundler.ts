import { Hex, parseEventLogs } from "viem";
import { RawUserOperation } from "@/types/account";
import axios from "axios";
import { ENTRY_POINT } from "@/constants";
import { bundlerRpc, ethClient } from "@/config";
import Entrypoint from "@/abis/Entrypoint.json";

export interface UserOpReceipt {
  txHash?: string;
  userOpHash: string;
  success: boolean;
  actualGasUsed: number;
}

export const submitUserOp = async (
  userOp: RawUserOperation,
  entrypoint: Hex
): Promise<Hex> => {
  const url = `${bundlerRpc}`;
  const data = {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_sendUserOperation",
    params: [userOp, entrypoint],
  };
  const response = await axios.post(url, data);
  return response.data
}

export const handleUserOpWithoutWait = async (
  userOp: RawUserOperation
): Promise<string> => {
  const url = `${bundlerRpc}/eth_sendUserOperation`;
  const data = {
    userOp,
    entrypoint: ENTRY_POINT,
  };
  const response = await axios.post(url, data);
  return response.data
};

export const handleUserOp = async (
  userOp: RawUserOperation,
  userOpHash: Hex
): Promise<UserOpReceipt> => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = `${bundlerRpc}/eth_sendUserOperation`;
      const data = {
        userOp,
        entrypoint: ENTRY_POINT,
      };
      const response = await axios.post(url, data);
      const receipt = await waitUserOpReceipt(response.data, userOpHash);
      if (!receipt.success) {
        reject({
          ...receipt,
          txHash: response.data,
        });
        return;
      }
      resolve({
        ...receipt,
        txHash: response.data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export const waitUserOpReceipt = async (
  txHash: Hex,
  userOpHash: Hex
): Promise<UserOpReceipt> => {
  const receipt = await ethClient.waitForTransactionReceipt({
    hash: txHash,
    pollingInterval: 1000
  });

  if (receipt.status === 0) {
    return {
      userOpHash,
      success: false,
      actualGasUsed: 0,
    };
  }

  const logs: any = parseEventLogs({
    abi: Entrypoint.abi,
    logs: receipt.logs,
  });

  for (const log of logs) {
    if (
      log.eventName == "UserOperationEvent" &&
      (log.args.userOpHash as string).toLowerCase() === userOpHash.toLowerCase()
    ) {
      return log.args;
    }
  }

  return {
    userOpHash,
    success: false,
    actualGasUsed: 0,
  };
};
