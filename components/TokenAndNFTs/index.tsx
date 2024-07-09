import { useState, useEffect } from "react";
import TabsSame from "@/components/TabsSame";
import Modal from "@/components/Modal";
import Token from "./Token";
import { NFT as INFT, Token as IToken } from "@/stores/assetStore";
import NFT from "./NFT";

type TokenAndNFTsProps = {
  visibleModal: boolean;
  asset?: any;
  setSelectedAsset: (asset: IToken | INFT) => void;
  onClose: () => void;
};

const TokenAndNFTs = ({ visibleModal, onClose, setSelectedAsset }: TokenAndNFTsProps) => {
  const [type, setType] = useState<string>("token");

  const typeTasks = [
    {
      title: "Tokens",
      value: "token",
    },
    {
      title: "NFTs",
      value: "nft",
    },
  ];

  return (
    <Modal
      classWrap="max-w-[28.5rem] rounded-3xl"
      visible={visibleModal}
      onClose={onClose}
      showTextClose={"Select Asset"}
    >
      <TabsSame
        className="mb-6"
        items={typeTasks}
        value={type}
        setValue={setType}
      />
      {type === "token" && <Token setSelectedAsset={setSelectedAsset} onClose={onClose} />}
      {type === "nft" && <NFT setSelectedAsset={setSelectedAsset} onClose={onClose} />}
    </Modal>
  );
};

export default TokenAndNFTs;
