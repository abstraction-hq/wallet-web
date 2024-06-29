"use client";

import Layout from "@/components/Layout";
import Chat from "@/components/Chat";
import Question from "@/components/Chat/Question";
import Answer from "@/components/Chat/Answer";
import BestPrice from "@/components/Chat/BestPrice";

const ChatPage = () => {
    return (
        <Layout title="Neura AI">
            <Chat>
                <Question content="Predict the best time to sell my Ethereum based on past trends" />
                <Answer content="Based on current predictions from various sources, Ethereum's price is expected to rise in the near future. For instance, Forbes predicts that by the end of 2024, Ethereum could reach $5,000 1. Coinpedia also forecasts that Ethereum's March 2024 price may reach a potential high of $4,900 2. Another source mentions that Ethereum might increase by 5%, potentially reaching $3,687.11 by the next day .">
                    <BestPrice />
                </Answer>
            </Chat>
        </Layout>
    );
};

export default ChatPage;
