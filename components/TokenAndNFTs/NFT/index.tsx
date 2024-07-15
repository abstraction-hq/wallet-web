import { useState } from "react";
import Icon from "@/components/Icon";
import Image from "@/components/Image";

import useAssetStore, { NFT as INFT } from "@/stores/assetStore";
import { getAssetLogo } from "@/utils/format";
import NFTCard from "@/components/NFTCard";
import { useColorMode } from "@chakra-ui/react";

type NFTProps = {
  setSelectedAsset: (asset: any) => void;
  onClose: () => void;
};

const NFT = ({ setSelectedAsset, onClose }: NFTProps) => {
  const [search, setSearch] = useState("");
  const nfts = useAssetStore((state) => state.nfts);

  const onSelectAsset = (nft: INFT) => {
    setSelectedAsset(nft);
    onClose();
  };

  return (
    <>
      <div className="relative mb-4">
        <input
          className="w-full h-14 pl-14 pr-4 bg-transparent border border-theme-stroke text-base-1s text-theme-primary outline-none rounded-xl transition-colors placeholder:text-theme-tertiary focus:border-theme-brand md:text-[1rem]"
          type="text"
          placeholder="Search for asset"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          required
          data-autofocus
        />
        <div className="absolute top-1/2 left-4 flex justify-center items-center w-9 h-9 -translate-y-1/2">
          <Icon className="fill-theme-tertiary" name="search" />
        </div>
      </div>
      <div className="space-y-1">
        {nfts.map((nft) => (
          <div
            className={
              "flex items-center h-16 pl-3 pr-6 rounded-2xl cursor-pointer transition-colors hover:bg-theme-n-8"
            }
            key={nft.id + nft.address}
            onClick={() => onSelectAsset(nft)}
          >
            <div className="mr-3">
              <Image
                className="crypto-logo w-8"
                src={getAssetLogo(nft)}
                width={32}
                height={32}
                alt=""
              />
            </div>
            <div className="grow">
              <div className="text-base-1s">{nft.name}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NFT;
