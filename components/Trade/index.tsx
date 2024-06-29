import { useState } from "react";
import TabsSame from "@/components/TabsSame";
import BuyAndSell from "./BuyAndSell";
import SelectAsset from "./SelectAsset";
import Swap from "./Swap";
import PreviewBuyAndSell from "./PreviewBuyAndSell";
import PreviewSwap from "./PreviewSwap";

type TradeProps = {};

const Trade = ({}: TradeProps) => {
    const [type, setType] = useState<string>("buy");
    const [selectAsset, setSelectAsset] = useState(false);
    const [previewBuy, setPreviewBuy] = useState(false);
    const [previewSell, setPreviewSell] = useState(false);
    const [previewSwap, setPreviewSwap] = useState(false);

    const typeTasks = [
        {
            title: "Buy",
            value: "buy",
        },
        {
            title: "Sell",
            value: "sell",
        },
        {
            title: "Swap",
            value: "swap",
        },
    ];

    return (
        <>
            {selectAsset ? (
                <SelectAsset onBack={() => setSelectAsset(false)} />
            ) : (
                <>
                    {!previewBuy && !previewSell && !previewSwap && (
                        <>
                            <div className="mb-6 text-title-1s">
                                Ethereum{" "}
                                <span className="text-theme-tertiary">ETH</span>
                            </div>
                            <TabsSame
                                className="mb-6"
                                items={typeTasks}
                                value={type}
                                setValue={setType}
                            />
                        </>
                    )}
                    {type === "buy" &&
                        (previewBuy ? (
                            <PreviewBuyAndSell
                                type="buy"
                                onBack={() => setPreviewBuy(false)}
                            />
                        ) : (
                            <BuyAndSell
                                type="buy"
                                onSelect={() => setSelectAsset(true)}
                                onContinue={() => setPreviewBuy(true)}
                            />
                        ))}
                    {type === "sell" &&
                        (previewSell ? (
                            <PreviewBuyAndSell
                                type="sell"
                                onBack={() => setPreviewSell(false)}
                            />
                        ) : (
                            <BuyAndSell
                                type="sell"
                                onSelect={() => setSelectAsset(true)}
                                onContinue={() => setPreviewSell(true)}
                            />
                        ))}
                    {type === "swap" &&
                        (previewSwap ? (
                            <PreviewSwap onBack={() => setPreviewSwap(false)} />
                        ) : (
                            <Swap
                                onSelect={() => setSelectAsset(true)}
                                onContinue={() => setPreviewSwap(true)}
                            />
                        ))}
                </>
            )}
        </>
    );
};

export default Trade;
