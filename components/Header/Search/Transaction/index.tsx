import Image from "@/components/Image";
import Icon from "@/components/Icon";

type ItemType = {
    id: string;
    avatar: string;
    wallet: string;
    price: string;
    status: string;
};

type TransactionProps = {
    item: ItemType;
};

const Transaction = ({ item }: TransactionProps) => (
    <div className="flex items-center h-15 px-4 text-base-1s md:px-2">
        <div className="flex items-center grow">
            <div className="shrink-0 mr-5 md:mr-3">
                <Image
                    className="w-9 rounded-full opacity-100"
                    src={item.avatar}
                    width={36}
                    height={36}
                    alt=""
                />
            </div>
            <div className="w-2 h-2 mr-3 rounded-full bg-theme-green md:hidden"></div>
            <div className="">{item.wallet}</div>
            <button className="shrink-0 group w-5 h-5 ml-3 bg-theme-brand-100 rounded-full text-0">
                <Icon
                    className="!w-3 !h-3 fill-theme-brand transition-transform group-hover:rotate-45"
                    name="arrow-up-right"
                />
            </button>
        </div>
        <div className="w-34 text-right text-base-2">{item.price}</div>
        <div
            className={`w-36 text-right md:hidden ${
                item.status === "Pending"
                    ? "text-theme-yellow"
                    : "text-theme-green"
            }`}
        >
            {item.status}
        </div>
    </div>
);

export default Transaction;
