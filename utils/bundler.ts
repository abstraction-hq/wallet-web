import { Hex } from "viem";
import { RawUserOperation } from "@/types/account";
import axios from "axios";
import { ENTRY_POINT } from "@/constants";

export const handleUserOp = async (userOp: RawUserOperation): Promise<Hex> => {
  const url = "http://173.249.40.143:4337/eth_sendUserOperation";
  const data = {
    userOp,
    entrypoint: ENTRY_POINT,
  };
  const response = await axios.post(url, data);
  return response.data;
};
