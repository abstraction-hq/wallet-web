"use client";

import Layout from "@/components/Layout";
import MarketCap from "./MarketCap";
import Volumes from "./Volumes";
import BitcoinDominance from "./BitcoinDominance";

const GreedIndexPage = () => {
    return (
        <Layout title="Greed index">
            <div className="space-y-2">
                <div className="flex space-x-2 lg:block lg:space-x-0 lg:space-y-2">
                    <MarketCap />
                    <Volumes />
                </div>
                <BitcoinDominance />
            </div>
        </Layout>
    );
};

export default GreedIndexPage;
