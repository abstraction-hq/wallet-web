import { AreaChart, Area, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { useColorMode } from "@chakra-ui/react";
import CurrencyFormat from "@/components/CurrencyFormat";
import Image from "@/components/Image";
import Percent from "@/components/Percent";

import { chartTotalBalance1 } from "@/mocks/charts";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-5 bg-theme-on-surface-1 border border-theme-stroke rounded-xl shadow-depth-1 md:p-3">
                <div className="flex mb-0.5 text-caption-2m text-theme-secondary opacity-75 dark:opacity-100">
                    <div className="mr-4.5">4/4/2024</div>
                    <div className="">10:00 PM</div>
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

type TotalBalanceProps = {};

const TotalBalance = ({}: TotalBalanceProps) => {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";

    return (
        <div>
            <div className="flex items-center mb-3">
                <div className="mr-3">
                    <Image
                        className="crypto-logo w-6"
                        src="/images/crypto-icon-2.png"
                        width={24}
                        height={24}
                        alt=""
                    />
                </div>
                <div className="text-title-1s">
                    Ethereum
                    <span className="ml-2 text-theme-tertiary">ETH</span>
                </div>
            </div>
            <CurrencyFormat
                className="mb-2 text-h2"
                value={3273.7}
                currency="$"
            />
            <Percent className="mb-6 text-base-2 md:mb-0" value={12.32} />
            <div className="h-[18.5rem] md:h-[17.25rem]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={730}
                        height={250}
                        data={chartTotalBalance1}
                        margin={{
                            top: 0,
                            right: 7,
                            left: 7,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient
                                id="color"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#9CC5FF"
                                    stopOpacity={0.13}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#B9D6FF"
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
                        <Tooltip
                            content={<CustomTooltip />}
                            cursor={{
                                stroke: isDarkMode ? "#272B30" : "#EFEFEF",
                                strokeWidth: 1,
                                fill: "transparent",
                            }}
                            wrapperStyle={{ outline: "none" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="price"
                            stroke="#0C68E9"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#color)"
                            activeDot={{
                                r: 7,
                                stroke: isDarkMode ? "#1A1D1F" : "#FCFCFC",
                                strokeWidth: 3,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default TotalBalance;
