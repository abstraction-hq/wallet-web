"use client";

import Image from "@/components/Image";
import { NFT } from "@/stores/assetStore";
import { useColorMode } from "@chakra-ui/react";

interface NFTCardProps {
  nft: NFT;
  isDarkMode?: boolean;
}

const MAX_LENGTH = 8;

const NFTCard: React.FC<NFTCardProps> = ({ nft }) => {
  const { colorMode, setColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  return (
    <div
      style={{ backgroundColor: isDarkMode ? "#202020" : "#FFFFFF" }}
      className="shadow-lg rounded-lg overflow-hidden"
    >
      <div className="relative">
        <Image
          className="object-cover transform group-hover:scale-110 transition-transform duration-300"
          src={nft.image}
          alt="NFT Image"
          width={300}
          height={300}
        />
      </div>
      <div className="border-t px-4 py-2 flex justify-between items-center">
        <div className="text-body-1m text-theme-primary font-bold">
          {nft.name}
        </div>
      </div>
      <div className="border-t px-4 py-2 flex justify-between items-center">
        <div>
          <span className="text-theme-tertiary font-medium">Token ID</span>
          <div className="text-theme-primary font-bold">
            {nft.id.toString().length > MAX_LENGTH
              ? `${nft.id.toString().substring(0, MAX_LENGTH)}...`
              : nft.id}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NFTCard;
