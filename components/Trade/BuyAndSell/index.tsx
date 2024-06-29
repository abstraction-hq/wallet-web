import CurrencyInput from "react-currency-input-field";
import Icon from "@/components/Icon";

type BuyAndSellProps = {
    type: string;
    onSelect?: () => void;
    onContinue?: () => void;
};

const BuyAndSell = ({ type, onSelect, onContinue }: BuyAndSellProps) => (
    <>
        <div className="space-y-1">
            <CurrencyInput
                className="input-caret-color w-full h-[6.75rem] bg-transparent border-2 border-theme-stroke rounded-3xl text-center text-h2 outline-none transition-colors placeholder:text-theme-primary focus:border-theme-brand"
                name="price"
                prefix="$"
                placeholder="$0.00"
                decimalsLimit={2}
                decimalSeparator="."
                groupSeparator=","
                onValueChange={(value, name, values) =>
                    console.log(value, name, values)
                }
                data-autofocus
            />
            <div
                className="flex items-center h-22 px-5 border border-theme-stroke rounded-[1.25rem] text-base-2 cursor-pointer md:h-18"
                onClick={onSelect}
            >
                <div className="flex items-center shrink-0 w-24 mr-6 text-theme-secondary md:mr-3">
                    <div className="shrink-0 w-3 h-3 mr-2 rounded bg-theme-yellow"></div>
                    {type === "buy" ? "Buy" : "Sell"}
                </div>
                Ethereum <span className="ml-2 text-theme-tertiary">ETH</span>
                <Icon className="ml-auto fill-theme-secondary" name="arrows" />
            </div>
            <div className="flex items-center min-h-[4rem] px-5 py-4 border border-theme-stroke rounded-[1.25rem] text-base-2">
                <div className="flex items-center shrink-0 w-24 mr-6 text-theme-secondary md:mr-3">
                    <div className="shrink-0 w-3 h-3 mr-2 rounded bg-theme-purple"></div>
                    Purchase
                </div>
                <div className="text-theme-secondary">
                    You get{" "}
                    <span className="text-theme-primary">0,014701 ETH</span> for{" "}
                    <span className="text-theme-primary">US$48.16</span>
                </div>
            </div>
            <div
                className="flex items-center h-22 px-5 border border-theme-stroke rounded-[1.25rem] text-base-2 cursor-pointer md:h-18"
                onClick={onSelect}
            >
                <div className="flex items-center shrink-0 w-24 mr-6 text-theme-secondary md:mr-3">
                    <div className="shrink-0 w-3 h-3 mr-2 rounded bg-theme-green"></div>
                    Pay with
                </div>
                USD Balance
                <Icon className="ml-auto fill-theme-secondary" name="arrows" />
            </div>
        </div>
        <button className="btn-primary w-full mt-4" onClick={onContinue}>
            Continue
        </button>
    </>
);

export default BuyAndSell;
