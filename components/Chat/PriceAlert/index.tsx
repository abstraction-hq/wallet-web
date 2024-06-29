import CurrencyFormat from "@/components/CurrencyFormat";
import Image from "@/components/Image";
import Icon from "@/components/Icon";

const items = [
    {
        title: "ETH",
        image: "/images/crypto-icon-2.png",
        price: 236.88,
    },
    {
        title: "USDC",
        image: "/images/crypto-icon-1.png",
        price: 432.45,
    },
    {
        title: "USDC",
        image: "/images/crypto-icon-4.png",
        price: 651.32,
    },
    {
        title: "USDC",
        image: "/images/crypto-icon-3.png",
        price: 223.55,
    },
    {
        title: "USDC",
        image: "/images/crypto-icon-6.png",
        price: 124.55,
    },
];

type PriceAlertProps = {};

const PriceAlert = ({}: PriceAlertProps) => (
    <div className="max-w-[25rem] mt-8 bg-theme-on-surface rounded-2xl border border-theme-stroke md:mt-6">
        <div className="">
            <div className="flex justify-between items-center h-12 px-6 text-caption-2m text-theme-secondary md:h-10 md:px-3">
                <div className="">Name</div>
                <div className="w-28 pl-2">Alert Price</div>
            </div>
            {items.map((item, index) => (
                <div
                    className="flex items-center h-16 px-6 border-t border-theme-stroke md:h-14 md:px-3"
                    key={index}
                >
                    <div className="mr-4 md:mr-2">
                        <Image
                            className="crypto-logo w-8 md:w-6"
                            src={item.image}
                            width={32}
                            height={32}
                            alt=""
                        />
                    </div>
                    <div className="text-base-1s">{item.title}</div>
                    <div className="w-28 ml-auto">
                        <div className="group flex justify-between items-center h-8 ml-auto px-2 rounded-lg cursor-pointer transition-colors hover:bg-theme-on-surface-2">
                            <CurrencyFormat
                                className="text-base-1s"
                                currency="$"
                                value={item.price}
                            />
                            <Icon
                                className="!w-4 !h-4 ml-2 fill-theme-secondary opacity-0 transition-opacity group-hover:opacity-100"
                                name="arrows"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="flex p-6 space-x-4 md:block md:px-3 md:py-4 md:space-x-0 md:space-y-4">
            <button className="btn-gray flex-1 px-4 md:w-full">
                Re-generate
            </button>
            <button className="btn-secondary flex-1 px-4 md:w-full">
                Set smart trade
            </button>
        </div>
    </div>
);

export default PriceAlert;
