import { useState } from "react";
import TabsSame from "@/components/TabsSame";
import Buy from "./Buy";
import Sell from "./Sell";

type BuyAndSellProps = {};

const BuyAndSell = ({}: BuyAndSellProps) => {
    const [type, setType] = useState<string>("buy");

    const typeTasks = [
        {
            title: "Buy",
            value: "buy",
        },
        {
            title: "Sell",
            value: "sell",
        },
    ];

    return (
        <div className="card-sidebar 2xl:w-[21.25rem] xl:w-80 lg:w-full">
            <TabsSame
                className="mb-6"
                items={typeTasks}
                value={type}
                setValue={setType}
            />
            {type === "buy" && <Buy />}
            {type === "sell" && <Sell />}
        </div>
    );
};

export default BuyAndSell;
