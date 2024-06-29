import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";

import { recentActivities } from "@/mocks/recentActivities";

type TransactionsProps = {};

const Transactions = ({}: TransactionsProps) => {
    return (
        <div>
            <div className="flex items-center h-10 mb-6">
                <div className="text-title-1s">Transactions</div>
                <Tooltip className="-mb-0.5" title="Transactions tooltip" />
            </div>
            <div className="-mx-3 space-y-1">
                {recentActivities.map((item) => (
                    <div
                        className="flex items-center px-3 py-4 border border-transparent rounded-xl transition-all cursor-pointer hover:shadow-[0_0_0.875rem_-0.25rem_rgba(0,0,0,0.05),0_2rem_3rem_-0.5rem_rgba(0,0,0,0.05)] hover:border-theme-stroke hover:bg-theme-on-surface-1"
                        key={item.id}
                    >
                        <div
                            className={`flex justify-center items-center shrink-0 w-10 h-12 mr-4 rounded-[0.625rem] md:mr-2 ${
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
        </div>
    );
};

export default Transactions;
