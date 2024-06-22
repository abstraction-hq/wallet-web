import { Hex } from "viem";
import { RawUserOperation } from "@/types/account";
import axios from "axios"

export const handleUserOp = async (userOp: RawUserOperation): Promise<Hex> => {
    const url = 'http://localhost:4337/eth_sendUserOperation';
    const data = {
        userOp
    }
    const response = await axios.post(url, data)
    return response.data
}