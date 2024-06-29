import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useColorMode } from "@chakra-ui/react";
import CurrencyFormat from "@/components/CurrencyFormat";
import Image from "@/components/Image";

import { chartPrimaryBalance } from "@/mocks/charts";

const legend = [
    {
        title: "ETH",
        color: "#B981DA",
    },
    {
        title: "USD",
        color: "#0C68E9",
    },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-3 bg-theme-on-surface-1 border border-theme-stroke rounded-xl shadow-depth-1">
                <div className="flex justify-between mb-3 text-caption-2m text-theme-secondary opacity-75 dark:opacity-100">
                    <div className="mr-4.5">4/4/2024</div>
                    <div className="">10:00 PM</div>
                </div>
                <div className="flex space-x-5">
                    <div className="">
                        <div className="flex items-center mb-0.5 text-caption-1 text-theme-secondary">
                            <div
                                className="shrink-0 w-2 h-2 mr-2 rounded-sm"
                                style={{ backgroundColor: "#B981DA" }}
                            ></div>
                            ETH
                        </div>
                        <CurrencyFormat
                            className="text-base-1b"
                            value={payload[0].value}
                            currency="$"
                        />
                    </div>
                    <div className="">
                        <div className="flex items-center mb-0.5 text-caption-1 text-theme-secondary">
                            <div
                                className="shrink-0 w-2 h-2 mr-2 rounded-sm"
                                style={{ backgroundColor: "#0C68E9" }}
                            ></div>
                            USD
                        </div>
                        <CurrencyFormat
                            className="text-base-1b"
                            value={payload[1].value}
                            currency="$"
                        />
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

type PrimaryBalanceProps = {};

const PrimaryBalance = ({}: PrimaryBalanceProps) => {
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";

    return (
        <div className="">
            <CurrencyFormat
                className="mb-2 text-h2"
                value={2843.7}
                currency="$"
            />
            <div className="flex mb-6">
                <div className="flex items-center mr-auto">
                    <div className="mr-3 text-0">
                        <Image
                            className="crypto-logo w-4"
                            src="/images/crypto-icon-2.png"
                            width={16}
                            height={16}
                            alt=""
                        />
                    </div>
                    <div className="text-base-1s text-theme-secondary">
                        0,8108019467232046
                    </div>
                </div>
                <div className="flex items-center space-x-10">
                    {legend.map((item, index) => (
                        <div
                            className="flex items-center min-w-[5rem] text-base-2 text-theme-secondary 2xl:min-w-fit"
                            key={index}
                        >
                            <div
                                className="shrink-0 w-3 h-3 mr-2 rounded"
                                style={{ backgroundColor: item.color }}
                            ></div>
                            {item.title}
                        </div>
                    ))}
                </div>
            </div>
            <div className="h-[17.625rem]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartPrimaryBalance}
                        margin={{
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                        barGap={12}
                        barSize={20}
                    >
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
                                fill: isDarkMode ? "#222628" : "#F6F6F6",
                            }}
                            wrapperStyle={{ outline: "none" }}
                        />
                        <Bar dataKey="ETH" fill="#B981DA" radius={2} />
                        <Bar dataKey="USD" fill="#0C68E9" radius={2} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PrimaryBalance;
