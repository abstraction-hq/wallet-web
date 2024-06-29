import Card from "@/components/Card";
import Icon from "@/components/Icon";

import { recentActivities } from "@/mocks/recentActivities";

type RecentActivitiesProps = {};

const RecentActivities = ({}: RecentActivitiesProps) => {
    return (
        <Card
            className="w-[calc(50%-0.5rem)] mx-1 lg:w-full lg:mx-0"
            title="Recent activities"
            tooltip="Tooltip recent activities"
            seeAllUrl="/"
        >
            <div className="pt-6 space-y-1">
                {recentActivities.map((item) => (
                    <div className="flex items-center py-4" key={item.id}>
                        <div
                            className={`flex justify-center items-center shrink-0 w-10 h-12 mr-4 rounded-[0.625rem] md:mr-3 ${
                                item.balance
                                    ? "bg-theme-brand-100"
                                    : "bg-theme-purple-100"
                            }`}
                        >
                            <Icon
                                className={`!w-5 !h-5 ${
                                    item.balance
                                        ? "fill-theme-brand"
                                        : "fill-theme-purple rotate-180"
                                }`}
                                name="arrow-up-right-long"
                            />
                        </div>
                        <div className="mr-auto">
                            <div className="flex items-center text-base-1s">
                                <div className="w-2 h-2 mr-2 rounded-full bg-theme-green"></div>
                                {item.wallet}
                            </div>
                            <div
                                className={`text-base-2 ${
                                    item.status === "Pending"
                                        ? "text-theme-yellow"
                                        : "text-theme-green"
                                }`}
                            >
                                {item.status}
                            </div>
                        </div>
                        <div className="ml-3">
                            <div className="flex justify-end items-center text-base-1s">
                                {item.priceCrypto}
                                <div className="w-4 h-4 ml-2 rounded-full bg-theme-on-surface-2"></div>
                            </div>
                            <div className="flex justify-end items-center text-base-2 text-theme-tertiary">
                                {item.price}
                                <div className="w-4 h-4 ml-2 rounded-full bg-theme-on-surface-2"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default RecentActivities;
