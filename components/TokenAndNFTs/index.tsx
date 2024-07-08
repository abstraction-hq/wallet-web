import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import TabsSame from "@/components/TabsSame";
import Modal from "@/components/Modal";
import Token from "./Token";

type TokenAndNFTsProps = {
    visibleModal: boolean;
    asset?: any;
    onClose: () => void;
};

const TokenAndNFTs = ({
                            visibleModal,
                            onClose,
                            asset,
                        }: TokenAndNFTsProps) => {
    const [type, setType] = useState<string>("token");

    if (!asset) {
        asset = {
            id: "0",
            logo: "/images/dcr.svg",
            symbol: "VIC",
            name: "Viction",
            decimals: 18,
        };
    }

    const typeTasks = [
        {
            title: "Token",
            value: "token",
        },
        {
            title: "NFTs",
            value: "nfts",
        },
    ];

    return (
        <Modal
            classWrap="max-w-[28.5rem] rounded-3xl"
            visible={visibleModal}
            onClose={onClose}
            showTextClose={'Select Asset'}
        >
            <TabsSame
                className="mb-6"
                items={typeTasks}
                value={type}
                setValue={setType}
            />
            {type === "token" && <Token asset={asset} />}
            {type === "nfts" && <Token asset={asset} />}
        </Modal>
    );
};

export default TokenAndNFTs;
