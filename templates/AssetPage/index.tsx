"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Select from "@/components/Select";
import TabsSame from "@/components/TabsSame";
import SendAndReceive from "@/components/SendAndReceive";
import TotalBalance from "./TotalBalance";
import Details from "./Details";
import PrimaryBalance from "./PrimaryBalance";
import Transactions from "./Transactions";

const duration = [
    {
        id: "0",
        title: "Last year",
    },
    {
        id: "1",
        title: "Last month",
    },
    {
        id: "2",
        title: "Last weak",
    },
];

const AssetPage = () => {
    const [type, setType] = useState<string>("total-balance");
    const [time, setTime] = useState(duration[0]);
    const [visibleModal, setVisibleModal] = useState(false);

    const typeTasks = [
        {
            title: "Total balance",
            value: "total-balance",
        },
        {
            title: "Primary balance",
            value: "primary-balance",
        },
    ];

    return (
        <Layout title="Ethereum">
            <div className="flex items-start lg:block">
                <div className="card grow">
                    <div className="flex items-center md:block">
                        <TabsSame
                            className="w-[21.25rem] mr-auto md:w-auto"
                            items={typeTasks}
                            value={type}
                            setValue={setType}
                        />
                        <Select
                            className="shrink-0 min-w-[8.5rem] lg:hidden"
                            value={time}
                            onChange={setTime}
                            items={duration}
                        />
                        <button
                            className="btn-secondary hidden lg:flex md:w-full md:mt-4"
                            onClick={() => setVisibleModal(true)}
                        >
                            Send & Receive
                        </button>
                    </div>
                    <div className="pt-6">
                        {type === "total-balance" ? (
                            <div className="space-y-12 md:space-y-6">
                                <TotalBalance />
                                <Details />
                            </div>
                        ) : (
                            <div>
                                <PrimaryBalance />
                                <div className="-mx-6 my-6 h-0.25 bg-theme-stroke"></div>
                                <Transactions />
                            </div>
                        )}
                    </div>
                </div>
                <SendAndReceive
                    visibleModal={visibleModal}
                    onClose={() => setVisibleModal(false)}
                />
            </div>
        </Layout>
    );
};

export default AssetPage;
