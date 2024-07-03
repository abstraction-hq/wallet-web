import axios from "axios";
import { Address } from "viem";

export interface NFT {
  address: string;
  id: string
  name: string;
  image: string;
}

export const fetchNFTBalance = async (address: Address): Promise<NFT[]> => {
  try {
    const res = await axios.get(`https://assets.coin98.com/nfts/88/${address}`)
    const nfts: NFT[] = []
    for (const data of res.data) {
      for (const nft of data.data) {
        nfts.push({
          address: nft.address,
          id: nft.id,
          name: nft.metaData.name,
          image: nft.metaData.image
        })
      }
    }
    return nfts
  } catch (err) {
    console.log("Error fetching wallet balance: ", err);
    return []
  }
};
