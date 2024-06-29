import Link from "next/link";
import Select from "@/components/Select";
import Icon from "@/components/Icon";
import Tooltip from "@/components/Tooltip";

type CardProps = {
    className?: string;
    title?: string;
    arrowTitle?: boolean;
    option?: any;
    setOption?: any;
    options?: any;
    seeAllUrl?: string;
    tooltip?: string;
    children: React.ReactNode;
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
};

const Card = ({
    className,
    title,
    arrowTitle,
    option,
    setOption,
    options,
    seeAllUrl,
    tooltip,
    children,
    leftContent,
    rightContent,
}: CardProps) => {
    return (
        <div className={`card ${className || ""}`}>
            <div className="relative z-2 flex justify-between items-center min-h-[2.5rem]">
                {leftContent}
                {title && (
                    <div className="flex items-center text-title-1s md:text-[1.125rem]">
                        <div
                            className={`truncate ${
                                options ? "md:max-w-[33vw]" : ""
                            }`}
                        >
                            {title}
                        </div>{" "}
                        {arrowTitle && (
                            <Icon
                                className="ml-3 fill-theme-primary md:ml-1.5"
                                name="arrow-next"
                            />
                        )}
                        {tooltip && (
                            <Tooltip
                                className="-mb-0.25 md:mb-0"
                                title={tooltip}
                            />
                        )}
                    </div>
                )}
                {options && (
                    <Select
                        className="shrink-0 min-w-[8.5rem]"
                        value={option}
                        onChange={setOption}
                        items={options}
                    />
                )}
                {seeAllUrl && (
                    <Link
                        className="shrink-0 group inline-flex items-center text-button-1 text-primary-1"
                        href={seeAllUrl}
                    >
                        See all
                        <Icon
                            className="!w-4 !h-4 ml-2 fill-primary-1 transition-transform group-hover:translate-x-0.5"
                            name="arrow-next-fat"
                        />
                    </Link>
                )}
                {rightContent}
            </div>
            <div className="">{children}</div>
        </div>
    );
};

export default Card;
