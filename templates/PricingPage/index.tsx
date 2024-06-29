"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import TabsSame from "@/components/TabsSame";
import Image from "@/components/Image";
import CurrencyFormat from "@/components/CurrencyFormat";
import Icon from "@/components/Icon";

import { pricing } from "@/mocks/pricing";

const PricingPage = () => {
    const [type, setType] = useState<string>("monthly");

    const typeTasks = [
        {
            title: "Monthly",
            value: "monthly",
        },
        {
            title: "Yearly",
            value: "yearly",
        },
    ];

    return (
        <Layout title="Premium">
            <div className="pt-12 md:pt-6">
                <div className="mb-14 text-center 2xl:mb-10 md:mb-6 md:text-left">
                    <div className="mb-3 text-h1 2xl:text-h2 md:text-h3">
                        Simplify your trading
                    </div>
                    <div className="mb-6 text-[1.25rem] leading-[2rem] font-medium text-theme-secondary">
                        Powerful tools to enhance your crypto trading
                        experience.
                    </div>
                    <TabsSame
                        className="max-w-[18.5rem] mx-auto shadow-[0_0_0_0.0625rem_#EFEFEF] md:max-w-full dark:shadow-[0_0_0_0.0625rem_#272B30]"
                        items={typeTasks}
                        value={type}
                        setValue={setType}
                    />
                </div>
                <div className="flex max-w-[65.6875rem] mx-auto space-x-2 lg:block lg:max-w-[25rem] lg:space-x-0 lg:space-y-2">
                    {pricing.map((item) => (
                        <div
                            className={`flex flex-col flex-1 p-1 rounded-2xl bg-theme-on-surface-1 ${
                                item.popular ? "shadow-depth-1" : ""
                            }`}
                            key={item.id}
                        >
                            <div
                                className={`relative px-7 py-6 border border-theme-stroke rounded-xl md:px-4 ${
                                    item.popular
                                        ? "bg-theme-light shadow-depth-1 border-transparent"
                                        : ""
                                }`}
                            >
                                {item.popular && (
                                    <div className="absolute top-1 right-1 px-5 py-0.5 bg-levender-300 rounded-full text-caption-2 font-bold text-theme-primary-fixed">
                                        Popular
                                    </div>
                                )}
                                <div className="flex items-center mb-2 text-title-1s">
                                    <div className="mr-3 text-0">
                                        <Image
                                            className="crypto-logo w-6"
                                            src={item.image}
                                            width={24}
                                            height={24}
                                            alt=""
                                        />
                                    </div>
                                    {item.title}
                                </div>
                                <div className="flex mb-8 text-h3">
                                    <div className="mr-3">$</div>
                                    <CurrencyFormat
                                        value={
                                            type === "monthly"
                                                ? item.priceMonthly
                                                : item.priceYearly
                                        }
                                    />
                                </div>
                                <div className="mb-8 line-clamp-3 text-body-2s text-theme-secondary 2xl:line-clamp-4">
                                    {item.description}
                                </div>
                                {item.active ? (
                                    <div className="flex justify-between items-center h-12 px-6 rounded-full bg-theme-secondary text-button-1 text-theme-white-fixed">
                                        Active
                                        <Icon
                                            className="fill-theme-white-fixed"
                                            name="check"
                                        />
                                    </div>
                                ) : (
                                    <button
                                        className={`w-full ${
                                            item.popular
                                                ? "btn-secondary"
                                                : "btn-gray"
                                        }`}
                                    >
                                        Upgrade to {item.title}
                                    </button>
                                )}
                            </div>
                            <div className="grow pt-8 px-7 pb-9 space-y-5 md:px-4">
                                {item.options.map((option, index) => (
                                    <div
                                        className="flex text-body-2s"
                                        key={index}
                                    >
                                        <Icon
                                            className="shrink-0 mr-3 fill-primary-2"
                                            name="check-circle"
                                        />
                                        <div className="flex items-center grow">
                                            {option}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default PricingPage;
