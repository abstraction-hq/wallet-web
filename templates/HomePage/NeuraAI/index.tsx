import { useState } from "react";
import Link from "next/link";
import Card from "@/components/Card";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import Message from "@/components/Message";

import { variantsChat } from "@/mocks/variantsChat";

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

type NeuraAIProps = {};

const NeuraAI = ({}: NeuraAIProps) => {
    const [mode, setMode] = useState(modes[0]);
    const [message, setMessage] = useState("");

    return (
        <Card
            className="w-[calc(50%-0.5rem)] mx-1 lg:w-full lg:mx-0"
            title="Neura AI"
            tooltip="Tooltip Neura AI"
            option={mode}
            setOption={setMode}
            options={modes}
        >
            <div className="flex mt-8 overflow-auto scrollbar-none scroll-smooth -mx-6 before:shrink-0 before:w-6 after:shrink-0 after:w-6 md:mt-6 md:-mx-4 md:before:w-4 md:after:w-4">
                {variantsChat.map((variant) => (
                    <Link
                        className="card-color flex flex-col group shrink-0 w-80 mr-4 p-8 rounded-[1.25rem] last:mr-0 md:w-66 md:p-6"
                        key={variant.id}
                        href={variant.url}
                    >
                        <div className="mb-2 text-title-1s">
                            {variant.title}
                        </div>
                        <div className="mb-12 text-body-2s md:mb-8">
                            {variant.content}
                        </div>
                        <div className="card-icon-color relative inline-flex justify-center items-center w-10 h-10 mt-auto rounded-xl">
                            <Image
                                className="w-6 opacity-100 group-hover:opacity-0"
                                src={variant.icon}
                                width={24}
                                height={24}
                                alt=""
                            />
                            <Icon
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 fill-theme-white-fixed transition-opacity group-hover:opacity-100"
                                name="arrow-up-right-thin"
                            />
                        </div>
                    </Link>
                ))}
            </div>
            <Message
                className="mt-6"
                value={message}
                onChange={(e: any) => setMessage(e.target.value)}
            />
        </Card>
    );
};

export default NeuraAI;
