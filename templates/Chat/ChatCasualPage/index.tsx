"use client";

import Layout from "@/components/Layout";
import Chat from "@/components/Chat";
import Question from "@/components/Chat/Question";
import Answer from "@/components/Chat/Answer";

const ChatPage = () => {
    return (
        <Layout title="Neura AI">
            <Chat>
                <Question content="Generate an NFT idea" />
                <Answer
                    content={
                        <>
                            <p>
                                NFT collection: &quot;Fusion Realms: A
                                Hypermaximalist Dream in ProtoSurrealism&quot;
                            </p>
                            <p>
                                The concept of the artwork celebrates the
                                minimalistic initial aesthetic of both artists,
                                which then transcends into a realm of
                                hypermaximalistic intensive detail. The painting
                                is an ultra-resolution, 8k visual piece ensuring
                                the maximum level of detail, showcasing the
                                intricate details.
                            </p>
                        </>
                    }
                    image="/images/chat-pic.jpg"
                ></Answer>
            </Chat>
        </Layout>
    );
};

export default ChatPage;
