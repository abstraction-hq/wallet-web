import { useColorMode } from "@chakra-ui/react";
import Image from "@/components/Image";

type AnswerProps = {
    content: any;
    image?: string;
    children?: React.ReactNode;
};

const Answer = ({ content, image, children }: AnswerProps) => {
    const { colorMode, setColorMode } = useColorMode();
    const isDarkMode = colorMode === "dark";

    return (
        <div className="flex">
            <div className="shrink-0 mr-4">
                <Image
                    className="w-8 h-8 rounded-full opacity-100"
                    src={
                        isDarkMode
                            ? "/images/message-logo-light.svg"
                            : "/images/message-logo-dark.svg"
                    }
                    width={32}
                    height={32}
                    alt=""
                />
            </div>
            <div className="grow self-center">
                <div className="text-body-1m space-y-4">{content}</div>
                {image && (
                    <div className="mt-4">
                        <Image
                            className="w-full rounded-[1.25rem]"
                            src={image}
                            width={708}
                            height={320}
                            alt=""
                        />
                    </div>
                )}
                {children}
            </div>
        </div>
    );
};

export default Answer;
