import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Card from "@/components/Card";

const data = [
    { name: "Red", value: 400 },
    { name: "Yellow", value: 250 },
    { name: "Pink", value: 350 },
    { name: "Green", value: 300 },
];

const COLORS = ["#F04D1A", "#FBA94B", "#B981DA", "#32AE60"];

type GreedIndexProps = {};

const GreedIndex = ({}: GreedIndexProps) => {
    return (
        <Card
            className="flex-1"
            title="Greed index"
            tooltip="Tooltip Greed index"
            seeAllUrl="/greed-index"
        >
            <div className="md:-mx-2">
                <div className="relative w-80 h-40 mt-14 mx-auto lg:my-8 md:mt-6 md:mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={800} height={400}>
                            <Pie
                                data={data}
                                cx={155}
                                cy={160}
                                startAngle={180}
                                endAngle={0}
                                innerRadius={128}
                                outerRadius={160}
                                fill="#8884d8"
                                paddingAngle={1}
                                dataKey="value"
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
                    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 text-center">
                        <div className="text-h1 md:text-h2">82</div>
                        <div className="text-title-1m text-theme-secondary">
                            Greed
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default GreedIndex;
