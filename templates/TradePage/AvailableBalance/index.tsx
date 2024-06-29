import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import CurrencyFormat from "@/components/CurrencyFormat";
import Percent from "@/components/Percent";

const data = [
    { name: "ETH", color: "#FD8965", value: 100 },
    { name: "XRP", color: "#FFB560", value: 300 },
    { name: "SOL", color: "#E5C7F7", value: 250 },
    { name: "BTC", color: "#FAD5F4", value: 200 },
    { name: "GOM", color: "#C7DEFF", value: 400 },
];

const COLORS = ["#FD8965", "#FFB560", "#E5C7F7", "#FAD5F4", "#C7DEFF"];

type AvailableBalanceProps = {};

const AvailableBalance = ({}: AvailableBalanceProps) => (
    <div className="card-sidebar">
        <div className="mb-6 text-title-1s md:mb-4 md:text-[1.125rem]">
            Available balance
        </div>
        <CurrencyFormat className="text-h3" currency="$" value={3200.8} />
        <Percent className="mb-6 text-base-2" value={12.32} />
        <div className="relative w-[15.75rem] h-[15.75rem] mx-auto">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart width={290} height={290}>
                    <Pie
                        data={data}
                        cx={122}
                        cy={122}
                        innerRadius={70}
                        outerRadius={124}
                        labelLine={false}
                        dataKey="value"
                        paddingAngle={2}
                        stroke="transparent"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base-1s">
                0.5 BTC
            </div>
        </div>
        <div className="flex flex-wrap justify-center mt-6 gap-3 2xl:-mx-2 2xl:gap-2">
            {data.map((item, index) => (
                <div
                    className="flex items-center text-caption-2m text-theme-secondary"
                    key={index}
                >
                    <div
                        className="shrink-0 w-3 h-3 mr-2 rounded 2xl:mr-1.5"
                        style={{ backgroundColor: item.color }}
                    ></div>
                    {item.name}
                </div>
            ))}
        </div>
        <button className="btn-gray w-full mt-6">View all assets</button>
    </div>
);

export default AvailableBalance;
