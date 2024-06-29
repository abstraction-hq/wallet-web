import { useState } from "react";
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from "recharts";
import { useColorMode } from "@chakra-ui/color-mode";
import Card from "@/components/Card";
import CurrencyFormat from "@/components/CurrencyFormat";

import { chartVolumes } from "@/mocks/charts";

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

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-5 bg-theme-on-surface-1 border border-theme-stroke rounded-xl shadow-depth-1">
                <div className="mb-0.5 text-caption-2m text-theme-secondary opacity-75 dark:opacity-100">
                    04/07/2024 07:45:00 PM
                </div>
                <CurrencyFormat
                    className="text-h5"
                    currency="$"
                    value={payload[0].value}
                />
            </div>
        );
    }

    return null;
};

type VolumesProps = {};

const Volumes = ({}: VolumesProps) => {
    const [time, setTime] = useState(duration[0]);
    const { colorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";

    return (
        <Card
            className="flex-1"
            title="Volumes"
            tooltip="Tooltip volumes"
            option={time}
            setOption={setTime}
            options={duration}
        >
            <div className="h-[22.6rem] mt-4 -mb-5 md:-mb-3">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        width={730}
                        height={250}
                        data={chartVolumes}
                        margin={{ top: 0, right: 6, left: 6, bottom: 0 }}
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
                            type="linear"
                            dataKey="price"
                            stroke="#32AE60"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#color)"
                            activeDot={{
                                r: 6,
                                stroke: isDarkMode ? "#1A1D1F" : "#FCFCFC",
                                strokeWidth: 3,
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default Volumes;
