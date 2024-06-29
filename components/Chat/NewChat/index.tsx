import Link from "next/link";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

import { variantsChat } from "@/mocks/variantsChat";

type NewChatProps = {};

const NewChat = ({}: NewChatProps) => (
    <div className="w-full my-auto px-12 2xl:px-6">
        <div className="mb-16 text-h2 text-theme-secondary 2xl:mb-8 2xl:text-h3 md:mb-4 md:text-h5">
            <span className="block text-theme-primary">Hello Tam,</span> How can
            I help you today?
        </div>
        <div className="flex overflow-auto scrollbar-none scroll-smooth -mx-12 before:shrink-0 before:w-12 after:shrink-0 after:w-12 2xl:-mx-6 2xl:before:w-6 2xl:after:w-6">
            {variantsChat.map((variant) => (
                <Link
                    className="card-color group flex flex-col shrink-0 w-66 mr-4 p-8 rounded-[1.25rem] last:mr-0 md:p-4"
                    key={variant.id}
                    href={variant.url}
                >
                    <div className="mb-2 text-title-1s">{variant.title}</div>
                    <div className="mb-18 text-body-2s 2xl:mb-10">
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
    </div>
);

export default NewChat;
