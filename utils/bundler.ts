import { Hex } from "viem";
import { RawUserOperation } from "@/types/account";
import axios from "axios";
import { bundlerRpc } from "@/config";
import { ENTRY_POINT } from "@/constants";

const waitForUserOpHash = async (userOpHash: Hex): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const data = {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getUserOperationReceipt",
          params: [userOpHash],
        };
        const response = await axios.post(bundlerRpc, data);
        if (response.data.result) {
          clearInterval(interval);
          if (response.data.result.success) {
            resolve(response.data.result);
          } else {
            reject(response.data.result);
          }
        }
      } catch (e) {
        clearInterval(interval);
        reject(e);
      }
    }, 1000);
  });
};

export const estimateGas = async (userOp: RawUserOperation): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_estimateUserOperationGas",
        params: [userOp, ENTRY_POINT],
      };
      const response = await axios.post(bundlerRpc, data);
      console.log(response)
      resolve(response.data.result);
    } catch (e) {
      reject(e);
    }
  });
}

export const submitUserOp = async (
  userOp: RawUserOperation,
  wailForReceipt = true
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_sendUserOperation",
        params: [userOp, ENTRY_POINT],
      };
      const response = await axios.post(bundlerRpc, data);
      if (wailForReceipt) {
        const receipt = await waitForUserOpHash(response.data.result);
        resolve(receipt);
      } else {
        resolve(response.data.result);
      }
    } catch (e) {
      reject(e);
    }
  });
};