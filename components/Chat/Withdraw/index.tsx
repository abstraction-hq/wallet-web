import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import Image from "@/components/Image";

type TradeProps = {};

const Trade = ({}: TradeProps) => {
    const [send, setSend] = useState("0x1e862Be...26b444d533B");

    return (
        <div className="max-w-[25rem] mt-8 p-6 pt-10 bg-theme-on-surface rounded-2xl border border-theme-stroke md:p-4 md:pt-6 md:mt-6">
            <div className="mb-6 space-y-6">
                <div className="">
                    <div className="mb-3 text-base-2 text-theme-secondary">
                        Goal
                    </div>
                    <div className="relative">
                        <CurrencyInput
                            className="input-caret-color w-full h-12 pl-15 pr-6 bg-theme-on-surface-1 rounded-xl text-base-1s outline-none placeholder:text-theme-primary md:pl-12"
                            name="price"
                            prefix="Ξ"
                            placeholder="Ξ0.00"
                            decimalsLimit={2}
                            decimalSeparator="."
                            groupSeparator=","
                            onValueChange={(value, name, values) =>
                                console.log(value, name, values)
                            }
                        />
                        <Image
                            className="crypto-logo absolute top-1/2 left-3 w-6 -translate-y-1/2"
                            src="/images/crypto-icon-2.png"
                            width={24}
                            height={24}
                            alt=""
                        />
                    </div>
                </div>
                <div className="">
                    <div className="mb-3 text-base-2 text-theme-secondary">
                        Send to
                    </div>
                    <div className="relative">
                        <input
                            className="input-caret-color w-full h-12 pl-15 pr-6 bg-theme-on-surface-1 rounded-xl text-base-1s outline-none placeholder:text-theme-primary md:pl-12 md:text-[1rem]"
                            type="text"
                            value={send}
                            onChange={(e) => setSend(e.target.value)}
                            required
                            data-autofocus
                        />
                        <Image
                            className="absolute top-1/2 left-3 w-6 -translate-y-1/2 opacity-100"
                            src="/images/fox.png"
                            width={24}
                            height={24}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <button className="btn-secondary w-full">Set smart trade</button>
        </div>
    );
};

export default Trade;
