"use client";

import Layout from "@/components/Layout";
import Chat from "@/components/Chat";
import Question from "@/components/Chat/Question";
import Answer from "@/components/Chat/Answer";
import Trade from "@/components/Chat/Trade";

const ChatPage = () => {
    return (
        <Layout title="Neura AI">
            <Chat>
                <Question content="Smart trade. Automate trades based on user-defined criteria, using AI algorithms to time trades optimally." />
                <Answer content="Hey Tam, remember this feature is in beta, so use it carefully with your budget. There's a $1,000 daily limit. Review and adjust your budget, then select the cryptocurrency for today's trade.">
                    <Trade />
                </Answer>
            </Chat>
        </Layout>
    );
};

export default ChatPage;
