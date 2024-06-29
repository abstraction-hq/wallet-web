import { LineChart, Line, ResponsiveContainer } from "recharts";
import Link from "next/link";
import Card from "@/components/Card";
import Image from "@/components/Image";
import Percent from "@/components/Percent";

import { topTokens } from "@/mocks/topTokens";

type TopTokensProps = {};

const TopTokens = ({}: TopTokensProps) => {
    return (
        <Card
            className="flex-1"
            title="Top tokens"
            tooltip="Tooltip top tokens"
            seeAllUrl="/"
        >
            <div className="-mx-3 pt-6 space-y-1 md:-mx-2">
                {topTokens.map((item) => (
                    <Link
                        className="flex items-center h-20 px-3 rounded-2xl border border-transparent transition-colors hover:border-theme-stroke md:px-2"
                        key={item.id}
                        href="/token"
                    >
                        <div className="mr-5 md:mr-2">
                            <Image
                                className="crypto-logo w-10 scale-[1.02]"
                                src={item.icon}
                                width={40}
                                height={40}
                                alt=""
                            />
                        </div>
                        <div className="min-w-[6rem]">
                            <div className="text-base-1s">
                                {item.currencyFull}
                            </div>
                            <div className="text-caption-2 text-theme-secondary opacity-75">
                                {item.currencyShort}
                            </div>
                        </div>
                        <div className="w-18 h-9 mx-auto md:w-16">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    width={300}
                                    height={100}
                                    data={item.itemsCharts}
                                    margin={{
                                        top: 0,
                                        right: 0,
                                        left: 0,
                                        bottom: 0,
                                    }}
                                >
                                    <Line
                                        type="linear"
                                        dataKey="price"
                                        dot={false}
                                        stroke={
                                            item.percent > 0
                                                ? "#32AE60"
                                                : "#F04D1A"
                                        }
                                        strokeWidth={2}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="min-w-[5.5rem] -mb-1.5 text-right">
                            <div className="text-base-1s">{item.price}</div>
                            <Percent
                                className="text-base-2"
                                value={item.percent}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
    );
};

export default TopTokens;
