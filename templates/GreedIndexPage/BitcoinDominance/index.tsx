import { useState } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { useColorMode } from "@chakra-ui/color-mode";
import Card from "@/components/Card";

import { chartBitcoinDominance } from "@/mocks/charts";

const duration = [
    {
        id: "0",
        title: "7d",
    },
    {
        id: "1",
        title: "14d",
    },
    {
        id: "2",
        title: "21d",
    },
];

const legend = [
    {
        title: "BTC",
        color: "#B981DA",
    },
    {
        title: "ETH",
        color: "#0C68E9",
    },
    {
        title: "USDT",
        color: "#32AE60",
    },
];

type BitcoinDominanceProps = {};

const BitcoinDominance = ({}: BitcoinDominanceProps) => {
    const [time, setTime] = useState(duration[0]);
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";

    return (
        <Card
            className="flex-1"
            title="Bitcoin dominance"
            tooltip="Tooltip bitcoin dominance"
            option={time}
            setOption={setTime}
            options={duration}
        >
            <div className="flex items-center mt-2 space-x-4">
                {legend.map((item, index) => (
                    <div
                        className="flex items-center text-caption-2m text-theme-secondary"
                        key={index}
                    >
                        <div
                            className="shrink-0 w-2 h-2 mr-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        {item.title}
                    </div>
                ))}
            </div>
            <div className="h-[26.6rem] mt-4 -mb-5 md:-mb-3">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={730}
                        height={250}
                        data={chartBitcoinDominance}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="colorBtc"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#B981DA"
                                    stopOpacity={0.15}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#B981DA"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient
                                id="colorEth"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#0C68E9"
                                    stopOpacity={0.15}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#0C68E9"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient
                                id="colorUsdt"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#32AE60"
                                    stopOpacity={0.15}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#32AE60"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            stroke={isDarkMode ? "#272B30" : "#EFEFEF"}
                            tick={{
                                fontSize: 12,
                                fontWeight: "500",
                                opacity: 0.75,
                                fill: "#6F767E",
                            }}
                            dy={4}
                        />
                        <CartesianGrid
                            horizontal={false}
                            stroke={isDarkMode ? "#272B30" : "#EFEFEF"}
                        />
                        <Area
                            type="monotone"
                            dataKey="btc"
                            stroke="#B981DA"
                            strokeWidth={4}
                            fill="url(#colorBtc)"
                        />
                        <Area
                            type="monotone"
                            dataKey="eth"
                            stroke="#0C68E9"
                            strokeWidth={4}
                            fill="url(#colorEth)"
                        />
                        <Area
                            type="monotone"
                            dataKey="usdt"
                            stroke="#32AE60"
                            strokeWidth={4}
                            fill="url(#colorUsdt)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default BitcoinDominance;
