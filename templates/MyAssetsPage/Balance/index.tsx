import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { useColorMode } from "@chakra-ui/color-mode";
import Card from "@/components/Card";
import CurrencyFormat from "@/components/CurrencyFormat";
import Percent from "@/components/Percent";

import { chartTotalBalance } from "@/mocks/charts";

const duration = [
    {
        id: "0",
        title: "Last 7 days",
    },
    {
        id: "1",
        title: "Month",
    },
    {
        id: "2",
        title: "Year",
    },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-5 bg-theme-on-surface-1 border border-theme-stroke rounded-xl shadow-depth-1 md:p-3">
                <div className="flex mb-0.5 text-caption-2m text-theme-secondary opacity-75 dark:opacity-100">
                    28 Feb 2024
                </div>
                <CurrencyFormat
                    className="text-h5 md:text-title-1s"
                    value={payload[0].value}
                    currency="$"
                />
            </div>
        );
    }

    return null;
};

type BalanceProps = {};

const Balance = ({}: BalanceProps) => {
    const [time, setTime] = useState(duration[0]);
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";

    return (
        <Card
            className="grow"
            title="Total balance"
            option={time}
            setOption={setTime}
            // options={duration}
        >
            <div className="flex items-end mt-0.5 md:mt-2">
                <CurrencyFormat
                    className="text-h1 md:text-h3"
                    value={3200.8}
                    currency="$"
                />
                <Percent className="ml-1 text-title-1s" value={85.66} />
            </div>
        </Card>
    );
};

export default Balance;
