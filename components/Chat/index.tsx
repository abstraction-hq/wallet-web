import { useState } from "react";
import Select from "@/components/Select";
import Message from "@/components/Message";
import Icon from "@/components/Icon";
import NewChat from "./NewChat";
import History from "./History";

const modes = [
    {
        id: "0",
        title: "Expert mode",
    },
    {
        id: "1",
        title: "Expert mode 1",
    },
    {
        id: "2",
        title: "Expert mode 2",
    },
];

type ChatProps = {
    children?: React.ReactNode;
};

const Chat = ({ children }: ChatProps) => {
    const [mode, setMode] = useState(modes[0]);
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);

    return (
        <div className="relative flex h-[calc(100svh-8.5rem)] xl:overflow-hidden xl:rounded-2xl md:h-[calc(100svh-11rem)] md:-mb-2">
            <div className="card flex flex-col w-[calc(100%-21.75rem)] 2xl:w-[calc(100%-20.5rem)] xl:w-full">
                <div className="flex mb-6 md:mb-4">
                    <Select
                        className="min-w-[8.5rem]"
                        value={mode}
                        onChange={setMode}
                        items={modes}
                    />
                    <button
                        className="hidden relative w-6 h-6 shrink-0 ml-auto self-center text-0 before:absolute before:inset-0.5 before:border-2 before:border-theme-secondary before:opacity-40 before:rounded-md xl:inline-block"
                        onClick={() => setVisible(true)}
                    >
                        <Icon
                            className="fill-theme-secondary rotate-180"
                            name="arrow-right-fat"
                        />
                    </button>
                </div>
                <div className="flex grow overflow-auto -mx-6">
                    {children ? (
                        <div className="px-12 py-4 space-y-6 3xl:px-6 3xl:py-0">
                            {children}
                        </div>
                    ) : (
                        <NewChat />
                    )}
                </div>
                <Message
                    className="shrink-0 mt-6 md:mt-4"
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                    autoFocus
                    logo
                />
            </div>
            <History visible={visible} onClose={() => setVisible(false)} />
        </div>
    );
};

export default Chat;
