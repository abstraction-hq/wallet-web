"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Select from "@/components/Select";
import Profile from "./Profile";
import Security from "./Security";
import Wallets from "./Wallets";
import Card from "./Card";
import Notifications from "./Notifications";
import DeleteAccount from "./DeleteAccount";

const settings = [
    {
        id: "0",
        title: "Profile",
    },
    {
        id: "1",
        title: "Security",
    },
    {
        id: "2",
        title: "Wallets",
    },
    {
        id: "3",
        title: "Card",
    },
    {
        id: "4",
        title: "Notifications",
    },
    {
        id: "5",
        title: "Delete account",
    },
];

const SettingsPage = () => {
    const [active, setActive] = useState(settings[0]);

    return (
        <Layout title="Settings">
            <div className="card min-h-[calc(100vh-8.5rem)] md:min-h-[calc(100vh-11rem)] md:-mb-2 md:py-6">
                <div className="flex items-start lg:block">
                    <Select
                        className="hidden md:block"
                        value={active}
                        onChange={setActive}
                        items={settings}
                    />
                    <div className="shrink-0 w-66 space-y-3 2xl:w-46 lg:flex lg:w-auto lg:overflow-auto lg:scroll-smooth lg:scrollbar-none lg:space-y-0 lg:space-x-3 lg:-mx-6 lg:before:shrink-0 lg:before:w-6 lg:after:shrink-0 lg:after:w-6 md:hidden">
                        {settings.map((item) => (
                            <button
                                className={`flex items-center w-full h-12 px-6 rounded-full shadow-[inset_0_0_0_0.0625rem_#EFEFEF] text-base-2 text-theme-secondary transition-all hover:shadow-transparent hover:bg-theme-on-surface-2 hover:text-theme-primary dark:shadow-[inset_0_0_0_0.0625rem_#272B30] lg:shrink-0 lg:w-auto ${
                                    active === item
                                        ? "!shadow-[inset_0_0_0_0.125rem_#0C68E9] !bg-transparent !text-theme-primary"
                                        : ""
                                }`}
                                key={item.id}
                                onClick={() => setActive(item)}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
                    <div className="grow pl-24 3xl:pl-15 lg:pt-15 lg:pl-0 md:pt-8">
                        {active.id === "0" && <Profile />}
                        {active.id === "1" && <Security />}
                        {active.id === "2" && <Wallets />}
                        {active.id === "3" && <Card />}
                        {active.id === "4" && <Notifications />}
                        {active.id === "5" && <DeleteAccount />}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SettingsPage;
