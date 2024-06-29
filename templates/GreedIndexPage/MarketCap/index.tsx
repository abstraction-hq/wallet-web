import { useState } from "react";
import { BarChart, Bar, XAxis, LabelList, ResponsiveContainer } from "recharts";
import { useColorMode } from "@chakra-ui/react";
import Card from "@/components/Card";

import { chartMarketCap } from "@/mocks/charts";

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

type MarketCapProps = {};

const MarketCap = ({}: MarketCapProps) => {
    const [time, setTime] = useState(duration[0]);
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";

    return (
        <Card
            className="flex-1"
            title="Market cap"
            tooltip="Tooltip market cap"
            option={time}
            setOption={setTime}
            options={duration}
        >
            <div className="h-[22.6rem] mt-4 -mb-5 md:mt-0 md:-mb-3">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={150}
                        height={40}
                        data={chartMarketCap}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        barGap={2}
                        barSize={74}
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
                        <Bar
                            dataKey="price"
                            fill={isDarkMode ? "#A375C3" : "#DDC3EF"}
                            radius={8}
                        >
                            <LabelList
                                style={{
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    fill: isDarkMode ? "#ffffff" : "#1A1D1F",
                                }}
                                dataKey="price"
                                position="top"
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default MarketCap;
