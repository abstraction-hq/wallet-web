import Card from "@/components/Card";
import Image from "@/components/Image";
import CurrencyFormat from "@/components/CurrencyFormat";
import Icon from "@/components/Icon";
import { useColorMode } from "@chakra-ui/color-mode";

import Tabs from "@/components/Tabs";
import { useState } from "react";
import Select from "@/components/Select";
import NFTCard from "@/components/NFTCard";
import { formatEther, zeroAddress } from "viem";
import SendAndReceive from "@/components/SendAndReceive";
import useAssetStore from "@/stores/assetStore";
import { getAssetLogo } from "@/utils/format";

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
};

const AllAssets = ({ }: AllAssetsProps) => {
  const [type, setType] = useState(typeItems[0]);
  const [sendModalData, setSendModalData] = useState<any>({
    visible: false,
    selectedAsset: null,
  });
  const { colorMode, setColorMode } = useColorMode();
  const tokens = useAssetStore((state) => state.tokens);
  const nfts = useAssetStore((state) => state.nfts);
  const isDarkMode = colorMode === "dark";

  const onSendToken = async (token: any) => {
    setSendModalData({
      visible: true,
      selectedAsset: token,
    });
  }

  return (
    <>
      <Card className="grow" title={"All assets"} tooltip="Tooltip all assets">
        <div className="flex mb-4">
          <Tabs
            className="mr-auto md:hidden"
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
                {tokens.map((token) => (
                  <tr className="" key={token.address}>
                    <td className="border-t border-theme-stroke pl-6 py-3 md:pl-4">
                      <div className="inline-flex items-center text-base-1s">
                        <div className="crypto-logo shrink-0 mr-4">
                          <Image
                            className="w-8 opacity-100"
                            src={getAssetLogo(token)}
                            width={32}
                            height={32}
                            alt=""
                          />
                        </div>
                        {token.name} ({token.symbol})
                      </div>
                    </td>
                    <td className="border-t border-theme-stroke pl-4 py-3">
                      <CurrencyFormat
                        className="text-base-1s"
                        value={parseFloat(formatEther(token.balance))}
                      />
                    </td>
                    <td className="border-t border-theme-stroke pl-4 py-3 text-base-1s text-theme-secondary md:hidden">
                      ${token.price || 0}
                    </td>
                    <td className="border-t border-theme-stroke pl-4 py-3 text-base-1s text-theme-secondary md:hidden">
                      ${(parseFloat(formatEther(token.balance)) * (token.price || 0)).toFixed(2)}
                    </td>
                    <td className="border-t border-theme-stroke pl-4 py-3 pr-6 text-right md:pr-4">
                      <div className="inline-flex space-x-2">
                        {/* <button
                          className="btn-gray min-w-[5.5rem] h-10 md:min-w-fit md:w-10 md:p-0"
                          onClick={() => onSendToken(asset.id)}
                      >
                        <span className="md:hidden">Token & Receive</span>
                        <Icon
                            className="hidden !fill-theme-secondary md:inline-block md:!m-0"
                            name="arrow-up-right-thin"
                        />
                      </button> */}
                        <button className="btn-gray min-w-[5.5rem] h-10 md:min-w-fit md:w-10 md:p-0" onClick={() => onSendToken(token)}>
                          <span className="md:hidden">Send</span>
                          <Icon
                            className="hidden !fill-theme-secondary md:inline-block md:!m-0"
                            name="arrow-up-right-thin"
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
        visibleModal={sendModalData.visible}
        selectedAsset={sendModalData.selectedAsset}
        onClose={() => setSendModalData({ visible: false, selectedAsset: null })}
      />
    </>
  );
};

export default AllAssets;
