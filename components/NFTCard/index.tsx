"use client";

import { NFT } from "@/apis/fetchNFTBalance";
import Image from "@/components/Image";

interface NFTCardProps {
  nft: NFT;
}

const MAX_LENGTH = 8;

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => (
  <div className="shadow-lg rounded-lg overflow-hidden">
    <div className="relative">
      <Image
        className="object-cover"
        src={nft.image}
        alt="NFT Image"
        width={300}
        height={300}
      />
    </div>
    <div className="border-t px-4 py-2 flex justify-between items-center">
      <div className="ml-2 text-body-1m text-theme-tertiary font-bold">
        {nft.name}
      </div>
    </div>
    <div className="border-t px-4 py-2 flex justify-between items-center">
      <div>
        <span className="text-black">Token ID</span>
        <div className="text-black font-bold">
          {nft.id.toString().length > MAX_LENGTH
            ? `${nft.id.toString().substring(0, MAX_LENGTH)}...`
            : nft.id}
        </div>
      </div>
    </div>
  </div>
);

export default NFTCard;
