import CurrencyInput from "react-currency-input-field";
import Icon from "@/components/Icon";
import Percent from "@/components/Percent";

type TradeProps = {};

const Trade = ({}: TradeProps) => (
    <div className="max-w-[25rem] mt-8 bg-theme-on-surface rounded-2xl border border-theme-stroke md:mt-6">
        <CurrencyInput
            className="input-caret-color w-full h-32 px-4 bg-transparent text-center text-h2 outline-none placeholder:text-theme-primary"
            name="price"
            prefix="$"
            placeholder="$0.00"
            decimalsLimit={2}
            decimalSeparator="."
            groupSeparator=","
            onValueChange={(value, name, values) =>
                console.log(value, name, values)
            }
        />
        <div className="">
            <div className="flex items-center min-h-[4rem] px-6 py-4 border-t border-theme-stroke md:px-4">
                <div className="flex items-center w-22 text-base-2 text-theme-secondary">
                    <div className="shrink-0 w-3 h-3 mr-2 rounded bg-theme-green"></div>
                    Best time
                </div>
                <div className="flex items-center grow pl-6 md:pl-4">
                    <div className="text-base-2">
                        10:31AM{" "}
                        <span className="md:hidden"> Tue 9 Apr 2024</span>
                    </div>
                    <button className="btn-square ml-auto rounded-full">
                        <Icon name="refresh" />
                    </button>
                </div>
            </div>
            <div className="flex items-center min-h-[4rem] px-6 py-4 border-t border-theme-stroke md:px-4">
                <div className="flex items-center w-22 text-base-2 text-theme-secondary">
                    <div className="shrink-0 w-3 h-3 mr-2 rounded bg-theme-purple"></div>
                    Buy
                </div>
                <div className="flex items-center grow pl-6 md:pl-4">
                    <div className="text-base-2">ETH</div>
                    <button className="btn-square ml-auto rounded-full">
                        <Icon name="arrow-down" />
                    </button>
                </div>
            </div>
            <div className="flex items-center min-h-[4rem] px-6 py-4 border-t border-theme-stroke md:px-4">
                <div className="flex items-center w-22 text-base-2 text-theme-secondary">
                    <div className="shrink-0 w-3 h-3 mr-2 rounded bg-theme-brand"></div>
                    Target
                </div>
                <div className="flex items-center grow pl-6 md:pl-4">
                    <div className="text-base-2">+10%</div>
                </div>
            </div>
            <div className="flex items-center min-h-[4rem] px-6 py-4 border-t border-theme-stroke md:px-4">
                <div className="flex items-center w-22 text-base-2 text-theme-secondary">
                    <div className="shrink-0 w-3 h-3 mr-2 rounded bg-theme-yellow"></div>
                    Estimate
                </div>
                <div className="flex items-center grow pl-6 md:pl-4">
                    <div className="text-base-2 md:hidden">
                        0,030214426289846993
                    </div>
                    <div className="hidden text-base-2 md:block">0,03021</div>
                    <Percent className="ml-auto text-base-2" value={10} />
                </div>
            </div>
        </div>
        <div className="flex p-6 space-x-4 md:block md:space-x-0 md:space-y-4 md:px-4">
            <button className="btn-gray flex-1 px-4 md:w-full">
                Re-generate
            </button>
            <button className="btn-secondary flex-1 px-4 md:w-full">
                Set smart trade
            </button>
        </div>
    </div>
);

export default Trade;
