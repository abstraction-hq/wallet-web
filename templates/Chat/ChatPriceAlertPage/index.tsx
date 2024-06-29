"use client";

import Layout from "@/components/Layout";
import Chat from "@/components/Chat";
import Question from "@/components/Chat/Question";
import Answer from "@/components/Chat/Answer";
import PriceAlert from "@/components/Chat/PriceAlert";

const ChatPage = () => {
    return (
        <Layout title="Neura AI">
            <Chat>
                <Question content="Based on my assets, set up bulk price alerts" />
                <Answer content="Certainly, you now have a total of 5 assets, and I have already set the price alert. Please review them below and make any manual adjustments if needed.">
                    <PriceAlert />
                </Answer>
            </Chat>
        </Layout>
    );
};

export default ChatPage;
