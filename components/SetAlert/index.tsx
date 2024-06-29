import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import TabsSame from "@/components/TabsSame";
import Image from "@/components/Image";

type SetAlertProps = {};

const SetAlert = ({}: SetAlertProps) => {
    const [type, setType] = useState<string>("price");

    const typeTasks = [
        {
            title: "Price",
            value: "price",
        },
        {
            title: "Change",
            value: "change",
        },
    ];

    return (
        <div className="">
            <div className="mb-6 text-h4">Set alert</div>
            <TabsSame
                className="mb-4"
                items={typeTasks}
                value={type}
                setValue={setType}
            />
            <div className="mb-4 p-8 bg-theme-on-surface border border-theme-stroke rounded-2xl md:px-4">
                <div className="mb-3 text-center">
                    <Image
                        className="crypto-logo w-12"
                        src="/images/crypto-icon-2.png"
                        width={48}
                        height={48}
                        alt=""
                    />
                </div>
                <div className="mb-3 text-center text-base-1s">
                    Ethereum <span className="text-theme-tertiary">ETH</span>
                </div>
                <CurrencyInput
                    className="input-caret-color w-full bg-transparent text-center text-h2 outline-none placeholder:text-theme-primary"
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
            </div>
            <button className="btn-secondary w-full">Set price alert</button>
        </div>
    );
};

export default SetAlert;
