import { Hex } from "viem";
import { RawUserOperation } from "@/types/account";
import axios from "axios";
import { ENTRY_POINT } from "@/constants";
import { bundlerRpc } from "@/config";

export const handleUserOp = async (userOp: RawUserOperation): Promise<Hex> => {
  const url = `${bundlerRpc}/eth_sendUserOperation`;
  const data = {
    userOp,
    entrypoint: ENTRY_POINT,
  };
  const response = await axios.post(url, data);
  return response.data;
};
