"use client";

import { useState } from "react";
import Layout from "@/components/Layout";

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

const NFTDetailPage = () => {
    const [active, setActive] = useState(settings[0]);

    return (
        <Layout title="NFT Detail">
            <div className="card min-h-[calc(100vh-8.5rem)] md:min-h-[calc(100vh-11rem)] md:-mb-2 md:py-6">
               Ahahaha
            </div>
        </Layout>
    );
};

export default NFTDetailPage;
