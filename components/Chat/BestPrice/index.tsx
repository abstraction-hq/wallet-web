import { useState } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import Icon from "@/components/Icon";
import CurrencyFormat from "@/components/CurrencyFormat";
import Image from "@/components/Image";
import Percent from "@/components/Percent";
import Modal from "@/components/Modal";
import SetAlert from "@/components/SetAlert";

import { chartBestToBuy } from "@/mocks/charts";

type BestPriceProps = {};

const BestPrice = ({}: BestPriceProps) => {
    const [visibleModal, setVisibleModal] = useState(false);

    return (
        <>
            <div className="max-w-[33rem] mt-8 p-6 bg-theme-on-surface rounded-2xl md:mt-6 md:p-4">
                <div className="flex items-center mb-4">
                    <div className="text-title-1s">Best price to sell</div>
                    <button className="group w-9 h-9 ml-auto border-2 border-theme-stroke rounded-xl text-0 transition-colors hover:bg-theme-stroke">
                        <Icon
                            className="!w-5 !h-5 fill-theme-secondary transition-colors group-hover:fill-theme-primary"
                            name="refresh"
                        />
                    </button>
                </div>
                <div className="">
                    <CurrencyFormat
                        className="mb-3 text-h3"
                        value={3326.18}
                        currency="$"
                    />
                    <div className="flex items-center flex-wrap">
                        <div className="flex items-center mr-2">
                            <div className="mr-2">
                                <Image
                                    className="w-6"
                                    src="/images/crypto-icon-gray-2.png"
                                    width={24}
                                    height={24}
                                    alt=""
                                />
                            </div>
                            <div className="text-base-1s">
                                Ethereum{" "}
                                <span className="text-theme-tertiary">ETH</span>
                            </div>
                        </div>
                        <Percent className="text-base-2" value={12.32} />
                    </div>
                    <div className="h-32 my-2 -mx-6 md:-mx-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                                width={730}
                                height={250}
                                data={chartBestToBuy}
                                margin={{
                                    top: 0,
                                    right: 0,
                                    left: 0,
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
                                <Area
                                    type="linear"
                                    dataKey="price"
                                    stroke="#32AE60"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#color)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex items-center mb-4 text-caption-1 font-medium text-theme-secondary">
                        <div className="mr-3">
                            <Image
                                className="w-6"
                                src="/images/logo-1.svg"
                                width={24}
                                height={24}
                                alt=""
                            />
                        </div>
                        Method: LSTM, Accuracy: 87%
                    </div>
                    <div className="flex space-x-2 md:block md:space-x-0 md:space-y-2">
                        <button className="btn-secondary flex-1 md:w-full">
                            Sell ETH
                        </button>
                        <button
                            className="btn-gray flex-1 md:w-full"
                            onClick={() => setVisibleModal(true)}
                        >
                            Set Alert
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                classWrap="max-w-[28.5rem] rounded-3xl"
                showButtonClose
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
            >
                <SetAlert />
            </Modal>
        </>
    );
};

export default BestPrice;
