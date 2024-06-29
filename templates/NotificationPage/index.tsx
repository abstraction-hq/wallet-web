"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Tabs from "@/components/Tabs";
import Image from "@/components/Image";
import Select from "@/components/Select";

import { notificationsAll } from "@/mocks/notifications";

const typeItems = [
    {
        id: "0",
        title: "All",
    },
    {
        id: "1",
        title: "Market news",
    },
    {
        id: "2",
        title: "Trading",
    },
    {
        id: "3",
        title: "Account activity",
    },
];

const NotificationPage = () => {
    const [type, setType] = useState(typeItems[0]);

    return (
        <Layout title="Notifications">
            <div className="px-20 py-10 rounded-2xl bg-theme-on-surface-1 2xl:px-10 xl:p-6 md:p-4">
                <div className="flex mb-12 md:hidden">
                    <Tabs
                        className="mr-auto"
                        items={typeItems}
                        value={type}
                        setValue={setType}
                    />
                    <button className="btn-secondary shrink-0 ml-6 min-w-[8.8rem] h-10">
                        Clear all
                    </button>
                </div>
                <Select
                    className="hidden mb-6 md:block"
                    value={type}
                    onChange={setType}
                    items={typeItems}
                />
                <div className="space-y-12 md:space-y-6">
                    {notificationsAll.map((notification) => (
                        <div className="" key={notification.id}>
                            <div className="mb-2 text-caption-2 text-theme-secondary xl:px-6 md:px-0">
                                {notification.title}
                            </div>
                            <div className="-mx-6 space-y-2 xl:mx-0">
                                {notification.items.map((item) => (
                                    <div
                                        className="flex items-center p-6 rounded-2xl transition-shadow cursor-pointer hover:shadow-[0_0_0.875rem_-0.25rem_rgba(0,0,0,0.05),0_2rem_3rem_-0.5rem_rgba(0,0,0,0.05)] md:items-start md:px-0 md:py-4 md:border-t md:border-theme-stroke md:rounded-none md:hover:shadow-none"
                                        key={item.id}
                                    >
                                        <div
                                            className={`flex justify-center items-center shrink-0 w-15 h-15 rounded-full md:w-12 md:h-12 ${
                                                item.type === "alert"
                                                    ? "bg-theme-red-100"
                                                    : item.type === "update"
                                                    ? "bg-theme-green-100"
                                                    : "bg-theme-brand-100"
                                            }`}
                                        >
                                            <Image
                                                className="w-5 opacity-100"
                                                src={
                                                    item.type === "alert"
                                                        ? "/images/bell-red.svg"
                                                        : item.type === "update"
                                                        ? "/images/number-one.svg"
                                                        : "/images/bell-blue.svg"
                                                }
                                                width={20}
                                                height={20}
                                                alt=""
                                            />
                                        </div>
                                        <div className="grow pl-4">
                                            <div className="flex justify-between items-center mb-1">
                                                <div className="text-base-1s">
                                                    {item.title}
                                                </div>
                                                <div className="shrink-0 ml-3 text-caption-2m text-theme-secondary">
                                                    {item.time}
                                                </div>
                                            </div>
                                            <div className="notification text-body-2s text-theme-secondary md:text-caption-1">
                                                {item.content}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="hidden btn-secondary w-full h-10 mt-4 md:flex">
                    Clear all
                </button>
            </div>
        </Layout>
    );
};

export default NotificationPage;
