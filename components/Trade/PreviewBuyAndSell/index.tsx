import { useState } from "react";
import ButtonBack from "@/components/ButtonBack";
import Switch from "@/components/Switch";
import Option from "@/components/Option";
import Confirm from "../Confirm";

type PreviewBuyAndSellProps = {
    type: string;
    onBack: () => void;
};

const PreviewBuyAndSell = ({ type, onBack }: PreviewBuyAndSellProps) => {
    const [applyTrade, setApplyTrade] = useState(false);
    const [confirm, setConfirm] = useState(false);

    return confirm ? (
        <Confirm>
            <div className="text-h1 md:text-h2">Ξ 0,1568</div>
            <div className="text-title-1s text-theme-green">
                Successfully purchased
            </div>
        </Confirm>
    ) : (
        <>
            <ButtonBack title="Order preview" onClick={onBack} />
            <div className="mb-1 py-6 text-center md:pt-0">
                <div className="text-h1 md:text-h2">Ξ 0,1568</div>
                <div className="mt-1 text-base-2 text-theme-secondary">
                    You will pay{" "}
                    <span className="text-theme-green">US$579,91</span>
                </div>
            </div>
            <div>
                <Option
                    classTitle="w-30"
                    title="Pay with"
                    color="bg-theme-green"
                >
                    USD Balance
                </Option>
                <Option classTitle="w-30" title="Price" color="bg-theme-green">
                    1 ETH = US$3698,39
                </Option>
                <Option
                    classTitle="w-30"
                    title="NeutraNet fee"
                    color="bg-theme-green"
                >
                    US$0.00
                </Option>
                <Option
                    classTitle="w-30"
                    title={type === "buy" ? "Buy" : "Sell"}
                >
                    Ethereum{" "}
                    <span className="ml-2 text-theme-secondary">ETH</span>
                </Option>
                <Option classTitle="w-30" title="Total" color="bg-theme-purple">
                    US$48.16
                </Option>
                <Option classTitle="w-30" title="Apply AI trade">
                    <Switch
                        className="ml-auto"
                        value={applyTrade}
                        setValue={() => setApplyTrade(!applyTrade)}
                    />
                </Option>
            </div>
            <button
                className="btn-primary w-full mt-4"
                onClick={() => setConfirm(true)}
            >
                Buy now
            </button>
        </>
    );
};

export default PreviewBuyAndSell;
