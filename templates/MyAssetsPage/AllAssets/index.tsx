import Card from "@/components/Card";
import Image from "@/components/Image";
import CurrencyFormat from "@/components/CurrencyFormat";
import Icon from "@/components/Icon";
import { useColorMode } from "@chakra-ui/color-mode";

import Tabs from "@/components/Tabs";
import { useState } from "react";
import Select from "@/components/Select";
import NFTCard from "@/components/NFTCard";
import { WalletBalance } from "@/apis/fetchWalletBalance";
import { formatEther } from "viem";
import { nftItems } from "@/mocks/nftItems";
import SendAndReceive from "@/components/SendAndReceive";
import { NFT } from "@/apis/fetchNFTBalance";

const typeItems = [
  {
    id: "0",
    title: "Crypto",
  },
  {
    id: "1",
    title: "NFTs",
  },
];

type AllAssetsProps = {
  walletBalance: WalletBalance;
  nfts: NFT[]
};

const AllAssets = ({ walletBalance, nfts }: AllAssetsProps) => {
  const [type, setType] = useState(typeItems[0]);
  const [visibleModalSend, setVisibleModalSend] = useState<boolean>(false);
  const [selectedToken, setSelectedToken] = useState<any>();
  const assets: any[] = [];
  const { colorMode, setColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark";

  assets.push({
    id: "0",
    logo: "/images/viction.jpeg",
    symbol: "VIC",
    name: "Viction",
    decimals: 18,
    balance: parseFloat(formatEther(walletBalance.vicBalance)),
    price: walletBalance.vicPrice,
  });

  for (const token of walletBalance.tokenBalances) {
    assets.push({
      id: token.tokenAddress,
      logo: "/images/dcr.svg",
      symbol: token.tokenSymbol,
      name: token.tokenName,
      decimals: token.tokenDecimals,
      balance: parseFloat(formatEther(token.tokenBalance)),
      price: 0,
    });
  }

  const onSendToken = async (assetId: string) => {
    const asset = assets.find((asset) => asset.id === assetId);
    setSelectedToken(asset);
    setVisibleModalSend(true);
  };

  return (
    <>
      <Card className="grow" title={"All assets"} tooltip="Tooltip all assets">
        <div className="flex mb-4 md:hidden">
          <Tabs
            className="mr-auto"
            items={typeItems}
            value={type}
            setValue={setType}
          />
          <Select
            className="hidden -mb-2 md:block"
            value={type}
            onChange={setType}
            items={typeItems}
          />
        </div>
        {type.id === "0" ? (
          <div className="mt-5 -mx-6 md:-mx-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="pl-6 py-3 text-left text-caption-2m text-theme-secondary md:pl-4">
                    Name
                  </th>
                  <th className="pl-4 py-3 text-left text-caption-2m text-theme-secondary">
                    Balance
                  </th>
                  <th className="pl-4 py-3 text-left text-caption-2m text-theme-secondary md:hidden">
                    Price
                  </th>
                  <th className="pl-4 py-3 text-left text-caption-2m text-theme-secondary md:hidden">
                    Value
                  </th>
                  <th className="pl-4 py-3 pr-6 text-left text-caption-2m text-theme-secondary md:pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {assets.map((asset) => (
                  <tr className="" key={asset.id}>
                    <td className="border-t border-theme-stroke pl-6 py-3 md:pl-4">
                      <div className="inline-flex items-center text-base-1s">
                        <div className="crypto-logo shrink-0 mr-4">
                          <Image
                            className="w-8 opacity-100"
                            src={asset.logo}
                            width={32}
                            height={32}
                            alt=""
                          />
                        </div>
                        {asset.name} ({asset.symbol})
                      </div>
                    </td>
                    <td className="border-t border-theme-stroke pl-4 py-3">
                      <CurrencyFormat
                        className="text-base-1s"
                        value={asset.balance}
                      />
                    </td>
                    <td className="border-t border-theme-stroke pl-4 py-3 text-base-1s text-theme-secondary md:hidden">
                      ${asset.price}
                    </td>
                    <td className="border-t border-theme-stroke pl-4 py-3 text-base-1s text-theme-secondary md:hidden">
                      ${(asset.balance * asset.price).toFixed(2)}
                    </td>
                    <td className="border-t border-theme-stroke pl-4 py-3 pr-6 text-right md:pr-4">
                      <div className="inline-flex space-x-2">
                        {/* <button
                          className="btn-gray min-w-[5.5rem] h-10 md:min-w-fit md:w-10 md:p-0"
                          onClick={() => onSendToken(asset.id)}
                      >
                        <span className="md:hidden">Send & Receive</span>
                        <Icon
                            className="hidden !fill-theme-secondary md:inline-block md:!m-0"
                            name="arrow-up-right-thin"
                        />
                      </button> */}
                        <button className="btn-gray min-w-[5.5rem] h-10 md:min-w-fit md:w-10 md:p-0">
                          <span className="md:hidden">Detail</span>
                          <Icon
                            className="hidden !fill-theme-secondary md:inline-block md:!m-0"
                            name="plus"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {nfts.map((nft) => (
              <NFTCard key={nft.id} nft={nft} isDarkMode={isDarkMode}/>
            ))}
          </div>
        )}
      </Card>
      <SendAndReceive
        visibleModal={visibleModalSend}
        onClose={() => setVisibleModalSend(false)}
        asset={selectedToken}
      />
    </>
  );
};

export default AllAssets;
