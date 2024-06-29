import CurrencyInput from "react-currency-input-field";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import { useState } from "react";

type SwapProps = {
    onSelect?: () => void;
    onContinue?: () => void;
};

const Swap = ({ onSelect, onContinue }: SwapProps) => {
    const [swap, setSwap] = useState(false);

    return (
        <>
            <div className="space-y-1">
                <div className="relative">
                    <CurrencyInput
                        className="input-caret-color w-full h-[8.5rem] pb-5 bg-transparent border-2 border-theme-stroke rounded-3xl text-center text-h2 outline-none transition-colors placeholder:text-theme-primary focus:border-theme-brand"
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
                    <div className="absolute left-0 right-0 bottom-7 text-center text-base-2 text-theme-tertiary pointer-events-none">
                        0,028331501229587153
                    </div>
                </div>
                <div className="relative">
                    <div
                        className={`flex gap-1 ${
                            swap ? "flex-col-reverse" : "flex-col"
                        }`}
                    >
                        <div
                            className="flex items-center h-28 px-5 border border-theme-stroke rounded-[1.25rem] text-base-2 cursor-pointer"
                            onClick={onSelect}
                        >
                            <div className="mr-3 relative z-2">
                                <Image
                                    className="crypto-logo w-10"
                                    src="/images/crypto-icon-2.png"
                                    width={40}
                                    height={40}
                                    alt=""
                                />
                            </div>
                            <div className="mr-auto text-base-2">
                                <div className="text-theme-tertiary">From</div>
                                <div>Ethereum</div>
                            </div>
                            <div className="mr-12 text-right">
                                <div className="text-theme-tertiary">
                                    Available
                                </div>
                                <div>1,234 USD </div>
                            </div>
                            <Icon
                                className="fill-theme-secondary"
                                name="arrows"
                            />
                        </div>
                        <div
                            className="flex items-center h-28 px-5 border border-theme-stroke rounded-[1.25rem] text-base-2 cursor-pointer"
                            onClick={onSelect}
                        >
                            <div className="mr-3 relative z-2">
                                <Image
                                    className="crypto-logo w-10"
                                    src="/images/crypto-icon-3.png"
                                    width={40}
                                    height={40}
                                    alt=""
                                />
                            </div>
                            <div className="mr-auto text-base-2">
                                <div className="text-theme-tertiary">From</div>
                                <div>Solana</div>
                            </div>
                            <Icon
                                className="fill-theme-secondary"
                                name="arrows"
                            />
                        </div>
                    </div>
                    <button
                        className="group absolute left-6 top-1/2 z-1 w-8 h-8 -translate-y-1/2 bg-theme-on-surface-1 rounded-full border border-theme-stroke text-0 transition-colors hover:bg-theme-stroke before:absolute before:bottom-full before:left-1/2 before:-translate-x-1/2 before:w-0.25 before:h-10 before:bg-theme-stroke after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:w-0.25 after:h-10 after:bg-theme-stroke"
                        onClick={() => setSwap(!swap)}
                    >
                        <Icon
                            className="!w-3 !h-3 fill-theme-primary transition-colors group-hover:fill-theme-primary"
                            name="arrow-swap"
                        />
                    </button>
                </div>
            </div>
            <button className="btn-primary w-full mt-4" onClick={onContinue}>
                Preview order
            </button>
        </>
    );
};

export default Swap;
