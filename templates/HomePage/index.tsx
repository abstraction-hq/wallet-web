"use client";

import Layout from "@/components/Layout";
import Balance from "./Balance";
import TopTokens from "./TopTokens";
import GreedIndex from "./GreedIndex";
import RecentActivities from "./RecentActivities";
import NeuraAI from "./NeuraAI";

const HomePage = () => {
    return (
        <Layout title="Dashboard">
            <div className="space-y-2">
                <Balance />
                <div className="flex space-x-2 lg:block lg:space-x-0 lg:space-y-2">
                    <TopTokens />
                    <GreedIndex />
                </div>
                <div className="flex -mx-1 lg:block lg:mx-0 lg:space-y-2">
                    <RecentActivities />
                    <NeuraAI />
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
