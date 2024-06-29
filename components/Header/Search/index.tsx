import { useState } from "react";
import Icon from "@/components/Icon";
import Asset from "./Asset";
import Transaction from "./Transaction";

import { trendingAssets, recentTransactions } from "@/mocks/search";

type SearchProps = {};

const Search = ({}: SearchProps) => {
    const [search, setSearch] = useState("");

    return (
        <>
            <div className="relative">
                <input
                    className="w-full h-21 pl-22 pr-8 bg-transparent text-title-1m text-theme-primary outline-none placeholder:text-theme-tertiary md:h-16 md:pl-16 md:text-[1rem]"
                    type="text"
                    placeholder="Search for an asset, contacts"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    required
                    data-autofocus
                />
                <div className="absolute top-1/2 left-8 flex justify-center items-center w-9 h-9 -translate-y-1/2 md:left-5">
                    <Icon className="fill-theme-tertiary" name="search" />
                </div>
            </div>
            <div className="pt-3 pb-6 border-t border-theme-stroke">
                <div className="mb-3">
                    <div className="px-8 py-3 text-caption-1 text-theme-secondary md:px-4">
                        Trending assets
                    </div>
                    <div className="px-4 md:px-2">
                        {trendingAssets.map((asset) => (
                            <Asset item={asset} key={asset.id} />
                        ))}
                    </div>
                </div>
                <div className="">
                    <div className="px-8 py-3 text-caption-1 text-theme-secondary md:px-4">
                        Recent transactions
                    </div>
                    <div className="px-4 md:px-2">
                        {recentTransactions.map((transaction) => (
                            <Transaction
                                item={transaction}
                                key={transaction.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-center px-8 py-4 space-x-6 bg-theme-n-8 md:p-4">
                <div className="mr-auto text-caption-1 text-theme-secondary">
                    Showing 10 of 1000 results
                </div>
                <div className="flex items-center md:hidden">
                    <div className="mr-3 text-caption-1 text-theme-secondary">
                        Navigate
                    </div>
                    <div className="flex space-x-1">
                        <div className="flex justify-center items-center w-8 h-7 rounded-lg bg-theme-surface-pure border border-theme-stroke text-0">
                            <Icon
                                className="!w-4 !h-4 fill-theme-primary"
                                name="arrow-bottom"
                            />
                        </div>
                        <div className="flex justify-center items-center w-8 h-7 rounded-lg bg-theme-surface-pure border border-theme-stroke text-0">
                            <Icon
                                className="!w-4 !h-4 fill-theme-primary"
                                name="arrow-top"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center md:hidden">
                    <div className="mr-3 text-caption-1 text-theme-secondary">
                        Select
                    </div>
                    <div className="flex justify-center items-center w-10 h-7 rounded-lg bg-theme-surface-pure border border-theme-stroke text-0">
                        <Icon
                            className="fill-theme-primary"
                            name="arrow-select"
                        />
                    </div>
                </div>
                <div className="flex items-center md:hidden">
                    <div className="mr-3 text-caption-1 text-theme-secondary">
                        Close
                    </div>
                    <button className="group w-10 h-7 pt-0.5 rounded-lg bg-theme-surface-pure border border-theme-stroke text-caption-2">
                        ESC
                    </button>
                </div>
            </div>
        </>
    );
};

export default Search;
