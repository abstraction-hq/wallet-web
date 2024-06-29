import Image from "@/components/Image";

type OptionProps = {
    classTitle?: string;
    title?: string;
    color?: string;
    image?: string;
    stroke?: boolean;
    children: React.ReactNode;
};

const Option = ({
    classTitle,
    title,
    color,
    image,
    stroke,
    children,
}: OptionProps) => (
    <div
        className={`flex items-center ${
            stroke
                ? "min-h-[4rem] px-4 py-4 border border-theme-stroke rounded-xl"
                : "min-h-[3.5rem] border-t border-theme-stroke"
        }`}
    >
        <div
            className={`flex items-center w-20 mr-6 text-base-2 text-theme-secondary xl:mr-3 ${
                classTitle || ""
            }`}
        >
            {image ? (
                <Image
                    className="crypto-logo w-6"
                    src={image}
                    width={24}
                    height={24}
                    alt=""
                />
            ) : (
                <>
                    <div
                        className={`shrink-0 w-3 h-3 mr-2 rounded ${
                            color || "bg-theme-yellow"
                        }`}
                    ></div>
                    {title}
                </>
            )}
        </div>
        <div className="flex items-center grow text-base-2">{children}</div>
    </div>
);

export default Option;
