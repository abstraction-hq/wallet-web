"use client";

import Layout from "@/components/Layout";
import Prices from "./Prices";
import NeuraAI from "./NeuraAI";
import AvailableBalance from "./AvailableBalance";

const TradePage = () => {
    return (
        <Layout title="Trade">
            <div className="flex items-start lg:block">
                <div className="card grow">
                    <Prices />
                    <div className="h-0.25 mt-4 -mx-6 bg-theme-stroke"></div>
                    <NeuraAI />
                </div>
                <AvailableBalance />
            </div>
        </Layout>
    );
};

export default TradePage;
