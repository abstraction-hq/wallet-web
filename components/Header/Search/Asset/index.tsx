import Link from "next/link";
import Image from "@/components/Image";
import Percent from "@/components/Percent";

type ItemType = {
    id: string;
    icon: string;
    currencyFull: string;
    currencyShort: string;
    number: number;
    price: number;
    percent: number;
};

type AssetProps = {
    item: ItemType;
};

const Asset = ({ item }: AssetProps) => (
    <Link
        className="flex items-center px-4 py-3 rounded-xl text-base-1s transition-colors cursor-pointer hover:bg-theme-n-8 md:px-2"
        href="/token"
    >
        <div className="shrink-0 mr-5 md:mr-3">
            <Image
                className="crypto-logo w-9 scale-[1.02]"
                src={item.icon}
                width={36}
                height={36}
                alt=""
            />
        </div>
        <div className="flex items-center grow">
            {item.currencyFull}
            <div className="ml-2 text-theme-tertiary">{item.currencyShort}</div>
            <div className="ml-2 px-1 rounded bg-theme-n-8 text-theme-tertiary">
                #{item.number}
            </div>
        </div>
        <div className="w-34 text-right md:w-auto">${item.price}</div>
        <div className="flex justify-end w-36 md:hidden">
            <Percent value={item.percent} />
        </div>
    </Link>
);

export default Asset;
