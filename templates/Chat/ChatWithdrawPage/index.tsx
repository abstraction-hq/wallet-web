"use client";

import Layout from "@/components/Layout";
import Chat from "@/components/Chat";
import Question from "@/components/Chat/Question";
import Answer from "@/components/Chat/Answer";
import Withdraw from "@/components/Chat/Withdraw";

const ChatPage = () => {
    return (
        <Layout title="Neura AI">
            <Chat>
                <Question content="Auto withdraw to my MetaMask wallet if the ETH balance goes over 3 ETH." />
                <Answer content="Sure, please confirm your Metamask address:">
                    <Withdraw />
                </Answer>
            </Chat>
        </Layout>
    );
};

export default ChatPage;
