import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import Message from "@/components/Message";
import Details from "./Details";
import Chat from "./Chat";

type NeuraAIProps = {};

const NeuraAI = ({}: NeuraAIProps) => {
    const [message, setMessage] = useState("");

    return (
        <div className="pt-6 md:pt-4">
            <div className="flex items-center mb-6 md:mb04">
                <div className="mr-auto text-title-1s md:text-[1.125rem]">
                    Neura AI
                </div>
                {message !== "" && (
                    <button className="btn-square mr-3">
                        <Icon name="arrow-down" />
                    </button>
                )}
                <Link className="btn-square" href="/chat">
                    <Icon name="external-link" />
                </Link>
            </div>
            {message !== "" ? <Chat /> : <Details />}
            <Message
                className="mt-6"
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
                logo
            />
        </div>
    );
};

export default NeuraAI;
