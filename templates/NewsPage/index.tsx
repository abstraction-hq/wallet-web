"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Tabs from "@/components/Tabs";
import Image from "@/components/Image";
import Select from "@/components/Select";

import { news } from "@/mocks/news";

const tabs = [
    {
        id: "0",
        title: "All",
    },
    {
        id: "1",
        title: "Announcements",
    },
    {
        id: "2",
        title: "Crypto",
    },
    {
        id: "3",
        title: "AI features",
    },
    {
        id: "4",
        title: "Change logs",
    },
];

const NewsPage = () => {
    const [type, setType] = useState(tabs[0]);

    return (
        <Layout title="News">
            <div className="card min-h-[calc(100vh-8.5rem)] px-28 py-20 3xl:px-12 2xl:py-12 xl:p-10 md:min-h-fit md:p-4">
                <div className="mb-20 pl-64 2xl:mb-16 2xl:pl-40 xl:pl-0 md:mb-8">
                    <div className="mb-8 text-h2 md:hidden">Latest Updates</div>
                    <Tabs
                        className="mr-auto md:hidden"
                        items={tabs}
                        value={type}
                        setValue={setType}
                    />
                    <Select
                        className="hidden md:block"
                        value={type}
                        onChange={setType}
                        items={tabs}
                    />
                </div>
                <div className="">
                    {news.map((article) => (
                        <div
                            className="relative pl-64 pb-32 before:absolute before:top-0 before:left-40 before:bottom-0 before:w-0.25 before:bg-theme-stroke last:pb-0 2xl:pl-40 2xl:before:hidden 2xl:pb-20 xl:pl-0 md:pb-12"
                            key={article.id}
                        >
                            <div className="mb-10 text-h5 xl:pr-32 md:mb-0 md:pr-0">
                                {article.title}
                            </div>
                            <div className="absolute top-0 left-0 xl:left-auto xl:right-0 xl:text-right md:static md:flex md:items-center md:mt-2 md:mb-6">
                                <div className="text-base-1s md:text-caption-2m md:text-theme-secondary">
                                    {article.date}
                                </div>
                                <div className="text-caption-2m text-theme-secondary md:ml-2">
                                    {article.time}
                                </div>
                            </div>
                            <div className="relative h-[26.25rem] mb-10 md:h-[22.5rem] md:mb-6">
                                <Image
                                    className="object-cover rounded-3xl"
                                    src={article.image}
                                    fill
                                    sizes="(max-width: 767px) 100vw, 50vw"
                                    alt=""
                                />
                            </div>
                            <div className="text-base-1s text-theme-secondary md:line-clamp-3">
                                {article.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default NewsPage;
